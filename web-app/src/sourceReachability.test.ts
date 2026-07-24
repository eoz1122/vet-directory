import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const sourceRoot = path.resolve(process.cwd(), 'src');
const publicRoot = path.resolve(process.cwd(), 'public');
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

function listFiles(directory: string): string[] {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    });
}

function resolveLocalImport(importer: string, specifier: string): string | null {
    if (!specifier.startsWith('.')) return null;
    const basePath = path.resolve(path.dirname(importer), specifier);
    const candidates = [
        basePath,
        ...sourceExtensions.map((extension) => `${basePath}${extension}`),
        ...sourceExtensions.map((extension) => path.join(basePath, `index${extension}`)),
    ];
    return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) ?? null;
}

function importsFrom(file: string): string[] {
    const source = fs.readFileSync(file, 'utf8');
    const specifiers = new Set<string>();
    const patterns = [
        /\bfrom\s*['"]([^'"]+)['"]/g,
        /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
        /\bimport\s*['"]([^'"]+)['"]/g,
    ];
    for (const pattern of patterns) {
        for (const match of source.matchAll(pattern)) specifiers.add(match[1]);
    }
    return [...specifiers]
        .map((specifier) => resolveLocalImport(file, specifier))
        .filter((resolved): resolved is string => resolved !== null);
}

function reachableFrom(entryFile: string): Set<string> {
    const reachable = new Set<string>();
    const pending = [entryFile];
    while (pending.length > 0) {
        const file = pending.pop();
        if (!file || reachable.has(file)) continue;
        reachable.add(file);
        if (!/\.[jt]sx?$/.test(file)) continue;
        pending.push(...importsFrom(file));
    }
    return reachable;
}

describe('production source reachability', () => {
    it('keeps every production module reachable from the application entry point', () => {
        const reachable = reachableFrom(path.join(sourceRoot, 'main.tsx'));
        const unreachableModules = listFiles(sourceRoot)
            .filter((file) => /\.[jt]sx?$/.test(file))
            .filter((file) => !/\.(?:test|spec)\.[jt]sx?$/.test(file))
            .filter((file) => !file.endsWith('.d.ts'))
            .filter((file) => !reachable.has(file))
            .map((file) => path.relative(sourceRoot, file))
            .sort();

        expect(unreachableModules).toEqual([]);
    });

    it('keeps source assets reachable from the application entry point', () => {
        const reachable = reachableFrom(path.join(sourceRoot, 'main.tsx'));
        const assetsRoot = path.join(sourceRoot, 'assets');
        const unreachableAssets = fs.existsSync(assetsRoot)
            ? listFiles(assetsRoot)
                .filter((file) => !reachable.has(file))
                .map((file) => path.relative(sourceRoot, file))
                .sort()
            : [];

        expect(unreachableAssets).toEqual([]);
    });

    it('does not ship default framework scaffold assets', () => {
        const scaffoldAssets = ['vite.svg']
            .filter((file) => fs.existsSync(path.join(publicRoot, file)));

        expect(scaffoldAssets).toEqual([]);
    });
});
