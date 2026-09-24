'use strict';
// Static checks on every demo page: local script/style/link targets must exist.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

for (const file of htmlFiles(ROOT)) {
  const rel = path.relative(ROOT, file);
  test(`${rel}: local src/href targets exist`, () => {
    const html = stripComments(fs.readFileSync(file, 'utf8'));
    const missing = [];
    for (const [, url] of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/|#|\$\{)/i.test(url)) continue;
      let target = decodeURIComponent(url.split(/[?#]/)[0]);
      target = path.resolve(path.dirname(file), target);
      if (target.endsWith(path.sep) || (fs.existsSync(target) && fs.statSync(target).isDirectory())) {
        target = path.join(target, 'index.html');
      }
      if (!fs.existsSync(target)) missing.push(url);
    }
    assert.deepEqual(missing, []);
  });

  test(`${rel}: has a descriptive title`, () => {
    const html = stripComments(fs.readFileSync(file, 'utf8'));
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
    assert.ok(title && title.trim(), 'missing <title>');
    assert.notEqual(title.trim(), 'Document');
  });
}
