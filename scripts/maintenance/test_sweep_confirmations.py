import json
import os
import sys
from pathlib import Path
from types import SimpleNamespace

import pytest

sys.path.insert(0, str(Path(__file__).parent))
import sweep_confirmations as sweep  # noqa: E402

apply_confirmations = sweep.apply_confirmations


def mk_vet(vet_id, scanned="2025-12-01", community_status="Verified"):
    return {
        "id": vet_id,
        "practice_name": f"Practice {vet_id}",
        "city": "Berlin",
        "verification": {"status": "Verified", "last_scanned": scanned, "english_signals": ["Original signal"]},
        "community_status": community_status,
    }


def test_records_pending_confirmation_without_promoting_verification():
    vets = [mk_vet("Berlin-1", community_status="Unverified")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "Practice Berlin-1", "vetCity": "Berlin"}]
    applied, unknown = apply_confirmations(vets, records)
    assert applied == ["Berlin-1"]
    assert unknown == []
    assert vets[0]["pending_community_confirmations"] == [
        {"date": "2026-07-10", "source": "site_button"},
    ]
    assert vets[0]["community_status"] == "Unverified"
    assert vets[0]["verification"] == {
        "status": "Verified",
        "last_scanned": "2025-12-01",
        "english_signals": ["Original signal"],
    }


def test_never_changes_last_scanned_for_anonymous_confirmation():
    vets = [mk_vet("Berlin-1", scanned="2026-01-01")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "x", "vetCity": "Berlin"}]
    apply_confirmations(vets, records)
    assert vets[0]["verification"]["last_scanned"] == "2026-01-01"


def test_idempotent_no_duplicate_signals():
    vets = [mk_vet("Berlin-1")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "x", "vetCity": "Berlin"}] * 3
    first_applied, _ = apply_confirmations(vets, records)
    second_applied, _ = apply_confirmations(vets, records)
    assert first_applied == ["Berlin-1"]
    assert second_applied == []
    assert vets[0]["pending_community_confirmations"] == [
        {"date": "2026-07-10", "source": "site_button"},
    ]
    assert vets[0]["verification"]["english_signals"] == ["Original signal"]


def test_unknown_vet_ids_reported_not_applied():
    vets = [mk_vet("Berlin-1")]
    records = [{"date": "2026-07-10", "vetId": "Ghost-99", "vetName": "x", "vetCity": "Nowhere"}]
    applied, unknown = apply_confirmations(vets, records)
    assert applied == []
    assert unknown == ["Ghost-99"]
    assert json.dumps(vets[0]) == json.dumps(mk_vet("Berlin-1"))  # untouched


@pytest.mark.parametrize(
    "bad_state",
    [
        {"not": "a list"},
        [{}],
        [{"date": "2026-07-10", "source": "unexpected"}],
    ],
)
def test_rejects_malformed_pending_confirmation_state(bad_state):
    vet = mk_vet("Berlin-1")
    vet["pending_community_confirmations"] = bad_state

    with pytest.raises(ValueError, match="pending_community_confirmations"):
        apply_confirmations(
            [vet],
            [{"date": "2026-07-10", "vetId": "Berlin-1"}],
        )


def test_main_does_not_trim_when_local_pending_state_is_invalid(monkeypatch, tmp_path):
    vets_path = tmp_path / "vets.json"
    vet = mk_vet("Berlin-1")
    vet["pending_community_confirmations"] = {"not": "a list"}
    raw = (json.dumps([vet], indent=2).replace("\n", "\r\n") + "\r\n").encode()
    vets_path.write_bytes(raw)
    calls = []

    def fake_run(args, **_kwargs):
        calls.append(args)
        return SimpleNamespace(
            returncode=0,
            stdout='{"date":"2026-07-10","vetId":"Berlin-1"}\n',
            stderr="",
        )

    monkeypatch.setattr(sweep.subprocess, "run", fake_run)
    monkeypatch.setattr(sweep, "VETS_JSON", str(vets_path))
    monkeypatch.setattr(sys, "argv", ["sweep_confirmations.py"])

    assert sweep.main() == 1
    assert len(calls) == 1
    assert vets_path.read_bytes() == raw
    assert not vets_path.with_name("vets.json.bak").exists()


@pytest.mark.parametrize(
    "line",
    [
        "not-json",
        json.dumps(["not", "an", "object"]),
        json.dumps({"date": "2026-07-10", "vetId": ""}),
        json.dumps({"date": "not-a-date", "vetId": "Berlin-1"}),
        json.dumps({"date": "2026-07-10"}),
        json.dumps({"date": "9999-12-31", "vetId": "Berlin-1"}),
        json.dumps({"date": "2026-07-10", "vetId": "x" * 101}),
        json.dumps({"date": "2026-07-10", "vetId": "Berlin-1", "padding": "x" * 4096}),
    ],
)
def test_parse_confirmation_lines_rejects_untrusted_records(line):
    with pytest.raises(sweep.ConfirmationLogError):
        sweep.parse_confirmation_lines([line])


