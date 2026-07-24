import json
import re
from pathlib import Path

import pytest  # type: ignore
import main  # type: ignore
from main import validate_contact_payload, validate_confirm_payload, sanitize  # type: ignore
from werkzeug.middleware.proxy_fix import ProxyFix

def test_sanitize():
    assert sanitize("<script>alert(1)</script>") == "alert(1)"
    assert sanitize("<b>Hello</b>") == "Hello"
    assert sanitize("Plain text") == "Plain text"

def test_validate_contact_payload_valid():
    data = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "topic": "general",
        "message": "Hello world"
    }
    sanitized, error = validate_contact_payload(data)
    assert error is None
    assert sanitized["name"] == "Jane Doe"
    assert sanitized["email"] == "jane@example.com"
    assert sanitized["message"] == "Hello world"

def test_validate_contact_payload_missing_fields():
    # Missing name
    data = {"email": "jane@example.com", "message": "Hello"}
    sanitized, error = validate_contact_payload(data)
    assert error == "Name is required."
    
    # Missing email
    data = {"name": "Jane", "message": "Hello"}
    sanitized, error = validate_contact_payload(data)
    assert error == "Email is required."

def test_validate_contact_payload_invalid_email():
    data = {
        "name": "Jane Doe",
        "email": "not-an-email",
        "topic": "general",
        "message": "Hello world"
    }
    sanitized, error = validate_contact_payload(data)
    assert error == "Invalid email format."

def test_validate_contact_payload_invalid_topic():
    data = {
        "name": "Jane",
        "email": "jane@example.com",
        "topic": "hacked-topic",
        "message": "Hello"
    }
    sanitized, error = validate_contact_payload(data)
    assert error == "Invalid topic."

def test_contact_honeypot_rejected():
    # A filled honeypot ("company") means a bot — reject before sending.
    data = {"name": "Jane", "email": "j@x.com", "message": "hi", "company": "spam-bot"}
    sanitized, error = validate_contact_payload(data)
    assert sanitized is None
    assert error == "Spam detected."

# --- confirm-vet (community "speaks English" confirmation) ---

def test_validate_confirm_payload_valid():
    data = {"vetName": "Tierklinik Berlin", "vetId": "Internal-4", "vetCity": "Berlin"}
    sanitized, error = validate_confirm_payload(data)
    assert error is None
    assert sanitized["vetName"] == "Tierklinik Berlin"
    assert sanitized["vetId"] == "Internal-4"
    assert sanitized["vetCity"] == "Berlin"

def test_validate_confirm_payload_requires_vetname():
    sanitized, error = validate_confirm_payload({"vetCity": "Berlin"})
    assert sanitized is None
    assert error == "vetName is required."

def test_validate_confirm_payload_honeypot():
    sanitized, error = validate_confirm_payload({"vetName": "X", "company": "bot"})
    assert sanitized is None
    assert error == "Spam detected."

def test_validate_confirm_payload_sanitizes_xss():
    sanitized, error = validate_confirm_payload({
        "vetName": "<script>evil</script>Clinic",
        "vetId": "Berlin-1",
    })
    assert error is None
    assert "<script>" not in sanitized["vetName"]

def test_validate_confirm_payload_length_limit():
    sanitized, error = validate_confirm_payload({"vetName": "x" * 201})
    assert sanitized is None
    assert "200" in error


@pytest.mark.parametrize("vet_id", [None, "", "   ", 123])
def test_validate_confirm_payload_requires_a_string_vet_id(vet_id):
    sanitized, error = validate_confirm_payload({
        "vetName": "Tierklinik Berlin",
        "vetId": vet_id,
    })

    assert sanitized is None
    assert error == "vetId is required."


def test_validate_confirm_payload_rejects_oversized_vet_id_instead_of_truncating():
    sanitized, error = validate_confirm_payload({
        "vetName": "Tierklinik Berlin",
        "vetId": "x" * 101,
    })

    assert sanitized is None
    assert error == "vetId must be 100 characters or fewer."


@pytest.mark.parametrize("vet_id", ["Berlin 1", "Berlin/1", "Berlin<script>", "Berlin\n1"])
def test_validate_confirm_payload_rejects_invalid_vet_id_syntax(vet_id):
    sanitized, error = validate_confirm_payload({
        "vetName": "Tierklinik Berlin",
        "vetId": vet_id,
    })

    assert sanitized is None
    assert error == "vetId has an invalid format."


