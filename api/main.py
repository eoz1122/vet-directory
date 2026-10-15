import os
import re
import json
import fcntl
from datetime import datetime, timezone
import smtplib
import logging
from html import escape as html_escape
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix

# Load environment variables
load_dotenv()

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Gunicorn only listens on loopback and receives requests through one Nginx hop.
# Trust exactly that hop so request.remote_addr reflects the real client IP.
app.wsgi_app = ProxyFix(
    app.wsgi_app,
    x_for=1,
    x_proto=0,
    x_host=0,
    x_port=0,
    x_prefix=0,
)

# --- CORS: restrict to production domain + localhost dev ---
ALLOWED_ORIGINS = [
    "https://englishspeakinggermany.online",
    "https://www.englishspeakinggermany.online",
    "http://localhost:5173",  # Vite dev server
]
CORS(app, origins=ALLOWED_ORIGINS)

# --- Rate Limiting ---
# Uses X-Forwarded-For when behind Nginx (ensure proxy_set_header is configured)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

# --- Configuration ---
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")
SMTP_TIMEOUT_SECONDS = float(os.getenv("SMTP_TIMEOUT_SECONDS", "10"))

# --- Validation constants ---
MAX_NAME_LEN = 100
MAX_EMAIL_LEN = 254  # RFC 5321
MAX_TOPIC_LEN = 50
MAX_MESSAGE_LEN = 5000
MAX_SUBJECT_LEN = 200
MAX_CSP_REPORT_BYTES = 16 * 1024
MAX_CSP_DIRECTIVE_LEN = 100
MAX_CSP_URI_LEN = 500
MAX_VET_ID_LEN = 100
MAX_NEWSLETTER_SOURCE_LEN = 100

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")
VET_ID_REGEX = re.compile(r"^[A-Za-z0-9._-]+$")

ALLOWED_TOPICS = {"general", "submit_vet", "report_issue", "vet_owner"}
ALLOWED_NEWSLETTER_SOURCES = {"site_footer", "dog_food_guide"}
VALID_VET_IDS_PATH = Path(__file__).with_name("valid_vet_ids.json")
CANONICAL_VETS_PATH = Path(__file__).resolve().parents[1] / "web-app" / "src" / "data" / "vets.json"
NEWSLETTER_LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "newsletter_subscribers.jsonl")
CONFIRMATION_NOTIFY_LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "confirmation_notifications.jsonl")
MAX_CONFIRMATION_EMAILS_PER_HOUR = int(os.getenv("MAX_CONFIRMATION_EMAILS_PER_HOUR", "5"))

# Confirmation names are copied into email subjects, so reject common SQLi and
# time-delay probes before they can reach SMTP or the human review queue.
SUSPICIOUS_CONFIRMATION_RE = re.compile(
    r"(?i)(?:dbms_pipe|pg_sleep|waitfor\s+delay|sleep\s*\(|sysdate|xor\s*\(|"
    r"(?:union|select)\s+|(?:or|and)\s+\d+\s*=|--|/\*|\*/)",
)


def load_valid_vet_ids(path: str | Path = VALID_VET_IDS_PATH) -> frozenset[str]:
    """Load a sorted, unique, syntax-checked active practice ID manifest."""
    manifest_path = Path(path)
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise RuntimeError("Could not load valid vet ID manifest.") from error

    if not isinstance(manifest, list) or not manifest:
        raise RuntimeError("Invalid valid vet ID manifest structure.")
    if any(
        not isinstance(vet_id, str)
        or len(vet_id) > MAX_VET_ID_LEN
        or not VET_ID_REGEX.fullmatch(vet_id)
        for vet_id in manifest
    ):
        raise RuntimeError("Invalid valid vet ID manifest entry.")
    if manifest != sorted(manifest) or len(manifest) != len(set(manifest)):
        raise RuntimeError("Invalid valid vet ID manifest ordering or uniqueness.")

    return frozenset(manifest)


VALID_VET_IDS = load_valid_vet_ids()


