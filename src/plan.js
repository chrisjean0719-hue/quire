import { blankCount } from './blanks.js';
import { fitOnParent, parentSheetsNeeded } from './fit.js';
import { formatPlan } from './format.js';
import { grainWarnings } from './grain.js';
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
  const parent = book.parent ? lookupPaper(book.parent) : null;
  const fit = parent ? fitOnParent(paper, parent) : null;
  if (fit && !fit.fits) {
    return { ok: false, errors: [`parent: ${paper.name} does not fit on ${parent.name}`] };
  }

  const parts = splitBook(book.pageCount, book.signatureSize);
  const signatures = parts.map((part) => {
    const imposed = imposeBookSignature(part.pages, imposition);
    return {
      index: part.index,
      pages: imposed.pages,
      sheets: imposed.sheets,
    };
  });
  const sheetCount = totalSheets(signatures);
  const plan = {
    ok: true,
    errors: [],
    title: book.title.trim(),
    pageCount: book.pageCount,
    signatureSize: book.signatureSize,
    imposition,
    paper,
    parent,
    fit,
    parentSheets: fit ? parentSheetsNeeded(sheetCount, fit.copies) : null,
    grain: book.grain ?? null,
    warnings: book.grain ? grainWarnings(paper, imposition, book.grain) : [],
    signatures,
    sheetCount,
    blankCount: blankCount(signatures),
    marks: foldMarks(paper, imposition),
  };
  plan.text = formatPlan(plan);
  return plan;
}
