#!/usr/bin/env node
// Removes deprecated npm_config_http_proxy env var to avoid warnings.
delete process.env.npm_config_http_proxy;
const { spawn } = require('child_process');
const child = spawn('vite', ['build'], { stdio: 'inherit', shell: true });
child.on('exit', code => process.exit(code));
