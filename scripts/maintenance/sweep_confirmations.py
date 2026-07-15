#!/usr/bin/env python3
"""Sweep community ConfirmEnglish submissions from the VPS into vets.json.

The API appends each confirmation as a JSONL line to
/home/englishspeaking/englishspeakinggermany.online/api/confirmations.jsonl
(see api/main.py append_confirmation). This script:

  1. reads that file over SSH,
  2. applies each record to web-app/src/data/vets.json (CRLF preserved):
     dated community-confirmation signal + last_scanned bump (never backwards),
  3. removes exactly the processed lines from the remote log (race-safe),
  4. prints a summary. Committing/pushing is left to the caller.

Usage: python3 scripts/maintenance/sweep_confirmations.py [--dry-run]
Run from the repo root. Requires SSH access to root@72.62.95.46.
"""
import json
import subprocess
import sys

VPS = "root@72.62.95.46"
REMOTE_LOG = "/home/englishspeaking/englishspeakinggermany.online/api/confirmations.jsonl"
VETS_JSON = "web-app/src/data/vets.json"


def apply_confirmations(vets: list, records: list) -> tuple[list, list]:
    """Apply confirmation records to the vets list in place.

    Returns (applied_vet_ids, unknown_vet_ids). Idempotent: a signal for the
    same vet+date is added once; last_scanned never moves backwards.
    """
    by_id = {v["id"]: v for v in vets}
    applied, unknown = [], []
    for rec in records:
        vet = by_id.get(rec.get("vetId", ""))
        if vet is None:
            if rec.get("vetId") and rec["vetId"] not in unknown:
                unknown.append(rec["vetId"])
            continue
        date = rec.get("date", "")
        if not date:
            continue
        ver = vet["verification"]
        signal = f"Community confirmation via site button ({date})"
        if signal not in ver["english_signals"]:
            ver["english_signals"].append(signal)
        if ver.get("last_scanned", "") < date:
            ver["last_scanned"] = date
        vet["community_status"] = "Verified"
        if vet["id"] not in applied:
            applied.append(vet["id"])
    return applied, unknown


def main() -> int:
    dry_run = "--dry-run" in sys.argv

    fetch = subprocess.run(
        ["ssh", "-o", "BatchMode=yes", VPS, f"cat {REMOTE_LOG} 2>/dev/null || true"],
        capture_output=True, text=True, timeout=30,
    )
    if fetch.returncode != 0:
        print(f"ERROR: could not reach VPS: {fetch.stderr.strip()}")
        return 1

    lines = [ln for ln in fetch.stdout.splitlines() if ln.strip()]
    if not lines:
        print("Nothing to sweep: confirmations log is empty.")
        return 0

    records, bad = [], 0
    for ln in lines:
        try:
            records.append(json.loads(ln))
        except json.JSONDecodeError:
            bad += 1
    print(f"Fetched {len(lines)} log lines ({len(records)} valid, {bad} malformed).")

    raw = open(VETS_JSON, newline="").read()
    assert "\r\n" in raw, "vets.json must be CRLF"
    vets = json.loads(raw)

    applied, unknown = apply_confirmations(vets, records)
    print(f"Applied to {len(applied)} vets: {', '.join(applied) or '-'}")
    if unknown:
        print(f"WARNING: unknown vet ids (left in remote log for review): {', '.join(unknown)}")

    if dry_run:
        print("Dry run: no files written, remote log untouched.")
        return 0

    if applied:
        out = json.dumps(vets, indent=2, ensure_ascii=False).replace("\n", "\r\n") + "\r\n"
        open(VETS_JSON, "w", newline="").write(out)
        print(f"Wrote {VETS_JSON} (CRLF preserved).")

    # Remove exactly the lines we processed; anything appended since stays.
    # Unknown-id lines are also kept so a human can investigate them.
    if not unknown:
        trim = subprocess.run(
            ["ssh", "-o", "BatchMode=yes", VPS, f"sed -i '1,{len(lines)}d' {REMOTE_LOG}"],
            capture_output=True, text=True, timeout=30,
        )
        print("Remote log trimmed." if trim.returncode == 0 else f"WARNING: trim failed: {trim.stderr.strip()}")
    else:
        print("Remote log left untrimmed because of unknown ids.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