def load_active_vets(path: str | Path = CANONICAL_VETS_PATH) -> dict[str, dict[str, str]]:
    """Load active practice names and cities from the canonical directory data."""
    catalog_path = Path(path)
    try:
        catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise RuntimeError("Could not load canonical vet catalog.") from error

    if not isinstance(catalog, list) or not catalog:
        raise RuntimeError("Invalid canonical vet catalog structure.")

    active: dict[str, dict[str, str]] = {}
    for vet in catalog:
        if not isinstance(vet, dict):
            raise RuntimeError("Invalid canonical vet catalog entry.")
        vet_id = vet.get("id")
        name = vet.get("practice_name")
        city = vet.get("city")
        status = vet.get("verification", {}).get("status") if isinstance(vet.get("verification"), dict) else None
        if status == "Permanently Closed":
            continue
        if (
            not isinstance(vet_id, str)
            or not VET_ID_REGEX.fullmatch(vet_id)
            or not isinstance(name, str)
            or not name.strip()
            or not isinstance(city, str)
            or not city.strip()
        ):
            raise RuntimeError("Invalid canonical vet catalog entry.")
        if vet_id in active:
            raise RuntimeError("Duplicate canonical vet catalog ID.")
        active[vet_id] = {"practice_name": name.strip(), "city": city.strip()}

    if not active:
        raise RuntimeError("Canonical vet catalog contains no active practices.")
    return active


ACTIVE_VETS = load_active_vets()


def sanitize_csp_text(value: object, max_length: int) -> str:
    """Bound untrusted report text and prevent control-character log injection."""
    if not isinstance(value, str):
        return ""
    return re.sub(r"[\r\n\t]+", " ", value).strip()[:max_length]


def sanitize_csp_uri(value: object) -> str:
    """Sanitize a reported URI and drop query or fragment data before logging."""
    clean = sanitize_csp_text(value, MAX_CSP_URI_LEN)
    if not clean:
        return ""

    try:
        parsed = urlsplit(clean)
        return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, "", ""))[:MAX_CSP_URI_LEN]
    except ValueError:
        return clean.split("?", 1)[0].split("#", 1)[0][:MAX_CSP_URI_LEN]


def sanitize(value: str) -> str:
    """Strip HTML tags and escape special characters to prevent XSS via email."""
    if not isinstance(value, str):
        return ""
    # Remove any HTML tags
    clean = re.sub(r"<[^>]+>", "", value)
    # Escape remaining special characters
    return html_escape(clean).strip()


def validate_contact_payload(data: dict) -> tuple[dict | None, str | None]:
    """Validate and sanitize the contact form payload.

    Returns (sanitized_data, error_message). error_message is None on success.
    """
    if not data or not isinstance(data, dict):
        return None, "No data provided."

    # Honeypot: the hidden "company" field must be empty for real users.
    if data.get("company"):
        return None, "Spam detected."

    name = sanitize(data.get("name", ""))
    email = data.get("email", "").strip()
    topic = data.get("topic", "").strip()
    message = sanitize(data.get("message", ""))

    # --- Required fields ---
    if not name:
        return None, "Name is required."
    if not email:
        return None, "Email is required."
    if not message:
        return None, "Message is required."

    # --- Length limits ---
    if len(name) > MAX_NAME_LEN:
        return None, f"Name must be under {MAX_NAME_LEN} characters."
    if len(email) > MAX_EMAIL_LEN:
        return None, f"Email must be under {MAX_EMAIL_LEN} characters."
    if len(message) > MAX_MESSAGE_LEN:
        return None, f"Message must be under {MAX_MESSAGE_LEN} characters."

    # --- Format checks ---
    if not EMAIL_REGEX.match(email):
        return None, "Invalid email format."

    # --- Topic validation ---
    if topic and topic not in ALLOWED_TOPICS:
        return None, "Invalid topic."
    if not topic:
        topic = "general"

    # Build sanitized data
    sanitized = {
        "name": name,
        "email": email,
        "topic": topic,
        "message": message,
    }

    # Optional structured fields for vet submission
    for key in ("vetName", "vetCity", "otherCity", "vetAddress", "vetWebsite"):
        val = sanitize(data.get(key, ""))
        if len(val) > 200:
            return None, f"{key} must be under 200 characters."
        sanitized[key] = val

    return sanitized, None


