#!/usr/bin/env python3
"""Sweep community ConfirmEnglish submissions from the VPS into vets.json.

The API appends each confirmation as a JSONL line to
/home/englishspeaking/englishspeakinggermany.online/api/confirmations.jsonl
(see api/main.py append_confirmation). This script:

  1. reads that file over SSH,
  2. applies each record to web-app/src/data/vets.json (CRLF preserved):
     dated pending community evidence without changing verification state,
  3. removes exactly the processed lines from the remote log (race-safe),
  4. prints a summary. Committing/pushing is left to the caller.

Usage: python3 scripts/maintenance/sweep_confirmations.py [--dry-run]
Run from the repo root. Requires SSH access to root@72.62.95.46.
"""
import json
import os
import stat
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

VPS = "root@72.62.95.46"
REMOTE_LOG = "/home/englishspeaking/englishspeakinggermany.online/api/confirmations.jsonl"
VETS_JSON = "web-app/src/data/vets.json"
MAX_BATCH_LINES = 1_000
MAX_LINE_BYTES = 4_096
MAX_VET_ID_LENGTH = 100


class ConfirmationLogError(ValueError):
    """Raised when an untrusted confirmation log record is unsafe to process."""


def parse_confirmation_lines(lines: list[str]) -> list[dict]:
    """Parse and validate all remote JSONL records or reject the whole batch."""
    records = []
    invalid_lines = []

    for line_number, line in enumerate(lines, start=1):
        if len(line.encode("utf-8")) > MAX_LINE_BYTES:
            invalid_lines.append(line_number)
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            invalid_lines.append(line_number)
            continue

        if not isinstance(record, dict):
            invalid_lines.append(line_number)
            continue

        vet_id = record.get("vetId")
        record_date = record.get("date")
        if not isinstance(vet_id, str) or not vet_id.strip() or len(vet_id) > MAX_VET_ID_LENGTH:
            invalid_lines.append(line_number)
            continue
        if not isinstance(record_date, str):
            invalid_lines.append(line_number)
            continue

        try:
            parsed_date = date.fromisoformat(record_date)
        except ValueError:
            invalid_lines.append(line_number)
            continue
        if parsed_date.isoformat() != record_date or parsed_date > date.today():
            invalid_lines.append(line_number)
            continue

        records.append(record)

    if invalid_lines:
        line_list = ", ".join(str(line_number) for line_number in invalid_lines)
        raise ConfirmationLogError(f"invalid confirmation log line(s): {line_list}")

    return records


def read_vets(path: str | Path) -> list:
    """Load the canonical dataset after explicit encoding and CRLF validation."""
    target_path = Path(path)
    raw = target_path.read_bytes()
    non_crlf = raw.replace(b"\r\n", b"")
    if b"\r\n" not in raw or b"\n" in non_crlf or b"\r" in non_crlf:
        raise ValueError("vets.json must use CRLF line endings exclusively")

    vets = json.loads(raw.decode("utf-8"))
    if not isinstance(vets, list):
        raise ValueError("vets.json must contain a JSON array")
    return vets


def _stage_bytes(target_path: Path, content: bytes, mode: int) -> Path:
    descriptor, temporary_name = tempfile.mkstemp(
        dir=target_path.parent,
        prefix=f".{target_path.name}.",
        suffix=".tmp",
    )
    temporary_path = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "wb") as temporary_file:
            temporary_file.write(content)
            temporary_file.flush()
            os.fsync(temporary_file.fileno())
        os.chmod(temporary_path, mode)
        return temporary_path
    except Exception:
        temporary_path.unlink(missing_ok=True)
        raise