def test_main_leaves_remote_log_untouched_when_any_record_is_invalid(monkeypatch, tmp_path):
    calls = []

    def fake_run(args, **_kwargs):
        calls.append(args)
        return SimpleNamespace(
            returncode=0,
            stdout=(
                '{"date":"2026-07-10","vetId":"Berlin-1"}\n'
                "not-json\n"
            ),
            stderr="",
        )

    monkeypatch.setattr(sweep.subprocess, "run", fake_run)
    monkeypatch.setattr(sweep, "VETS_JSON", str(tmp_path / "must-not-be-read.json"))
    monkeypatch.setattr(sys, "argv", ["sweep_confirmations.py"])

    assert sweep.main() == 1
    assert len(calls) == 1
    assert "head -n" in calls[0][-1]


def test_main_rejects_batches_over_the_processing_limit(monkeypatch, tmp_path):
    record = '{"date":"2026-07-10","vetId":"Berlin-1"}'
    calls = []

    def fake_run(args, **_kwargs):
        calls.append(args)
        return SimpleNamespace(
            returncode=0,
            stdout="\n".join([record] * (sweep.MAX_BATCH_LINES + 1)),
            stderr="",
        )

    monkeypatch.setattr(sweep.subprocess, "run", fake_run)
    monkeypatch.setattr(sweep, "VETS_JSON", str(tmp_path / "must-not-be-read.json"))
    monkeypatch.setattr(sys, "argv", ["sweep_confirmations.py"])

    assert sweep.main() == 1
    assert len(calls) == 1


def test_read_vets_rejects_non_crlf_data_even_when_assertions_are_disabled(tmp_path):
    vets_path = tmp_path / "vets.json"
    vets_path.write_bytes((json.dumps([mk_vet("Berlin-1")], indent=2) + "\n").encode())

    with pytest.raises(ValueError, match="CRLF"):
        sweep.read_vets(vets_path)


def test_atomic_write_preserves_original_backup_permissions_and_crlf(tmp_path):
    vets_path = tmp_path / "vets.json"
    original = (json.dumps([mk_vet("Berlin-1")], indent=2).replace("\n", "\r\n") + "\r\n").encode()
    vets_path.write_bytes(original)
    vets_path.chmod(0o640)
    updated = [mk_vet("Berlin-1", scanned="2026-07-10")]

    backup_path = sweep.write_vets_atomically(vets_path, updated)

    assert backup_path.read_bytes() == original
    assert json.loads(vets_path.read_bytes()) == updated
    assert b"\r\n" in vets_path.read_bytes()
    assert b"\n" not in vets_path.read_bytes().replace(b"\r\n", b"")
    assert os.stat(vets_path).st_mode & 0o777 == 0o640
    assert list(tmp_path.glob(".vets.json.*.tmp")) == []


def test_atomic_write_failure_keeps_original_and_cleans_temporary_files(monkeypatch, tmp_path):
    vets_path = tmp_path / "vets.json"
    original = (json.dumps([mk_vet("Berlin-1")], indent=2).replace("\n", "\r\n") + "\r\n").encode()
    vets_path.write_bytes(original)
    real_replace = os.replace
    replacement_count = 0

    def fail_target_replace(source, destination):
        nonlocal replacement_count
        replacement_count += 1
        if Path(destination) == vets_path:
            raise OSError("simulated atomic replacement failure")
        real_replace(source, destination)

    monkeypatch.setattr(sweep.os, "replace", fail_target_replace)

    with pytest.raises(OSError, match="simulated"):
        sweep.write_vets_atomically(vets_path, [mk_vet("Berlin-1", scanned="2026-07-10")])

    assert replacement_count == 2
    assert vets_path.read_bytes() == original
    assert list(tmp_path.glob(".vets.json.*.tmp")) == []


def test_main_reports_failure_when_remote_trim_fails(monkeypatch, tmp_path):
    vets_path = tmp_path / "vets.json"
    original = (json.dumps([mk_vet("Berlin-1")], indent=2).replace("\n", "\r\n") + "\r\n").encode()
    vets_path.write_bytes(original)
    calls = []

    def fake_run(args, **_kwargs):
        calls.append(args)
        if len(calls) == 1:
            return SimpleNamespace(
                returncode=0,
                stdout='{"date":"2026-07-10","vetId":"Berlin-1"}\n',
                stderr="",
            )
        return SimpleNamespace(returncode=1, stdout="", stderr="remote write denied")

    monkeypatch.setattr(sweep.subprocess, "run", fake_run)
    monkeypatch.setattr(sweep, "VETS_JSON", str(vets_path))
    monkeypatch.setattr(sys, "argv", ["sweep_confirmations.py"])

    assert sweep.main() == 1
    assert len(calls) == 2
    assert vets_path.with_name("vets.json.bak").read_bytes() == original
