import importlib.util
from pathlib import Path

import pytest

spec = importlib.util.spec_from_file_location('publish_static', Path(__file__).with_name('publish-static.py'))
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


def test_publish_excludes_checkout_and_retains_previous_release(tmp_path):
    build = tmp_path / 'web-app/dist'
    build.mkdir(parents=True)
    (build / 'index.html').write_text('first')
    (tmp_path / '.git').mkdir()
    (tmp_path / '.git/config').write_text('private metadata')
    publisher.publish(tmp_path)
    first = (tmp_path / 'public-site').resolve()
    assert (first / 'index.html').read_text() == 'first'
    assert not (first / '.git').exists()
    (build / 'index.html').write_text('second')
    publisher.publish(tmp_path)
    assert (tmp_path / 'previous-public-site').resolve() == first
    assert (tmp_path / 'public-site/index.html').read_text() == 'second'


def test_bad_build_leaves_current_release_untouched(tmp_path):
    build = tmp_path / 'web-app/dist'
    build.mkdir(parents=True)
    (build / 'index.html').write_text('good')
    publisher.publish(tmp_path)
    current = (tmp_path / 'public-site').resolve()
    (build / 'index.html').unlink()
    with pytest.raises(ValueError):
        publisher.publish(tmp_path)
    assert (tmp_path / 'public-site').resolve() == current


def test_previous_release_marker_cannot_overwrite_an_unrelated_file(tmp_path):
    build = tmp_path / 'web-app/dist'
    build.mkdir(parents=True)
    (build / 'index.html').write_text('good')
    publisher.publish(tmp_path)
    marker = tmp_path / 'previous-public-site'
    marker.write_text('retain me')
    with pytest.raises(ValueError):
        publisher.publish(tmp_path)
    assert marker.read_text() == 'retain me'
