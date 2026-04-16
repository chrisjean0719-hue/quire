import assert from 'node:assert/strict';
import { test } from 'node:test';
import { imposeBookSignature } from '../src/impose.js';
import { planBook } from '../src/plan.js';

test('shifts each inner folio by one more paper thickness', () => {
  const pages = Array.from({ length: 16 }, (_, index) => index + 1);
  const { sheets } = imposeBookSignature(pages, 'folio', 0.2);
  assert.deepEqual(
    sheets.map((sheet) => sheet.creepMm),
    [0, 0.2, 0.4, 0.6],
  );
});

test('gives a quarto sheet an outer leaf and an inner leaf', () => {
  const pages = Array.from({ length: 8 }, (_, index) => index + 1);
  const { sheets } = imposeBookSignature(pages, 'quarto', 0.2);
  assert.deepEqual(sheets[0].leafCreepMm, [0, 0.2]);
});

test('prints the inner-folio creep and rejects a negative thickness', () => {
  const plan = planBook({
    title: 'Sample chapbook',
    pageCount: 8,
    signatureSize: 8,
    paper: 'letter',
    creepMm: 0.2,
  });
  assert.equal(plan.ok, true);
  assert.match(plan.text, /Sheet 2, creep 0.2 mm/);
  const rejected = planBook({
    title: 'Bad',
    pageCount: 8,
    signatureSize: 8,
    paper: 'letter',
    creepMm: -1,
  });
  assert.equal(rejected.ok, false);
  assert.match(rejected.errors.join('\n'), /creepMm/);
});