@pytest.mark.parametrize("vet_id", ["Ghost-99", "Berlin-29"])
def test_validate_confirm_payload_rejects_unknown_or_closed_vet_id(vet_id):
    sanitized, error = validate_confirm_payload({
        "vetName": "Tierklinik Berlin",
        "vetId": vet_id,
    })

    assert sanitized is None
    assert error == "vetId does not identify an active practice."


@pytest.mark.parametrize("vet_id", ["", "Ghost-99"])
def test_confirm_endpoint_rejects_invalid_id_before_side_effects(monkeypatch, vet_id):
    side_effects = []
    monkeypatch.setattr(main, "append_confirmation", lambda *_args, **_kwargs: side_effects.append("log"))
    monkeypatch.setattr(main, "send_email", lambda *_args, **_kwargs: side_effects.append("email"))

    response = main.app.test_client().post(
        "/api/confirm-vet",
        json={"vetName": "Tierklinik Berlin", "vetId": vet_id},
    )

    assert response.status_code == 400
    expected_error = (
        "vetId is required."
        if not vet_id
        else "vetId does not identify an active practice."
    )
    assert response.get_json() == {"error": expected_error}
    assert side_effects == []


def test_confirm_endpoint_requests_human_review_without_promotion(monkeypatch):
    sent_messages = []
    monkeypatch.setattr(main, "append_confirmation", lambda *_args, **_kwargs: True)
    monkeypatch.setattr(
        main,
        "send_email",
        lambda subject, body, **_kwargs: sent_messages.append((subject, body)),
    )

    response = main.app.test_client().post(
        "/api/confirm-vet",
        json={
            "vetName": "Practice Berlin-1",
            "vetId": "Berlin-1",
            "vetCity": "Berlin",
        },
    )

    assert response.status_code == 200
    assert len(sent_messages) == 1
    assert "Pending human review" in sent_messages[0][1]
    assert "bump community_status / last_scanned" not in sent_messages[0][1]


def test_valid_vet_id_manifest_matches_active_canonical_dataset():
    repository_root = Path(__file__).resolve().parents[2]
    vets = json.loads((repository_root / "web-app" / "src" / "data" / "vets.json").read_text(encoding="utf-8"))
    manifest_path = repository_root / "api" / "valid_vet_ids.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    expected = sorted(
        vet["id"]
        for vet in vets
        if vet.get("verification", {}).get("status") != "Permanently Closed"
    )

    assert manifest == expected
    assert len(manifest) == len(set(manifest))


def test_valid_vet_id_loader_fails_closed_when_manifest_is_missing(tmp_path):
    with pytest.raises(RuntimeError, match="valid vet ID manifest"):
        main.load_valid_vet_ids(tmp_path / "missing.json")


@pytest.mark.parametrize(
    "manifest",
    [
        "not-json",
        json.dumps({"Berlin-1": True}),
        json.dumps(["Berlin-1", "Berlin-1"]),
        json.dumps(["Berlin-1", "invalid id"]),
    ],
)
def test_valid_vet_id_loader_fails_closed_for_malformed_manifest(tmp_path, manifest):
    manifest_path = tmp_path / "valid_vet_ids.json"
    manifest_path.write_text(manifest, encoding="utf-8")

    with pytest.raises(RuntimeError, match="valid vet ID manifest"):
        main.load_valid_vet_ids(manifest_path)


# --- confirmation JSONL log (source of truth for the weekly sweep) ---

def test_append_confirmation_writes_jsonl_line(tmp_path):
    from main import append_confirmation  # type: ignore
    import json as _json
    log = tmp_path / "confirmations.jsonl"
    append_confirmation({"vetId": "Berlin-1", "vetName": "Test Vet", "vetCity": "Berlin"}, path=str(log))
    append_confirmation({"vetId": "Hamburg-2", "vetName": "Second Vet", "vetCity": "Hamburg"}, path=str(log))
    lines = log.read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) == 2
    rec = _json.loads(lines[0])
    assert rec["vetId"] == "Berlin-1"
    assert rec["vetName"] == "Test Vet"
    assert rec["vetCity"] == "Berlin"
    assert len(rec["date"]) == 10 and rec["date"][4] == "-"  # ISO date YYYY-MM-DD


def test_append_confirmation_never_raises_on_bad_path():
    from main import append_confirmation  # type: ignore
    # Unwritable path must not raise - logging is best-effort, the request must succeed
    append_confirmation({"vetId": "x", "vetName": "y", "vetCity": "z"}, path="/nonexistent-dir/f.jsonl")


# --- Reverse proxy and outbound I/O resilience ---

def test_app_trusts_exactly_one_forwarded_for_proxy_hop():
    middleware = main.app.wsgi_app

    assert isinstance(middleware, ProxyFix)
    assert middleware.x_for == 1
    assert middleware.x_proto == 0
    assert middleware.x_host == 0
    assert middleware.x_port == 0
    assert middleware.x_prefix == 0


