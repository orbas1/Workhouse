#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const esbuild = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'esbuild'));

process.chdir('frontend');

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (full.endsWith('.js') || full.endsWith('.jsx')) {
      files.push(full);
    }
  }
}

walk('src');
if (fs.existsSync('pages')) walk('pages');
if (fs.existsSync('scripts')) walk('scripts');
if (fs.existsSync('components')) walk('components');
if (fs.existsSync('context')) walk('context');
if (fs.existsSync('utils')) walk('utils');
if (fs.existsSync('views')) walk('views');
if (fs.existsSync('api')) walk('api');

const errors = [];
for (const file of files) {
  try {
    esbuild.transformSync(fs.readFileSync(file, 'utf8'), {
      loader: file.endsWith('.jsx') ? 'jsx' : 'js',
      format: 'esm'
    });
  } catch (err) {
    errors.push(`Build error in frontend/${file}:\n${err.message}`);
  }
}

if (errors.length) {
  console.log('Errors found:');
  console.log(errors.join('\n\n'));
  process.exit(1);
} else {
  console.log('No syntax errors found in frontend.');
}
