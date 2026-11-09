import pytest
from submission_guard import notification_slot


def test_duplicate_success_and_hourly_budget(tmp_path):
    path = tmp_path / 'notifications.jsonl'
    with notification_slot(path, 'first', 1) as state:
        assert state == 'ready'
    with notification_slot(path, 'first', 1) as state:
        assert state == 'duplicate'
    with notification_slot(path, 'different', 1) as state:
        assert state == 'limited'


def test_failed_delivery_can_be_retried(tmp_path):
    path = tmp_path / 'notifications.jsonl'
    with pytest.raises(RuntimeError):
        with notification_slot(path, 'first', 1):
            raise RuntimeError('SMTP unavailable')
    with notification_slot(path, 'first', 1) as state:
        assert state == 'ready'


def test_busy_worker_does_not_wait_for_smtp(tmp_path):
    path = tmp_path / 'notifications.jsonl'
    with notification_slot(path, 'first', 2):
        with notification_slot(path, 'second', 2) as state:
            assert state == 'limited'
