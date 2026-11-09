#!/usr/bin/python3 -I
"""Root-owned, read-only gate. Never print the Nginx configuration dump."""
import re
import subprocess
import fnmatch

PUBLIC_ROOT = '/home/englishspeaking/englishspeakinggermany.online/public-site'
HOSTS = {'englishspeakinggermany.online', 'www.englishspeakinggermany.online'}
TOKEN = re.compile(r'''"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\#[^\n]*|[{};]|[^{};\s\#]+''')


def parse(config):
    root, parts = [], []
    stack = [root]
    for token in TOKEN.findall(config):
        if token.startswith('#'):
            continue
        if token.startswith(('"', "'")):
            parts.append(re.sub(r'\\(.)', r'\1', token[1:-1]))
        elif token == '{':
            if not parts:
                raise ValueError('Unnamed configuration block.')
            children = []
            stack[-1].append((parts[0], parts[1:], children))
            stack.append(children)
            parts = []
        elif token == '}':
            if parts or len(stack) == 1:
                raise ValueError('Malformed configuration block.')
            stack.pop()
        elif token == ';':
            if parts:
                stack[-1].append((parts[0], parts[1:], []))
                parts = []
        else:
            parts.append(token)
    if parts or len(stack) != 1:
        raise ValueError('Incomplete configuration dump.')
    return root


def walk(nodes):
    for node in nodes:
        yield node
        yield from walk(node[2])


def validate(config):
    chunks = re.split(r'(?m)^[ \t]*# configuration file ([^\n]+):[ \t]*\n', config)
    files = {chunks[index]: parse(chunks[index + 1]) for index in range(1, len(chunks), 2)}

    def expand(nodes, seen=frozenset()):
        result = []
        for directive, args, children in nodes:
            if directive != 'include':
                result.append((directive, args, expand(children, seen)))
                continue
            for pattern in args:
                matches = [path for path in files if fnmatch.fnmatchcase(path, pattern)]
                if not matches:
                    raise ValueError('Included server configuration is missing from the validated dump.')
                for path in matches:
                    if path in seen:
                        raise ValueError('Recursive configuration include.')
                    result.extend(expand(files[path], seen | {path}))
        return result

    found = set()
    for name, _args, children in walk(parse(config)):
        if name != 'server':
            continue
        names = {arg for directive, args, _ in children if directive == 'server_name' for arg in args}
        if not names & HOSTS:
            continue
        tls = any(directive == 'listen' and any(re.search(r'(?:^|:)443$', arg) for arg in args)
                  for directive, args, _ in children)
        if not tls:
            continue
        children = expand(children)
        roots = [args for directive, args, _ in children if directive == 'root']
        if roots != [[PUBLIC_ROOT]]:
            raise ValueError('Target TLS server does not use the isolated public root.')
        for directive, args, _ in walk(children):
            if directive == 'alias' or (directive == 'root' and args != [PUBLIC_ROOT]):
                raise ValueError('Target server contains a conflicting filesystem location.')
        found.update(names & HOSTS)
    if found != HOSTS:
        raise ValueError('Both production TLS hostnames must use the public root.')


if __name__ == '__main__':
    try:
        result = subprocess.run(['/usr/sbin/nginx', '-T'], check=True, capture_output=True, text=True, timeout=20)
        validate(result.stdout)
    except (ValueError, subprocess.SubprocessError, OSError):
        raise SystemExit('Public-root migration is required or active Nginx validation failed.')
    print('Validated isolated production TLS roots.')
