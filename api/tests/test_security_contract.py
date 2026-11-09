from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def test_nginx_serves_only_a_public_release_and_denies_private_paths():
    config = (ROOT / 'web-app/nginx_site.conf').read_text()
    assert 'root /home/englishspeaking/englishspeakinggermany.online/public-site;' in config
    assert 'location ~ /\\.(?!well-known(?:/|$))' in config
    assert 'location ~* ^/(?:api|web-app|deploy|scripts|site-releases)(?:/|$)' in config
    assert 'location ~* \\.(?:csv|jsonl|log|bak|py|sh|toml|ya?ml|md)$' in config
    assert 'add_header Content-Security-Policy "' in config
    assert 'max-age=31536000' in config


def test_deployment_runs_tests_before_publishing_a_release():
    script = (ROOT / 'deploy.sh').read_text()
    assert 'npm run test' in script
    assert 'python -m pytest' in script
    assert script.index('npm run test') < script.index('python deploy/publish-static.py')
    assert script.index('python -m pytest') < script.index('python deploy/publish-static.py')
    assert 'cp -r web-app/dist/* .' not in script
    assert 'Public-root migration is required' in script


def test_ci_checks_frontend_backend_and_supply_chain():
    config = (ROOT / '.github/workflows/quality.yml').read_text()
    for required in ('npm ci', 'npm run test', 'npm run lint', 'npm run build', 'npm audit', 'pytest'):
        assert required in config
