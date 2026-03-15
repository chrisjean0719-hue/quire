import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fitOnParent } from '../src/fit.js';
import { grainWarnings } from '../src/grain.js';
import { lookupPaper } from '../src/paper.js';
import { planBook } from '../src/plan.js';

const letter = lookupPaper('letter');
const tabloid = lookupPaper('tabloid');
const a5 = lookupPaper('a5');

test('fits two letter sheets on one tabloid sheet when turned', () => {
  const fit = fitOnParent(letter, tabloid);
  assert.equal(fit.fits, true);
  assert.equal(fit.copies, 2);
  assert.equal(fit.rotated, true);
});

test('rejects a printed sheet larger than its parent', () => {
  const plan = planBook({
    title: 'Too big',
    pageCount: 8,
    signatureSize: 8,
    paper: 'letter',
    parent: 'a5',
  });
  assert.equal(plan.ok, false);
  assert.match(plan.errors.join('\n'), /does not fit on A5/);
  assert.equal(fitOnParent(letter, a5).fits, false);
});

test('warns when the folio fold runs along the long grain', () => {
  const plan = planBook({
    title: 'Sample chapbook',
    pageCount: 8,
    signatureSize: 8,
    paper: 'letter',
    parent: 'tabloid',
    grain: 'long',
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.parentSheets, 1);
  assert.match(plan.warnings.join('\n'), /vertical fold runs along the long grain/);
  assert.deepEqual(grainWarnings(letter, 'folio', 'short'), []);
});
