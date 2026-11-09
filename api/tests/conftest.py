import sys
from pathlib import Path
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import main


@pytest.fixture(autouse=True)
def isolated_notification_budget(monkeypatch, tmp_path):
    monkeypatch.setattr(main, 'PUBLIC_NOTIFICATION_LOG', tmp_path / 'public-notifications.jsonl')
    main.limiter.reset()
