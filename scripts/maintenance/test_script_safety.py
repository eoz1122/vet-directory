from pathlib import Path


MAINTENANCE_DIR = Path(__file__).parent
REPOSITORY_ROOT = MAINTENANCE_DIR.parents[1]
SUPPORTED_SCRIPTS = {"sweep_confirmations.py"}


def production_scripts() -> set[str]:
    return {
        path.name
        for path in MAINTENANCE_DIR.glob("*.py")
        if not path.name.startswith("test_")
    }


def test_only_reviewed_maintenance_workflows_remain() -> None:
    assert production_scripts() == SUPPORTED_SCRIPTS


def test_supported_workflows_do_not_contain_developer_specific_paths() -> None:
    unsafe_paths = []

    for script_name in SUPPORTED_SCRIPTS:
        source = (MAINTENANCE_DIR / script_name).read_text(encoding="utf-8")
        if ":\\\\Users\\\\" in source or "/Users/" in source:
            unsafe_paths.append(script_name)

    assert unsafe_paths == []


def test_generated_dataset_backup_is_ignored() -> None:
    ignore_rules = (REPOSITORY_ROOT / ".gitignore").read_text(encoding="utf-8").splitlines()

    assert "web-app/src/data/vets.json.bak" in ignore_rules
