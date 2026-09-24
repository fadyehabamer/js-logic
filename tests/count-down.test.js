'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./helpers/load-script');

const FILE = 'JS-Beginners-SmallExamples/JS Examples/05  count down/main.js';

// Drives the demo with a fake clock and records what the user sees after each second.
function simulate(maxTicks = 40) {
  const display = { innerHTML: '', style: {} };
  let tick = null;
  let cleared = false;
  loadScript(FILE, {
    document: { getElementById: () => display },
    setInterval: (fn) => { tick = fn; return 1; },
    clearInterval: () => { cleared = true; tick = null; },
  });
  const frames = [display.innerHTML];
  for (let i = 0; i < maxTicks && tick; i++) {
    tick();
    frames.push(display.innerHTML);
  }
  return { frames, cleared };
}

test('count down shows every second from 0:20 to 0:01 before "done"', () => {
  const { frames } = simulate();
  const seen = frames.filter((f) => f !== '');
  const expected = [];
  for (let s = 20; s >= 1; s--) expected.push('0:' + String(s).padStart(2, '0'));
  expected.push('done');
  assert.deepEqual(seen.slice(0, expected.length), expected);
});

test('count down stops its timer once it reaches "done"', () => {
  const { frames, cleared } = simulate();
  assert.equal(cleared, true);
  assert.equal(frames.at(-1), 'done');
});
