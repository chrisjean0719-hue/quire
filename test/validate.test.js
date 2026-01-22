import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateBook } from '../src/validate.js';

const valid = { title: 'Sample chapbook', pageCount: 24, signatureSize: 8, paper: 'letter' };

test('accepts a complete book spec', () => {
  assert.deepEqual(validateBook(valid), []);
});

test('rejects a signature size that is not a multiple of 4', () => {
  const errors = validateBook({ ...valid, signatureSize: 6 });
  assert.match(errors.join('\n'), /signatureSize/);
});

test('rejects an unknown paper', () => {
  const errors = validateBook({ ...valid, paper: 'poster' });
  assert.match(errors.join('\n'), /Unknown paper/);
});