def test_send_email_uses_a_bounded_smtp_timeout(monkeypatch):
    smtp_calls = []

    class FakeSMTP:
        def __init__(self, host, port, *, timeout):
            smtp_calls.append({"host": host, "port": port, "timeout": timeout})

        def starttls(self):
            pass

        def login(self, username, password):
            pass

        def send_message(self, message):
            pass

        def quit(self):
            pass

    monkeypatch.setattr(main, "SMTP_HOST", "smtp.example.test")
    monkeypatch.setattr(main, "SMTP_USER", "sender@example.test")
    monkeypatch.setattr(main, "SMTP_PASS", "test-password")
    monkeypatch.setattr(main, "RECIPIENT_EMAIL", "recipient@example.test")
    monkeypatch.setattr(main.smtplib, "SMTP", FakeSMTP)

    main.send_email("Test subject", "Test body")

    assert smtp_calls == [{
        "host": "smtp.example.test",
        "port": main.SMTP_PORT,
        "timeout": main.SMTP_TIMEOUT_SECONDS,
    }]


def test_nginx_rate_limits_write_endpoints_by_binary_client_ip():
    repository_root = Path(__file__).resolve().parents[2]
    site_config = (repository_root / "web-app" / "nginx_site.conf").read_text(encoding="utf-8")
    api_config = (repository_root / "api" / "nginx_vet_api.conf").read_text(encoding="utf-8")

    assert "limit_req_zone $binary_remote_addr zone=esv_contact_per_ip:10m rate=5r/m;" in site_config
    assert "limit_req_zone $binary_remote_addr zone=esv_confirm_per_ip:10m rate=10r/m;" in site_config
    assert "location = /api/contact" in api_config
    assert "limit_req zone=esv_contact_per_ip burst=4 nodelay;" in api_config
    assert "location = /api/confirm-vet" in api_config
    assert "limit_req zone=esv_confirm_per_ip burst=9 nodelay;" in api_config
    assert api_config.count("limit_req_status 429;") == 3


def test_nginx_redirects_legacy_district_urls_to_canonical_slugs():
    repository_root = Path(__file__).resolve().parents[2]
    site_config = (repository_root / "web-app" / "nginx_site.conf").read_text(encoding="utf-8")
    sitemap = (repository_root / "web-app" / "public" / "sitemap.xml").read_text(encoding="utf-8")
    smoke_test = (repository_root / "web-app" / "scripts" / "seo-smoke-test.sh").read_text(encoding="utf-8")
    base_url = "https://englishspeakinggermany.online"
    redirects = {
        "/vets/berlin/düppel/zehlendorf": "/vets/berlin/düppel-zehlendorf",
        "/vets/berlin/friedrichshain-/-others": "/vets/berlin/friedrichshain-others",
        "/vets/frankfurt/dr.-jan-kullen-/-dr.-elena-panova": "/vets/frankfurt/dr-jan-kullen-dr-elena-panova",
        "/vets/frankfurt/gallus/city-west": "/vets/frankfurt/gallus-city-west",
        "/vets/frankfurt/am-nordpark-10,-60437-frankfurt-am-main": "/vets/frankfurt/am-nordpark-10-60437-frankfurt-am-main",
        "/vets/hamburg/bahrenfeld/altona": "/vets/hamburg/bahrenfeld-altona",
        "/vets/wiesloch/near-heidelberg/karlsruhe": "/vets/wiesloch/near-heidelberg-karlsruhe",
    }

    for legacy_path, canonical_path in redirects.items():
        for trailing_slash in ("", "/"):
            expected = (
                f"location = {legacy_path}{trailing_slash} "
                f"{{ return 301 {base_url}{canonical_path}; }}"
            )
            assert expected in site_config

        assert f"<loc>{base_url}{canonical_path}</loc>" in sitemap
        assert f"<loc>{base_url}{legacy_path}</loc>" not in sitemap

    assert (
        '"/vets/frankfurt/am-nordpark-10,-60437-frankfurt-am-main|'
        '/vets/frankfurt/am-nordpark-10-60437-frankfurt-am-main"'
    ) in smoke_test


