import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from sweep_confirmations import apply_confirmations  # noqa: E402


def mk_vet(vet_id, scanned="2025-12-01"):
    return {
        "id": vet_id,
        "practice_name": f"Practice {vet_id}",
        "city": "Berlin",
        "verification": {"status": "Verified", "last_scanned": scanned, "english_signals": ["Original signal"]},
        "community_status": "Verified",
    }


def test_applies_signal_and_bumps_scan_date():
    vets = [mk_vet("Berlin-1")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "Practice Berlin-1", "vetCity": "Berlin"}]
    applied, unknown = apply_confirmations(vets, records)
    assert applied == ["Berlin-1"]
    assert unknown == []
    v = vets[0]["verification"]
    assert "Community confirmation via site button (2026-07-10)" in v["english_signals"]
    assert v["last_scanned"] == "2026-07-10"


def test_never_moves_last_scanned_backwards():
    vets = [mk_vet("Berlin-1", scanned="2026-08-01")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "x", "vetCity": "Berlin"}]
    apply_confirmations(vets, records)
    assert vets[0]["verification"]["last_scanned"] == "2026-08-01"


def test_idempotent_no_duplicate_signals():
    vets = [mk_vet("Berlin-1")]
    records = [{"date": "2026-07-10", "vetId": "Berlin-1", "vetName": "x", "vetCity": "Berlin"}] * 3
    apply_confirmations(vets, records)
    apply_confirmations(vets, records)
    sigs = vets[0]["verification"]["english_signals"]
    assert sigs.count("Community confirmation via site button (2026-07-10)") == 1


def test_unknown_vet_ids_reported_not_applied():
    vets = [mk_vet("Berlin-1")]
    records = [{"date": "2026-07-10", "vetId": "Ghost-99", "vetName": "x", "vetCity": "Nowhere"}]
    applied, unknown = apply_confirmations(vets, records)
    assert applied == []
    assert unknown == ["Ghost-99"]
    assert json.dumps(vets[0]) == json.dumps(mk_vet("Berlin-1"))  # untouched
