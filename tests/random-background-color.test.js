'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./helpers/load-script');

const FILE = 'Random-Background-Color/main.js';
// CSS hex colours are valid only with 3, 4, 6 or 8 hex digits; anything else is ignored by the browser.
const VALID_HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

test('every colour in the palette is a valid CSS hex colour', () => {
  const { run } = loadScript(FILE);
  const invalid = run('colors').filter((c) => !VALID_HEX.test(c));
  assert.deepEqual(invalid, []);
});

test('randColors applies a colour from the palette', () => {
  const body = { style: {} };
  const { run } = loadScript(FILE, { document: { body } });
  run('randColors()');
  assert.ok(run('colors').includes(body.style.backgroundColor));
});
