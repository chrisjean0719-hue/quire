import assert from 'node:assert/strict';
import { test } from 'node:test';
import { splitBook } from '../src/split.js';

test('splits 24 pages into three signatures of 8', () => {
  const parts = splitBook(24, 8);
  assert.equal(parts.length, 3);
  assert.deepEqual(parts[0].pages, [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(parts[2].pages, [17, 18, 19, 20, 21, 22, 23, 24]);
});

test('pads a short last signature to a multiple of 4', () => {
  const parts = splitBook(10, 8);
  assert.equal(parts.length, 2);
  assert.deepEqual(parts[1].pages, [9, 10, null, null]);
});
