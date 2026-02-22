import { lookupPaper, paperNames } from './paper.js';
import { pagesPerSheet } from './layouts.js';

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

/** Return a list of problems. An empty list means the book spec can be planned. */
export function validateBook(book) {
  const errors = [];
  if (!book || typeof book !== 'object' || Array.isArray(book)) {
    return ['Book must be an object'];
  }
  if (typeof book.title !== 'string' || book.title.trim() === '') {
    errors.push('title: Book needs a title');
  }
  if (!isPositiveInteger(book.pageCount)) {
    errors.push('pageCount: pageCount must be a positive integer');
  }
  if (!isPositiveInteger(book.signatureSize) || book.signatureSize % 4 !== 0) {
    errors.push('signatureSize: signatureSize must be a positive multiple of 4');
  }
  const imposition = book.imposition ?? 'folio';
  const perSheet = pagesPerSheet(imposition);
  if (perSheet === null) {
    errors.push('imposition: imposition must be folio, quarto, or octavo');
  } else if (isPositiveInteger(book.signatureSize) && book.signatureSize % perSheet !== 0) {
    errors.push(`signatureSize: signatureSize must be a multiple of ${perSheet} for ${imposition}`);
  }
  if (!lookupPaper(book.paper)) {
    errors.push(`paper: Unknown paper "${book.paper}". Use ${paperNames().join(', ')}`);
  }
  return errors;
}
