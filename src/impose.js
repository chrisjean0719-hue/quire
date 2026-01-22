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

export function pagesOnSheets(sheets) {
  const found = [];
  for (const sheet of sheets) {
    found.push(sheet.front.left, sheet.front.right, sheet.back.left, sheet.back.right);
  }
  return found;
}
