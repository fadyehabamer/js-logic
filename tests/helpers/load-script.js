'use strict';
// Loads a browser demo script into an isolated vm context so its functions
// can be exercised from node:test without a browser or any dependencies.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..', '..');

function fakeElement() {
  return {
    innerHTML: '',
    style: {},
    classList: { add() {}, remove() {} },
    appendChild() {},
    insertAdjacentHTML() {},
    getAttribute() { return null; },
  };
}

function toLocal(value) {
  try {
    return structuredClone(value);
  } catch {
    return value;
  }
}

function loadScript(relPath, globals = {}) {
  const logs = [];
  const context = vm.createContext({
    console: { log: (...args) => logs.push(args), error: (...args) => logs.push(args) },
    document: {
      body: fakeElement(),
      getElementById: () => fakeElement(),
      querySelector: () => fakeElement(),
      createElement: () => fakeElement(),
    },
    setInterval: () => 0,
    clearInterval: () => {},
    ...globals,
  });
  const code = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  vm.runInContext(code, context, { filename: relPath, timeout: 1000 });
  return {
    context,
    logs,
    // Evaluate an expression inside the script's global scope (sees top-level let/const).
    // Plain data is copied into this realm so assert.deepStrictEqual compares values only.
    run: (expr, timeout = 500) => toLocal(vm.runInContext(expr, context, { timeout })),
  };
}

module.exports = { loadScript };
