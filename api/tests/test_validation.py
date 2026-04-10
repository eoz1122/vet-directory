import pytest
from main import validate_contact_payload, sanitize

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
