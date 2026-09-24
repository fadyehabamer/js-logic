'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { setImmediate: tick } = require('node:timers/promises');
const { loadScript } = require('./helpers/load-script');

const FILE = 'CallBacks-Promises-AsyncAwait/main.js';

test('getUsers handles a failed request instead of leaving the rejection unhandled', async (t) => {
  const unhandled = [];
  const onUnhandled = (reason) => unhandled.push(reason);
  process.on('unhandledRejection', onUnhandled);
  t.after(() => process.off('unhandledRejection', onUnhandled));

  const failure = new Error('network down');
  const { logs } = loadScript(FILE, { fetch: () => Promise.reject(failure) });
  for (let i = 0; i < 5; i++) await tick();

  assert.deepEqual(unhandled, []);
  // Both getUsers() and ASYNCgetUsers() should report the error.
  assert.equal(logs.filter(([arg]) => arg === failure).length, 2);
});

test('getUsers passes the parsed users to the callback', async () => {
  const users = [{ id: 1, name: 'Leanne Graham', phone: '1-770' }];
  const appended = [];
  const { logs } = loadScript(FILE, {
    fetch: async () => ({ json: async () => users }),
    document: {
      createElement: () => ({ innerHTML: '' }),
      body: { appendChild: (el) => appended.push(el) },
    },
  });
  for (let i = 0; i < 5; i++) await tick();
  assert.equal(appended.length, 1);
  assert.match(appended[0].innerHTML, /name = Leanne Graham/);
  assert.ok(logs.some(([arg]) => arg === users));
});