def write_vets_atomically(path: str | Path, vets: list) -> Path:
    """Create a rotating backup, then atomically replace the canonical dataset."""
    target_path = Path(path)
    original = target_path.read_bytes()
    mode = stat.S_IMODE(target_path.stat().st_mode)
    output = (json.dumps(vets, indent=2, ensure_ascii=False).replace("\n", "\r\n") + "\r\n").encode("utf-8")
    backup_path = target_path.with_name(f"{target_path.name}.bak")
    staged_paths = []

    try:
        backup_temporary = _stage_bytes(target_path, original, mode)
        staged_paths.append(backup_temporary)
        output_temporary = _stage_bytes(target_path, output, mode)
        staged_paths.append(output_temporary)

        os.replace(backup_temporary, backup_path)
        staged_paths.remove(backup_temporary)
        os.replace(output_temporary, target_path)
        staged_paths.remove(output_temporary)

        directory_descriptor = os.open(target_path.parent, os.O_RDONLY)
        try:
            os.fsync(directory_descriptor)
        finally:
            os.close(directory_descriptor)
    finally:
        for staged_path in staged_paths:
            staged_path.unlink(missing_ok=True)

    return backup_path


def apply_confirmations(vets: list, records: list) -> tuple[list, list]:
    """Record confirmation submissions as pending evidence in place.

    Returns (applied_vet_ids, unknown_vet_ids). Idempotent: a signal for the
    same vet and date is added once; verification state remains unchanged.
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
        pending = vet.get("pending_community_confirmations")
        if pending is None:
            pending = []
        if not isinstance(pending, list) or any(
            not isinstance(item, dict)
            or set(item) != {"date", "source"}
            or not isinstance(item["date"], str)
            or item["source"] != "site_button"
            for item in pending
        ):
            raise ValueError(
                f"invalid pending_community_confirmations for vet {vet['id']}"
            )

        confirmation = {"date": date, "source": "site_button"}
        if confirmation not in pending:
            pending.append(confirmation)
            vet["pending_community_confirmations"] = pending
            applied.append(vet["id"])
    return applied, unknown


def main() -> int:
    dry_run = "--dry-run" in sys.argv

    fetch = subprocess.run(
        [
            "ssh",
            "-o",
            "BatchMode=yes",
            VPS,
            f"head -n {MAX_BATCH_LINES + 1} {REMOTE_LOG} 2>/dev/null || true",
        ],
        capture_output=True,
        text=True,
        timeout=30,
    )
    if fetch.returncode != 0:
        print(f"ERROR: could not reach VPS: {fetch.stderr.strip()}")
        return 1

    lines = [ln for ln in fetch.stdout.splitlines() if ln.strip()]
    if not lines:
        print("Nothing to sweep: confirmations log is empty.")
        return 0
    if len(lines) > MAX_BATCH_LINES:
        print(f"ERROR: confirmation batch exceeds the {MAX_BATCH_LINES}-record safety limit.")
        return 1

    try:
        records = parse_confirmation_lines(lines)
    except ConfirmationLogError as error:
        print(f"ERROR: {error}. Remote log left untouched.")
        return 1
    print(f"Fetched {len(lines)} valid log lines.")

    try:
        vets = read_vets(VETS_JSON)
    except (OSError, ValueError) as error:
        print(f"ERROR: could not safely read {VETS_JSON}: {error}")
        return 1

    try:
        applied, unknown = apply_confirmations(vets, records)
    except ValueError as error:
        print(f"ERROR: could not safely apply confirmations: {error}")
        return 1
    print(f"Applied to {len(applied)} vets: {', '.join(applied) or '-'}")
    if unknown:
        print(f"WARNING: unknown vet ids (left in remote log for review): {', '.join(unknown)}")

    if dry_run:
        print("Dry run: no files written, remote log untouched.")
        return 0

    if applied:
        try:
            backup_path = write_vets_atomically(VETS_JSON, vets)
        except (OSError, TypeError, ValueError) as error:
            print(f"ERROR: could not safely write {VETS_JSON}: {error}")
            return 1
        print(f"Wrote {VETS_JSON} atomically; previous data saved to {backup_path}.")

    # Remove exactly the lines we processed; anything appended since stays.
    # Unknown-id lines are also kept so a human can investigate them.
    if not unknown:
        trim = subprocess.run(
            ["ssh", "-o", "BatchMode=yes", VPS, f"sed -i '1,{len(lines)}d' {REMOTE_LOG}"],
            capture_output=True, text=True, timeout=30,
        )
        if trim.returncode != 0:
            print(f"ERROR: remote log trim failed: {trim.stderr.strip()}")
            return 1
        print("Remote log trimmed.")
    else:
        print("Remote log left untrimmed because of unknown ids.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
