import assert from 'node:assert/strict';
import { test } from 'node:test';
import { lookupPaper, paperNames } from '../src/paper.js';

test('knows letter and A4 by trimmed size', () => {
  assert.equal(lookupPaper('letter').widthMm, 215.9);
  assert.equal(lookupPaper('A4').heightMm, 297);
  assert.equal(lookupPaper('missing'), null);
  assert.ok(paperNames().includes('a3'));
});
