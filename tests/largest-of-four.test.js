'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./helpers/load-script');

const FILE = 'JS-Beginners-SmallExamples/JS Examples/08 finding largest number in arrays/main.js';

test('largestOfFour returns the largest number of each sub-array', () => {
  const { run } = loadScript(FILE);
  assert.deepEqual(
    run('largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]])'),
    [5, 27, 39, 1001],
  );
  assert.deepEqual(run('largestOfFour([[-72, -3, -17, -10], [-5]])'), [-3, -5]);
});

test('largestOfFour returns null for an empty sub-array', () => {
  const { run } = loadScript(FILE);
  assert.deepEqual(run('largestOfFour([[1, 2], [], [7]])'), [2, null, 7]);
  assert.deepEqual(run('largestOfFour([])'), []);
});