def validate_newsletter_payload(data: dict) -> tuple[dict | None, str | None]:
    """Validate a double-purpose newsletter opt-in without storing extra profile data."""
    if not data or not isinstance(data, dict):
        return None, "No data provided."

    if data.get("company"):
        return None, "Spam detected."

    raw_email = data.get("email", "")
    email = raw_email.strip().lower() if isinstance(raw_email, str) else ""
    source = sanitize(data.get("source", ""))

    if not email:
        return None, "Email is required."
    if len(email) > MAX_EMAIL_LEN:
        return None, f"Email must be under {MAX_EMAIL_LEN} characters."
    if not EMAIL_REGEX.fullmatch(email):
        return None, "Invalid email format."
    if data.get("consent") is not True:
        return None, "Consent is required."
    if source not in ALLOWED_NEWSLETTER_SOURCES:
        return None, "Invalid source."
    if len(source) > MAX_NEWSLETTER_SOURCE_LEN:
        return None, f"Source must be under {MAX_NEWSLETTER_SOURCE_LEN} characters."

    return {"email": email, "source": source}, None


def validate_confirm_payload(data: dict) -> tuple[dict | None, str | None]:
    """Validate a community 'speaks English' confirmation (one-click, anonymous).

    Returns (sanitized_data, error_message). error_message is None on success.
    """
    if not data or not isinstance(data, dict):
        return None, "No data provided."

    # Honeypot
    if data.get("company"):
        return None, "Spam detected."

    raw_vet_name = data.get("vetName", "")
    raw_vet_city = data.get("vetCity", "")
    if SUSPICIOUS_CONFIRMATION_RE.search(str(raw_vet_name)) or SUSPICIOUS_CONFIRMATION_RE.search(str(raw_vet_city)):
        return None, "Invalid confirmation."

    vet_name = sanitize(raw_vet_name)
    if not vet_name:
        return None, "vetName is required."
    if len(vet_name) > 200:
        return None, "vetName must be under 200 characters."

    raw_vet_id = data.get("vetId")
    if not isinstance(raw_vet_id, str) or not raw_vet_id.strip():
        return None, "vetId is required."
    vet_id = raw_vet_id.strip()
    if len(vet_id) > MAX_VET_ID_LEN:
        return None, f"vetId must be {MAX_VET_ID_LEN} characters or fewer."
    if not VET_ID_REGEX.fullmatch(vet_id):
        return None, "vetId has an invalid format."
    canonical = ACTIVE_VETS.get(vet_id)
    if canonical is None or vet_id not in VALID_VET_IDS:
        return None, "vetId does not identify an active practice."

    vet_city = sanitize(raw_vet_city)
    canonical_name = sanitize(canonical["practice_name"])
    canonical_city = sanitize(canonical["city"])
    if vet_name != canonical_name or (vet_city and vet_city != canonical_city):
        return None, "Confirmation does not match the selected practice."

    return {
        "vetName": canonical_name,
        "vetId": vet_id,
        "vetCity": canonical_city[:100],
    }, None


def send_email(subject: str, body: str, reply_to: str | None = None) -> None:
    """Send a plain-text email to the directory admin over SMTP."""
    msg = MIMEMultipart()
    from_addr = os.getenv("FROM_EMAIL", SMTP_USER)
    msg["From"] = f"ESG Vet Directory <{from_addr}>"
    msg["To"] = RECIPIENT_EMAIL
    msg["Subject"] = subject
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT_SECONDS)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    server.send_message(msg)
    server.quit()


def append_newsletter_subscriber(sanitized: dict, path: str | Path | None = None) -> bool:
    """Append a minimal, admin-managed opt-in record and avoid duplicate addresses."""
    target = Path(path or NEWSLETTER_LOG)
    try:
        email = sanitized.get("email", "")
        if target.exists():
            for line in target.read_text(encoding="utf-8").splitlines():
                try:
                    if json.loads(line).get("email") == email:
                        return True
                except (TypeError, json.JSONDecodeError):
                    continue

        record = {
            "date": datetime.now(timezone.utc).isoformat(),
            "email": email,
            "source": sanitized.get("source", ""),
            "consent": True,
        }
        with target.open("a", encoding="utf-8") as subscriber_file:
            subscriber_file.write(json.dumps(record, ensure_ascii=False) + "\n")
        return True
    except Exception as error:
        logger.error("Failed to append newsletter subscriber: %s", str(error))
        return False


