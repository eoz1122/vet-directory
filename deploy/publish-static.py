"""Publish only build output, switching a public symlink atomically."""
import os
from pathlib import Path
import shutil
import tempfile


def replace_link(link: Path, target: Path) -> None:
    if link.exists() and not link.is_symlink():
        raise ValueError(f'Refusing to overwrite a non-symlink: {link}')
    pending = link.with_name(link.name + '.next')
    if pending.exists() or pending.is_symlink():
        raise ValueError(f'Unexpected pending release link: {pending}')
    try:
        pending.symlink_to(target, target_is_directory=True)
        os.replace(pending, link)
    finally:
        if pending.is_symlink():
            pending.unlink()


def publish(project_root: Path) -> Path:
    root = project_root.resolve()
    build = root / 'web-app/dist'
    if not (build / 'index.html').is_file():
        raise ValueError('Build is missing index.html; current release was not changed.')
    # Refuse source/runtime data accidentally added to a build by a future script.
    for item in build.rglob('*'):
        if item.is_symlink() or any(part.startswith('.') for part in item.relative_to(build).parts):
            raise ValueError('Build contains a symlink or hidden file.')
        if item.suffix.lower() in {'.csv', '.jsonl', '.log', '.py', '.sh', '.toml', '.yaml', '.yml', '.md', '.bak'}:
            raise ValueError('Build contains a private file type.')
    current = root / 'public-site'
    previous = current.resolve() if current.is_symlink() else None
    if current.exists() and not current.is_symlink():
        raise ValueError('public-site must be a symlink, not an existing directory.')
    releases = root / 'site-releases'
    releases.mkdir(exist_ok=True)
    release = Path(tempfile.mkdtemp(prefix='release-', dir=releases))
    try:
        shutil.copytree(build, release, dirs_exist_ok=True)
        if previous:
            replace_link(root / 'previous-public-site', previous)
        replace_link(current, release)
    except Exception:
        shutil.rmtree(release)
        raise
    return release


if __name__ == '__main__':
    print(publish(Path(__file__).resolve().parents[1]))
