#!/usr/bin/env node
// Removes deprecated npm_config_http_proxy env var before running tests.
delete process.env.npm_config_http_proxy;
const { spawn } = require('child_process');
const child = spawn('vitest', ['run'], { stdio: 'inherit', shell: true });
child.on('exit', code => process.exit(code));
