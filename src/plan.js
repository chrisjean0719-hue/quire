import { blankCount } from './blanks.js';
import { formatPlan } from './format.js';
import { imposeSignature } from './impose.js';
import { foldMarks } from './marks.js';
import { lookupPaper } from './paper.js';
import { splitBook } from './split.js';
import { totalSheets } from './sheets.js';
import { validateBook } from './validate.js';

export function planBook(book) {
  const errors = validateBook(book);
  if (errors.length > 0) return { ok: false, errors };

  const paper = lookupPaper(book.paper);
  const parts = splitBook(book.pageCount, book.signatureSize);
  const signatures = parts.map((part) => ({
    index: part.index,
    pages: part.pages,
    sheets: imposeSignature(part.pages),
  }));
  const blanks = blankCount(signatures);
  const plan = {
    ok: true,
    errors: [],
    title: book.title.trim(),
    pageCount: book.pageCount,
    signatureSize: book.signatureSize,
    paper,
    signatures,
    sheetCount: totalSheets(signatures),
    blankCount: blanks,
    marks: foldMarks(paper),
  };
  plan.text = formatPlan(plan);
  return plan;
}
