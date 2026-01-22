import assert from 'node:assert/strict';
import { test } from 'node:test';
import { imposeSignature, pagesOnSheets } from '../src/impose.js';

const pages = Array.from({ length: 16 }, (_, index) => index + 1);

test('places the outer folio of a 16-page signature', () => {
  const sheets = imposeSignature(pages);
  assert.equal(sheets.length, 4);
  assert.deepEqual(sheets[0].front, { left: 16, right: 1 });
  assert.deepEqual(sheets[0].back, { left: 2, right: 15 });
  assert.deepEqual(sheets[3].front, { left: 10, right: 7 });
  assert.deepEqual(sheets[3].back, { left: 8, right: 9 });
});

test('uses every page once', () => {
  const found = pagesOnSheets(imposeSignature(pages)).filter((page) => page !== null);
  assert.deepEqual(found.sort((a, b) => a - b), pages);
});

test('refuses a signature that is not a multiple of 4', () => {
  assert.throws(() => imposeSignature([1, 2, 3]), /multiple of 4/);
});
