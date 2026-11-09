import importlib.util
from pathlib import Path
import pytest

spec = importlib.util.spec_from_file_location('validate_public_root', Path(__file__).with_name('validate-public-root.py'))
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)
PUBLIC = '/home/englishspeaking/englishspeakinggermany.online/public-site'


def test_commented_public_root_does_not_hide_active_source_root():
    config = '''server { listen 443 ssl; server_name englishspeakinggermany.online;
      root /home/englishspeaking/englishspeakinggermany.online;
      # root /home/englishspeaking/englishspeakinggermany.online/public-site;
    }'''
    with pytest.raises(ValueError):
        gate.validate(config)


def test_checks_target_tls_server_not_an_unrelated_public_root():
    config = f'''server {{ listen 443 ssl; server_name unrelated.test; root {PUBLIC}; }}
    server {{ listen 443 ssl; server_name englishspeakinggermany.online; root /unsafe; }}'''
    with pytest.raises(ValueError):
        gate.validate(config)


def test_accepts_real_target_root_with_braces_inside_quoted_value():
    config = f'''server {{ listen 443 ssl; server_name englishspeakinggermany.online www.englishspeakinggermany.online;
    root {PUBLIC}; add_header Example "{{ ; # }}";
    location / {{ try_files $uri/index.html $uri =404; }} }}'''
    gate.validate(config)


def test_rejects_location_override_of_target_root():
    config = f'''server {{ listen 443 ssl; server_name englishspeakinggermany.online;
      root {PUBLIC}; location /download {{ alias /private/; }} }}'''
    with pytest.raises(ValueError):
        gate.validate(config)


def test_rejects_source_root_hidden_in_an_included_location():
    config = f'''# configuration file /etc/nginx/sites-enabled/esv:
    server {{ listen 443 ssl; server_name englishspeakinggermany.online www.englishspeakinggermany.online;
      root {PUBLIC}; include /etc/nginx/esv-locations.conf; }}
    # configuration file /etc/nginx/esv-locations.conf:
    location /downloads {{ root /source-checkout; }}'''
    with pytest.raises(ValueError):
        gate.validate(config)
