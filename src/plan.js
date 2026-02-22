import { blankCount } from './blanks.js';
import { formatPlan } from './format.js';
import { imposeBookSignature } from './impose.js';
import { foldMarks } from './marks.js';
import { lookupPaper } from './paper.js';
import { splitBook } from './split.js';
import { totalSheets } from './sheets.js';
import { validateBook } from './validate.js';

export function planBook(book) {
  const errors = validateBook(book);
  if (errors.length > 0) return { ok: false, errors };

  const imposition = book.imposition ?? 'folio';
  const paper = lookupPaper(book.paper);
  const parts = splitBook(book.pageCount, book.signatureSize);
  const signatures = parts.map((part) => {
    const imposed = imposeBookSignature(part.pages, imposition);
    return {
      index: part.index,
      pages: imposed.pages,
      sheets: imposed.sheets,
    };
  });
  const blanks = blankCount(signatures);
  const plan = {
    ok: true,
    errors: [],
    title: book.title.trim(),
    pageCount: book.pageCount,
    signatureSize: book.signatureSize,
    imposition,
    paper,
    signatures,
    sheetCount: totalSheets(signatures),
    blankCount: blanks,
    marks: foldMarks(paper, imposition),
  };
  plan.text = formatPlan(plan);
  return plan;
}
