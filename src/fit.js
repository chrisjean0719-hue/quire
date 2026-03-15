function score(sheetWidth, sheetHeight, parent, rotated) {
  const cols = Math.floor(parent.widthMm / sheetWidth);
  const rows = Math.floor(parent.heightMm / sheetHeight);
  const copies = cols * rows;
  const wasteMm2 = Math.round(parent.widthMm * parent.heightMm - copies * sheetWidth * sheetHeight);
  return { copies, cols, rows, rotated, wasteMm2 };
}

/** How many printed sheets fit on one parent sheet, in the orientation that yields more copies. */
export function fitOnParent(printed, parent) {
  const options = [
    score(printed.widthMm, printed.heightMm, parent, false),
    score(printed.heightMm, printed.widthMm, parent, true),
  ].filter((option) => option.copies > 0);
  if (options.length === 0) return { fits: false, copies: 0, wasteMm2: null, rotated: false, cols: 0, rows: 0 };
  options.sort((a, b) => b.copies - a.copies || a.wasteMm2 - b.wasteMm2);
  return { fits: true, ...options[0] };
}

export function parentSheetsNeeded(printedSheets, copiesPerParent) {
  if (!copiesPerParent) return null;
  return Math.ceil(printedSheets / copiesPerParent);
}
