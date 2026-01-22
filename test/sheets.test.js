import assert from 'node:assert/strict';
import { test } from 'node:test';
import { blankCount } from '../src/blanks.js';
import { foldMarks } from '../src/marks.js';
import { totalSheets } from '../src/sheets.js';

test('counts two sheets for an 8-page signature', () => {
  assert.equal(totalSheets([{ pages: [1, 2, 3, 4, 5, 6, 7, 8] }]), 2);
});

test('counts padding slots', () => {
  assert.equal(blankCount([{ index: 0, pages: [1, 2, null, null] }]), 2);
});

test('puts the folio fold at half the sheet width', () => {
  const marks = foldMarks({ widthMm: 210, heightMm: 297 });
  assert.equal(marks.foldXmm, 105);
  assert.equal(marks.headMm, 12);
  assert.equal(marks.tailMm, 285);
});
