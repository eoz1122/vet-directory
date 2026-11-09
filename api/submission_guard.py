"""Cross-worker email idempotence and budgets without storing form content."""
from contextlib import contextmanager
from datetime import datetime, timezone
import fcntl
import json
from pathlib import Path


@contextmanager
def notification_slot(path: Path, key: str, hourly_limit: int):
    with Path(path).open('a+', encoding='utf-8') as log:
        try:
            fcntl.flock(log.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            yield 'limited'
            return
        now = datetime.now(timezone.utc).timestamp()
        log.seek(0)
        recent = []
        for line in log:
            try:
                record = json.loads(line)
                if 0 <= now - float(record['timestamp']) < 3600:
                    recent.append(record)
            except (ValueError, TypeError, KeyError, json.JSONDecodeError):
                continue
        if any(record.get('key') == key for record in recent):
            yield 'duplicate'
            return
        if len(recent) >= hourly_limit:
            yield 'limited'
            return
        # Hold the lock through delivery. A failure does not consume the key.
        yield 'ready'
        recent.append({'timestamp': now, 'key': key})
        log.seek(0)
        log.truncate()
        log.write(''.join(json.dumps(record) + '\n' for record in recent))
        log.flush()
