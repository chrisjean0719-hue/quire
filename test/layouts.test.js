import assert from 'node:assert/strict';
import { test } from 'node:test';
import { imposeBookSignature, pagesOnSheets } from '../src/impose.js';
import { planBook } from '../src/plan.js';

test('prints an 8-page signature on one quarto sheet', () => {
  const pages = Array.from({ length: 8 }, (_, index) => index + 1);
  const { sheets } = imposeBookSignature(pages, 'quarto');
  assert.equal(sheets.length, 1);
  assert.deepEqual(sheets[0].front[1], [8, 1]);
  assert.deepEqual(sheets[0].back[1], [2, 7]);
  const found = pagesOnSheets(sheets).filter((page) => page !== null).sort((a, b) => a - b);
  assert.deepEqual(found, pages);
});

test('prints a 16-page signature on one octavo sheet', () => {
  const pages = Array.from({ length: 16 }, (_, index) => index + 1);
  const { sheets } = imposeBookSignature(pages, 'octavo');
  assert.equal(sheets.length, 1);
  assert.deepEqual(sheets[0].front[1], [16, 1, 8, 9]);
  const found = pagesOnSheets(sheets).filter((page) => page !== null).sort((a, b) => a - b);
  assert.deepEqual(found, pages);
});

test('plans the quarto chapbook as three sheets', () => {
  const plan = planBook({
    title: 'Sample quarto',
    pageCount: 24,
    signatureSize: 8,
    imposition: 'quarto',
    paper: 'a4',
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.sheetCount, 3);
  assert.equal(plan.marks.folds.length, 2);
  assert.match(plan.text, /8 \| \s+1/);
});

test('rejects an octavo signature smaller than 16 pages', () => {
  const plan = planBook({
    title: 'Too small',
    pageCount: 8,
    signatureSize: 8,
    imposition: 'octavo',
    paper: 'letter',
  });
  assert.equal(plan.ok, false);
  assert.match(plan.errors.join('\n'), /multiple of 16/);
});