def test_nginx_redirects_only_obsolete_search_template_queries():
    repository_root = Path(__file__).resolve().parents[2]
    web_app = repository_root / "web-app"
    site_config = (web_app / "nginx_site.conf").read_text(encoding="utf-8")
    smoke_test = (web_app / "scripts" / "seo-smoke-test.sh").read_text(encoding="utf-8")

    assert (
        'if ($request_uri ~ "^/[?](?:s|q)='
        '(?:[{]search_term_string[}]|%7[Bb]search_term_string%7[Dd])$") {'
    ) in site_config
    assert "return 301 https://englishspeakinggermany.online/;" in site_config
    assert '"/?s=%7Bsearch_term_string%7D"' in smoke_test
    assert '"/?q=%7Bsearch_term_string%7D"' in smoke_test
    assert '"/?s=berlin"' in smoke_test
    assert '"/?q=hamburg"' in smoke_test

    condition = re.search(r'if \(\$request_uri ~ "([^"]+)"\) \{', site_config)
    assert condition is not None
    request_pattern = re.compile(condition.group(1))

    for request_uri in (
        "/?s={search_term_string}",
        "/?q={search_term_string}",
        "/?s=%7Bsearch_term_string%7D",
        "/?q=%7bsearch_term_string%7d",
    ):
        assert request_pattern.fullmatch(request_uri)

    for request_uri in (
        "/?s=berlin",
        "/?q=hamburg",
        "/?s=%7Bsearch_term_string%7D&utm_source=test",
        "/contact?s=%7Bsearch_term_string%7D",
    ):
        assert request_pattern.fullmatch(request_uri) is None


def test_hamburg_emergency_content_has_one_canonical_url():
    repository_root = Path(__file__).resolve().parents[2]
    web_app = repository_root / "web-app"
    site_config = (web_app / "nginx_site.conf").read_text(encoding="utf-8")
    sitemap = (web_app / "public" / "sitemap.xml").read_text(encoding="utf-8")
    app_source = (web_app / "src" / "App.tsx").read_text(encoding="utf-8")
    blog_source = (web_app / "src" / "pages" / "Blog.tsx").read_text(encoding="utf-8")
    emergency_source = (web_app / "src" / "pages" / "PetEmergencyGermany.tsx").read_text(encoding="utf-8")
    base_url = "https://englishspeakinggermany.online"
    retired_path = "/guides/emergency-vets-hamburg"
    canonical_path = "/blog/emergency-vet-hamburg-english"

    for trailing_slash in ("", "/"):
        expected = (
            f"location = {retired_path}{trailing_slash} "
            f"{{ return 301 {base_url}{canonical_path}; }}"
        )
        assert expected in site_config

    assert sitemap.count(f"<loc>{base_url}{canonical_path}</loc>") == 1
    assert f"<loc>{base_url}{retired_path}</loc>" not in sitemap
    assert retired_path not in blog_source
    assert canonical_path in blog_source
    assert canonical_path in emergency_source
    assert "PetEmergencyHamburg" not in app_source
    assert f'<Navigate replace to="{canonical_path}" />' in app_source
    assert not (web_app / "src" / "pages" / "PetEmergencyHamburg.tsx").exists()


def test_berlin_emergency_content_has_one_canonical_url():
    repository_root = Path(__file__).resolve().parents[2]
    web_app = repository_root / "web-app"
    site_config = (web_app / "nginx_site.conf").read_text(encoding="utf-8")
    sitemap = (web_app / "public" / "sitemap.xml").read_text(encoding="utf-8")
    app_source = (web_app / "src" / "App.tsx").read_text(encoding="utf-8")
    blog_source = (web_app / "src" / "pages" / "Blog.tsx").read_text(encoding="utf-8")
    sidebar_source = (web_app / "src" / "components" / "BlogSidebar.tsx").read_text(encoding="utf-8")
    article_source = (web_app / "src" / "pages" / "EmergencyVetBerlinGuide.tsx").read_text(encoding="utf-8")
    base_url = "https://englishspeakinggermany.online"
    retired_path = "/blog/emergency-vet-berlin-english"
    canonical_path = "/guides/emergency-vets-berlin"

    for trailing_slash in ("", "/"):
        expected = (
            f"location = {retired_path}{trailing_slash} "
            f"{{ return 301 {base_url}{canonical_path}; }}"
        )
        assert expected in site_config

    assert sitemap.count(f"<loc>{base_url}{canonical_path}</loc>") == 1
    assert f"<loc>{base_url}{retired_path}</loc>" not in sitemap
    assert retired_path not in blog_source
    assert canonical_path in blog_source
    assert canonical_path in sidebar_source
    assert retired_path not in article_source
    assert f"const ARTICLE_URL = '{base_url}{canonical_path}';" in article_source
    assert article_source.count("ARTICLE_URL") >= 4
    assert "import('./pages/EmergencyVetsBerlin')" not in app_source
    assert f'<Route path="{canonical_path}" element={{<EmergencyVetBerlinGuide />}} />' in app_source
    assert f'<Navigate replace to="{canonical_path}" />' in app_source
    assert not (web_app / "src" / "pages" / "EmergencyVetsBerlin.tsx").exists()


