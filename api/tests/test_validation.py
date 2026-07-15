import pytest  # type: ignore
from main import validate_contact_payload, validate_confirm_payload, sanitize  # type: ignore

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
    data = {"vetName": "Tierklinik Berlin", "vetId": "Internal-5", "vetCity": "Berlin"}
    sanitized, error = validate_confirm_payload(data)
    assert error is None
    assert sanitized["vetName"] == "Tierklinik Berlin"
    assert sanitized["vetId"] == "Internal-5"
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
    sanitized, error = validate_confirm_payload({"vetName": "<script>evil</script>Clinic"})
    assert error is None
    assert "<script>" not in sanitized["vetName"]

def test_validate_confirm_payload_length_limit():
    sanitized, error = validate_confirm_payload({"vetName": "x" * 201})
    assert sanitized is None
    assert "200" in error


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
