import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const repositoryRoot = path.resolve(process.cwd(), '..');
const pollerPath = path.join(repositoryRoot, 'deploy/vps-poll-deploy.sh');
const successRecorderPath = path.join(repositoryRoot, 'deploy/record-deploy-success.sh');
const deployScriptPath = path.join(repositoryRoot, 'deploy.sh');

function git(workingDirectory, ...args) {
    return execFileSync('git', args, {
        cwd: workingDirectory,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
}

function runPoller(repositoryDirectory, markerPath) {
    return spawnSync('bash', [pollerPath], {
        cwd: repositoryRoot,
        encoding: 'utf8',
        env: {
            ...process.env,
            ESV_DEPLOY_MARKER: markerPath,
            ESV_REPO_DIR: repositoryDirectory,
        },
    });
}

describe('deployment success tracking', () => {
    let temporaryDirectory;
    let repositoryDirectory;
    let markerPath;
    let deployCountPath;

    beforeEach(() => {
        temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'esv-deploy-reliability-'));
        const remoteDirectory = path.join(temporaryDirectory, 'origin.git');
        repositoryDirectory = path.join(temporaryDirectory, 'repository');
        markerPath = path.join(temporaryDirectory, 'last-successful-deploy');
        deployCountPath = path.join(temporaryDirectory, 'deploy-count');

        git(temporaryDirectory, 'init', '--bare', remoteDirectory);
        git(temporaryDirectory, 'clone', remoteDirectory, repositoryDirectory);
        git(repositoryDirectory, 'config', 'user.name', 'Deploy Test');
        git(repositoryDirectory, 'config', 'user.email', 'deploy-test@example.com');

        fs.writeFileSync(path.join(repositoryDirectory, 'site.txt'), 'current\n');
        fs.writeFileSync(
            path.join(repositoryDirectory, 'deploy.sh'),
            `#!/bin/bash
set -e
count=0
if [ -f "${deployCountPath}" ]; then
    count=$(cat "${deployCountPath}")
fi
printf '%s\\n' "$((count + 1))" > "${deployCountPath}"
if [ -f "${path.join(temporaryDirectory, 'fail-deploy')}" ]; then
    exit 7
fi
bash "${successRecorderPath}"
`,
        );
        git(repositoryDirectory, 'add', 'site.txt', 'deploy.sh');
        git(repositoryDirectory, 'commit', '-m', 'Initial deploy fixture');
        git(repositoryDirectory, 'push', 'origin', 'HEAD:main');
        const currentBranch = git(repositoryDirectory, 'branch', '--show-current');
        git(repositoryDirectory, 'branch', '--set-upstream-to=origin/main', currentBranch);
        fs.writeFileSync(markerPath, 'older-successful-sha\n');
    });

    afterEach(() => {
        fs.rmSync(temporaryDirectory, { force: true, recursive: true });
    });

    it('records the deployed commit only after the live health check', () => {
        const deploySource = fs.readFileSync(deployScriptPath, 'utf8');
        const healthCheckFailure = deploySource.indexOf('Post-deploy check FAILED');
        const successRecorder = deploySource.indexOf('record-deploy-success.sh');

        expect(healthCheckFailure).toBeGreaterThan(-1);
        expect(successRecorder).toBeGreaterThan(healthCheckFailure);
    });

    it('deploys when the checked-out commit matches remote but the success marker is stale', () => {
        const firstRun = runPoller(repositoryDirectory, markerPath);

        expect(firstRun.status).toBe(0);
        expect(fs.readFileSync(deployCountPath, 'utf8')).toBe('1\n');
        expect(fs.readFileSync(markerPath, 'utf8').trim()).toBe(
            git(repositoryDirectory, 'rev-parse', 'origin/main'),
        );

        const secondRun = runPoller(repositoryDirectory, markerPath);

        expect(secondRun.status).toBe(0);
        expect(secondRun.stdout).toContain('Up to date');
        expect(fs.readFileSync(deployCountPath, 'utf8')).toBe('1\n');
    });

    it('keeps the old marker after failure so the next poll retries the deployment', () => {
        const failureSwitch = path.join(temporaryDirectory, 'fail-deploy');
        fs.writeFileSync(failureSwitch, 'fail\n');

        const failedRun = runPoller(repositoryDirectory, markerPath);

        expect(failedRun.status).toBe(7);
        expect(fs.readFileSync(markerPath, 'utf8')).toBe('older-successful-sha\n');
        expect(fs.readFileSync(deployCountPath, 'utf8')).toBe('1\n');

        fs.unlinkSync(failureSwitch);
        const retryRun = runPoller(repositoryDirectory, markerPath);

        expect(retryRun.status).toBe(0);
        expect(fs.readFileSync(deployCountPath, 'utf8')).toBe('2\n');
        expect(fs.readFileSync(markerPath, 'utf8').trim()).toBe(
            git(repositoryDirectory, 'rev-parse', 'origin/main'),
        );
    });
});
