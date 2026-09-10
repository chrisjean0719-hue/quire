import assert from 'node:assert/strict';
import { test } from 'node:test';
import { comparePlans, formatCompare } from '../src/compare.js';
import { planBook } from '../src/plan.js';

const folio = {
  title: 'Folio',
  pageCount: 24,
  signatureSize: 8,
  paper: 'letter',
  parent: 'tabloid',
};

const quarto = {
  title: 'Quarto',
  pageCount: 24,
  signatureSize: 8,
  imposition: 'quarto',
  paper: 'a4',
};

test('compares sheet count, blanks, and trimmed waste', () => {
  const left = planBook(folio);
  const right = planBook({ ...folio, pageCount: 10 });
  const diff = comparePlans(left, right);
  assert.deepEqual(diff.sheets, [6, 3]);
  assert.deepEqual(diff.blanks, [0, 2]);
  assert.equal(diff.wasteMm2[0], 0);
  assert.match(formatCompare('folio.json', 'short.json', diff), /sheets: 6 vs 3/);
  assert.match(formatCompare('folio.json', 'short.json', diff), /blanks: 0 vs 2/);
});

test('reports no waste when a book has no parent sheet', () => {
  const diff = comparePlans(planBook(folio), planBook(quarto));
  assert.equal(diff.wasteMm2[1], null);
  assert.match(formatCompare('folio.json', 'quarto.json', diff), /waste: \d+ mm² vs none/);
});
