import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planBook } from '../src/plan.js';

test('plans the sample chapbook', () => {
  const plan = planBook({
    title: 'Sample chapbook',
    pageCount: 24,
    signatureSize: 8,
    paper: 'letter',
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.sheetCount, 6);
  assert.equal(plan.blankCount, 0);
  assert.equal(plan.signatures.length, 3);
  assert.match(plan.text, /front\s+8 \| \s+1/);
});

test('plans one 16-page signature', () => {
  const plan = planBook({
    title: 'Sample single signature',
    pageCount: 16,
    signatureSize: 16,
    paper: 'a4',
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.sheetCount, 4);
  assert.match(plan.text, /front\s+16 \| \s+1/);
  assert.match(plan.text, /fold at 105 mm/);
});

test('returns field paths for a bad spec', () => {
  const plan = planBook({ title: '', pageCount: 0, signatureSize: 3, paper: 'poster' });
  assert.equal(plan.ok, false);
  assert.match(plan.errors.join('\n'), /title:/);
  assert.match(plan.errors.join('\n'), /pageCount:/);
});
