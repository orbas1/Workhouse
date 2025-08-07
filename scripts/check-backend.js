#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const dirs = [
  'backend/api',
  'backend/config',
  'backend/controllers',
  'backend/data',
  'backend/database',
  'backend/middleware',
  'backend/models',
  'backend/routes',
  'backend/services',
  'backend/scripts',
  'backend/utils',
  'backend/validation',
  'backend/validators'
];

const jsFiles = [];
const pyFiles = [];
const shFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      if (full.endsWith('.js')) jsFiles.push(full);
      else if (full.endsWith('.py')) pyFiles.push(full);
      else if (full.endsWith('.sh')) shFiles.push(full);
    }
  }
}

dirs.forEach(dir => {
  if (fs.existsSync(dir)) walk(dir);
});

// Root-level files
if (fs.existsSync('backend/app.js')) jsFiles.push('backend/app.js');
if (fs.existsSync('app.js')) jsFiles.push('app.js');
if (fs.existsSync('db_setup')) shFiles.push('db_setup');

const errors = [];

jsFiles.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    new vm.Script(code, { filename: file });
  } catch (err) {
    errors.push(`JS syntax error in ${file}:\n${err.message}`);
  }
});

pyFiles.forEach(file => {
  try {
    execSync(`python -m py_compile "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    errors.push(`Python syntax error in ${file}:\n${err.stderr.toString()}`);
  }
});

shFiles.forEach(file => {
  try {
    execSync(`bash -n "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    errors.push(`Shell syntax error in ${file}:\n${err.stderr.toString()}`);
  }
});

if (errors.length) {
  console.log('Errors found:');
  console.log(errors.join('\n\n'));
  process.exit(1);
} else {
  console.log('No syntax errors found in backend.');
}