@app.route("/api/contact", methods=["POST"])
@limiter.limit("5 per minute")  # Strict limit on contact form submissions
def contact():
    data = request.json

    # Validate and sanitize
    sanitized, error = validate_contact_payload(data)
    if error:
        return jsonify({"error": error}), 400

    name = sanitized["name"]
    email = sanitized["email"]
    topic = sanitized["topic"]
    message = sanitized["message"]

    subject = f"[ESG] {topic.upper()} - {name}"
    if len(subject) > MAX_SUBJECT_LEN:
        subject = subject[:MAX_SUBJECT_LEN]

    # Construct email body
    email_body = f"""
    New Contact Form Submission
    ---------------------------
    Name: {name}
    Email: {email}
    Topic: {topic}

    Message:
    {message}
    """

    # Add optional vet submission details
    if topic == "submit_vet" and sanitized.get("vetName"):
        email_body += f"""
    --- Vet Submission Details ---
    Practice: {sanitized['vetName']}
    City: {sanitized.get('vetCity', '')} {sanitized.get('otherCity', '')}
    Address: {sanitized.get('vetAddress', '')}
    Website: {sanitized.get('vetWebsite', '')}
    """

    try:
        send_email(subject, email_body, reply_to=email)
        logger.info("Contact email sent: topic=%s from=%s", topic, email)
        return jsonify({"success": True, "message": "Email sent successfully"})
    except Exception as e:
        logger.error("Failed to send contact email: %s", str(e))
        # Never leak internal error details to the client
        return jsonify({"error": "Failed to send message. Please try again later."}), 500


@app.route("/api/newsletter", methods=["POST"])
@limiter.limit("3 per minute")
def newsletter():
    """Record an explicit periodic-update opt-in and notify the admin."""
    sanitized, error = validate_newsletter_payload(request.json)
    if error:
        if error == "Spam detected.":
            return jsonify({"success": True})
        return jsonify({"error": error}), 400

    email = sanitized["email"]
    source = sanitized["source"]
    logged = append_newsletter_subscriber(sanitized)
    email_sent = False
    try:
        send_email(
            "[ESG] NEWSLETTER SIGNUP",
            "A visitor opted in to periodic English-speaking pet updates.\n"
            "---------------------------------------------------------------\n"
            f"Email: {email}\n"
            f"Source: {source}\n"
            "Consent: explicit opt-in\n",
            reply_to=email,
        )
        email_sent = True
        logger.info("Newsletter signup received: source=%s", source)
    except Exception as error:
        logger.error("Failed to notify newsletter signup: %s", str(error))

    if logged or email_sent:
        return jsonify({"success": True, "message": "Thanks for joining."})
    return jsonify({"error": "Could not record signup. Please try again later."}), 500


# Machine-readable confirmation log: the source of truth swept weekly into
# vets.json (the email below is only a human notification). Lives in the api/
# directory (systemd ReadWritePaths) and is untracked, so git resets keep it.
CONFIRMATIONS_LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "confirmations.jsonl")


def append_confirmation(sanitized: dict, path: str | Path = CONFIRMATIONS_LOG) -> str:
    """Append one confirmation, deduplicating the same practice for one UTC day."""
    target = Path(path)
    try:
        record = {
            "date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "vetId": sanitized.get("vetId", ""),
            "vetName": sanitized.get("vetName", ""),
            "vetCity": sanitized.get("vetCity", ""),
        }
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("a+", encoding="utf-8") as f:
            fcntl.flock(f.fileno(), fcntl.LOCK_EX)
            f.seek(0)
            for line in f:
                try:
                    previous = json.loads(line)
                except (TypeError, json.JSONDecodeError):
                    continue
                if previous.get("date") == record["date"] and previous.get("vetId") == record["vetId"]:
                    return "duplicate"
            f.seek(0, os.SEEK_END)
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
            f.flush()
            os.fsync(f.fileno())
            return "created"
    except Exception as e:
        logger.error("Failed to append confirmation log: %s", str(e))
        return "failed"


