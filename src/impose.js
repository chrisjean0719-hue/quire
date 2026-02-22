import { IMPOSITIONS, pagesPerSheet, placeGrid } from './layouts.js';

/**
 * Nested folio imposition. Sheet 0 is the outside of the signature.
 * Front right of that sheet is the first page. Blank padded slots stay null.
 */
export function imposeSignature(pages) {
  if (!Array.isArray(pages) || pages.length === 0 || pages.length % 4 !== 0) {
    throw new Error('A signature must contain a positive multiple of 4 pages');
  }
  const sheetCount = pages.length / 4;
  const sheets = [];
  for (let k = 0; k < sheetCount; k += 1) {
    sheets.push({
      index: k,
      front: {
        left: pages[pages.length - 1 - 2 * k],
        right: pages[2 * k],
      },
      back: {
        left: pages[2 * k + 1],
        right: pages[pages.length - 2 - 2 * k],
      },
    });
  }
  return sheets;
}

function padTo(pages, size) {
  const padded = pages.slice();
  const target = Math.ceil(padded.length / size) * size;
  while (padded.length < target) padded.push(null);
  return padded;
}

function imposeGrid(pages, layout) {
  const padded = padTo(pages, layout.pagesPerSheet);
  const sheets = [];
  for (let start = 0; start < padded.length; start += layout.pagesPerSheet) {
    const group = padded.slice(start, start + layout.pagesPerSheet);
    sheets.push({
      index: sheets.length,
      front: placeGrid(group, layout.front),
      back: placeGrid(group, layout.back),
    });
  }
  return { pages: padded, sheets };
}

/** Folio keeps nested sheets. Quarto and octavo use one grid per physical sheet. */
export function imposeBookSignature(pages, imposition = 'folio') {
  if (imposition === 'folio') {
    const padded = padTo(pages, 4);
    return { pages: padded, sheets: imposeSignature(padded) };
  }
  const layout = IMPOSITIONS[imposition];
  if (!layout?.front) throw new Error(`Unknown imposition "${imposition}"`);
  return imposeGrid(pages, layout);
}

export { pagesPerSheet };

export function pagesOnSheets(sheets) {
  const found = [];
  for (const sheet of sheets) {
    collect(found, sheet.front);
    collect(found, sheet.back);
  }
  return found;
}

function collect(found, side) {
  if (Array.isArray(side)) {
    for (const row of side) found.push(...row);
    return;
  }
  found.push(side.left, side.right);
}
