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