def reserve_confirmation_notification(vet_id: str, path: str | Path = CONFIRMATION_NOTIFY_LOG) -> bool:
    """Reserve a bounded confirmation email slot without leaking raw client data."""
    target = Path(path)
    now = datetime.now(timezone.utc)
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("a+", encoding="utf-8") as f:
            fcntl.flock(f.fileno(), fcntl.LOCK_EX)
            f.seek(0)
            recent: list[dict] = []
            for line in f:
                try:
                    record = json.loads(line)
                    timestamp = datetime.fromisoformat(record.get("timestamp", ""))
                except (TypeError, ValueError, json.JSONDecodeError):
                    continue
                if (now - timestamp).total_seconds() < 86400:
                    recent.append(record)
            if any(record.get("vetId") == vet_id for record in recent):
                return False
            hourly_count = sum(
                (now - datetime.fromisoformat(record["timestamp"])).total_seconds() < 3600
                for record in recent
            )
            if hourly_count >= MAX_CONFIRMATION_EMAILS_PER_HOUR:
                logger.warning("Confirmation email budget exhausted; suppressing vet=%s", vet_id)
                return False
            f.seek(0, os.SEEK_END)
            f.write(json.dumps({"timestamp": now.isoformat(), "vetId": vet_id}) + "\n")
            f.flush()
            os.fsync(f.fileno())
            return True
    except Exception as e:
        logger.error("Failed to reserve confirmation email notification: %s", str(e))
        return False


@app.route("/api/confirm-vet", methods=["POST"])
@limiter.limit("3 per minute")
def confirm_vet():
    """Record a community confirmation that a practice speaks English (emails admin)."""
    sanitized, error = validate_confirm_payload(request.json)
    if error:
        # Don't tip off bots that the honeypot caught them.
        if error == "Spam detected.":
            return jsonify({"success": True})
        return jsonify({"error": error}), 400

    # A browser fetch from the live site or local dev server includes Origin.
    # Requiring it blocks the direct POST pattern used by the current bot burst.
    if request.headers.get("Origin") not in ALLOWED_ORIGINS:
        return jsonify({"error": "Invalid request origin."}), 403

    subject = f"[ESG] CONFIRM ENGLISH - {sanitized['vetName']}"[:MAX_SUBJECT_LEN]
    email_body = f"""
    Community confirmation: a visitor confirmed this practice speaks English.
    ---------------------------------------------------------------
    Practice: {sanitized['vetName']}
    City: {sanitized['vetCity']}
    Vet ID: {sanitized['vetId']}

    Pending human review: preserve this as untrusted community evidence.
    Do not change community_status, verification status, or last_scanned automatically.
    """
    logged = append_confirmation(sanitized)
    recorded = logged in ("created", "duplicate", True)

    email_sent = False
    if logged in ("created", True) and reserve_confirmation_notification(sanitized["vetId"]):
        try:
            send_email(subject, email_body)
            email_sent = True
            logger.info("Confirm-vet email sent: vet=%s id=%s", sanitized["vetName"], sanitized["vetId"])
        except Exception as e:
            # Notification only - the JSONL log above is the record of truth.
            logger.error("Failed to send confirm-vet email: %s", str(e))

    if recorded or email_sent:
        return jsonify({"success": True, "message": "Thanks for confirming!"})
    return jsonify({"error": "Could not record confirmation. Please try again later."}), 500


@app.route("/api/csp-report", methods=["POST"])
@limiter.limit("30 per minute")
def csp_report():
    """Accept bounded report-only CSP telemetry from browsers."""
    if request.content_length and request.content_length > MAX_CSP_REPORT_BYTES:
        return "", 413

    payload = request.get_json(silent=True, force=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Invalid CSP report."}), 400

    report = payload.get("csp-report")
    if not isinstance(report, dict):
        return jsonify({"error": "Invalid CSP report."}), 400

    directive = sanitize_csp_text(
        report.get("effective-directive", report.get("violated-directive", "")),
        MAX_CSP_DIRECTIVE_LEN,
    )
    blocked_uri = sanitize_csp_uri(report.get("blocked-uri", ""))
    document_uri = sanitize_csp_uri(report.get("document-uri", ""))

    logger.warning(
        "CSP violation: directive=%s blocked=%s document=%s",
        directive,
        blocked_uri,
        document_uri,
    )
    return "", 204


@app.route("/api/health", methods=["GET"])
@limiter.exempt
def health():
    """Health check endpoint for monitoring."""
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