def test_retired_blog_redirects_are_direct_for_both_trailing_variants():
    repository_root = Path(__file__).resolve().parents[2]
    web_app = repository_root / "web-app"
    site_config = (web_app / "nginx_site.conf").read_text(encoding="utf-8")
    cologne_source = (web_app / "src" / "pages" / "PublicTransportCologne.tsx").read_text(encoding="utf-8")
    smoke_test = (web_app / "scripts" / "seo-smoke-test.sh").read_text(encoding="utf-8")
    redirect_pattern = re.compile(
        r"location = (?P<source>/blog/\S+) \{ return 301 (?P<target>https://\S+); \}"
    )
    redirects = {
        match.group("source"): match.group("target")
        for match in redirect_pattern.finditer(site_config)
    }

    for source, target in list(redirects.items()):
        if not source.endswith("/"):
            assert redirects.get(f"{source}/") == target

    transport_aliases = {
        "/blog/public-transport-dogs-hamburg": "/blog/public-transport-with-dogs-hamburg",
        "/blog/public-transport-dogs-munich-mvv": "/blog/public-transport-with-dogs-munich",
        "/blog/public-transport-dogs-frankfurt-rmv": "/blog/public-transport-with-dogs-frankfurt",
        "/blog/public-transport-dogs-stuttgart": "/blog/public-transport-with-dogs-stuttgart",
    }
    base_url = "https://englishspeakinggermany.online"
    for alias, canonical in transport_aliases.items():
        assert redirects.get(alias) == f"{base_url}{canonical}"
        assert alias not in cologne_source
        assert canonical in cologne_source
        assert f'"{alias}|{canonical}"' in smoke_test

    assert 'for suffix in "" "/"; do' in smoke_test


# --- CSP report-only telemetry ---

def test_csp_report_accepts_and_sanitizes_a_browser_violation(monkeypatch):
    warning_calls = []
    monkeypatch.setattr(main.logger, "warning", lambda *args: warning_calls.append(args))
    payload = {
        "csp-report": {
            "effective-directive": "script-src\nforged-log-line",
            "blocked-uri": "https://evil.example/tracker.js?token=secret",
            "document-uri": "https://englishspeakinggermany.online/contact?email=private@example.com",
        }
    }

    response = main.app.test_client().post(
        "/api/csp-report",
        data=json.dumps(payload),
        content_type="application/csp-report",
    )

    assert response.status_code == 204
    assert warning_calls == [(
        "CSP violation: directive=%s blocked=%s document=%s",
        "script-src forged-log-line",
        "https://evil.example/tracker.js",
        "https://englishspeakinggermany.online/contact",
    )]


def test_csp_report_rejects_invalid_payloads():
    response = main.app.test_client().post(
        "/api/csp-report",
        data="{}",
        content_type="application/csp-report",
    )

    assert response.status_code == 400


def test_csp_report_rejects_oversized_payloads():
    response = main.app.test_client().post(
        "/api/csp-report",
        data="x" * (16 * 1024 + 1),
        content_type="application/csp-report",
    )

    assert response.status_code == 413


def test_nginx_configures_report_only_csp_and_bounded_reporting():
    repository_root = Path(__file__).resolve().parents[2]
    site_config = (repository_root / "web-app" / "nginx_site.conf").read_text(encoding="utf-8")
    api_config = (repository_root / "api" / "nginx_vet_api.conf").read_text(encoding="utf-8")
    vite_config = (repository_root / "web-app" / "vite.config.ts").read_text(encoding="utf-8")

    assert "add_header Content-Security-Policy-Report-Only" in site_config
    for directive in (
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'self'",
        "form-action 'self'",
        "report-uri /api/csp-report",
    ):
        assert directive in site_config

    assert "limit_req_zone $binary_remote_addr zone=esv_csp_report_per_ip:10m rate=30r/m;" in site_config
    assert "location = /api/csp-report" in api_config
    assert "client_max_body_size 16k;" in api_config
    assert "limit_req zone=esv_csp_report_per_ip burst=14 nodelay;" in api_config
    assert "limit_req_status 429;" in api_config

    assert "Content-Security-Policy-Report-Only" in vite_config
    assert "report-uri /api/csp-report" in vite_config
    assert "process.env.VITE_API_PROXY_TARGET" in vite_config
    assert "'http://localhost:5000'" in vite_config
