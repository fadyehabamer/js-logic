'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScript } = require('./helpers/load-script');

const FILE = 'JS-Beginners-SmallExamples/JS Examples/06 chuncky monkey/main.js';

test('chunky monkey splits into groups of the given size', () => {
  const { run } = loadScript(FILE);
  assert.deepEqual(run('divide_array(["a","b","c"], 2)'), [['a', 'b'], ['c']]);
  assert.deepEqual(run('divide_array([0,1,2,3,4,5], 3)'), [[0, 1, 2], [3, 4, 5]]);
  assert.deepEqual(run('divide_array([1,2], 5)'), [[1, 2]]);
  assert.deepEqual(run('divide_array([], 2)'), []);
});

test('chunky monkey does not mutate the input array', () => {
  const { run } = loadScript(FILE);
  run('var input = [1,2,3,4,5]; var out = divide_array(input, 2);');
  assert.deepEqual(run('input'), [1, 2, 3, 4, 5]);
  assert.deepEqual(run('out'), [[1, 2], [3, 4], [5]]);
});

test('chunky monkey rejects a non-positive size instead of looping forever', () => {
  const { run } = loadScript(FILE);
  for (const size of ['0', '-1', 'NaN', '1.5']) {
    assert.throws(() => run(`divide_array([1,2,3], ${size})`), (err) => err.name === 'RangeError');
  }
});
