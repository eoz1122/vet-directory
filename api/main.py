import os
import re
import smtplib
import logging
from html import escape as html_escape
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)

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

# --- Validation constants ---
MAX_NAME_LEN = 100
MAX_EMAIL_LEN = 254  # RFC 5321
MAX_TOPIC_LEN = 50
MAX_MESSAGE_LEN = 5000
MAX_SUBJECT_LEN = 200

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")

ALLOWED_TOPICS = {"general", "submit_vet", "report_issue", "vet_owner"}


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

    msg = MIMEMultipart()
    from_addr = os.getenv("FROM_EMAIL", SMTP_USER)
    msg["From"] = f"ESG Vet Directory <{from_addr}>"
    msg["To"] = RECIPIENT_EMAIL
    msg["Subject"] = subject

    # Reply-To allows replying directly to the user
    if email:
        msg["Reply-To"] = email

    msg.attach(MIMEText(email_body, "plain"))

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
        server.quit()

        logger.info("Contact email sent: topic=%s from=%s", topic, email)
        return jsonify({"success": True, "message": "Email sent successfully"})
    except Exception as e:
        logger.error("Failed to send contact email: %s", str(e))
        # Never leak internal error details to the client
        return jsonify({"error": "Failed to send message. Please try again later."}), 500


@app.route("/api/health", methods=["GET"])
@limiter.exempt
def health():
    """Health check endpoint for monitoring."""
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
