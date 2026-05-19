import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sheetDiagrams } from '../src/diagram.js';
import { planBook } from '../src/plan.js';

test('draws both sides of each folio sheet', () => {
  const plan = planBook({
    title: 'Sample & signature',
    pageCount: 16,
    signatureSize: 16,
    paper: 'a4',
  });
  const diagrams = sheetDiagrams(plan);
  assert.equal(diagrams.length, 8);
  assert.equal(diagrams[0].name, 'signature-1-sheet-1-front.svg');
  assert.match(diagrams[0].svg, /viewBox="0 0 210 297"/);
  assert.match(diagrams[0].svg, />16</);
  assert.match(diagrams[0].svg, />1</);
  assert.match(diagrams[0].svg, /Sample &amp; signature/);
});

test('draws a quarto sheet as four cells', () => {
  const plan = planBook({
    title: 'Quarto',
    pageCount: 8,
    signatureSize: 8,
    imposition: 'quarto',
    paper: 'a4',
  });
  const front = sheetDiagrams(plan)[0].svg;
  assert.equal(front.match(/<rect /g).length, 4);
  assert.match(front, />8</);
});
