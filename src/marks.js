/** Fold and head marks for a folio sheet, measured from the left and top edges. */
export function foldMarks(paper) {
  return {
    foldXmm: round(paper.widthMm / 2),
    headMm: 12,
    tailMm: round(paper.heightMm - 12),
  };
}

function round(value) {
  return Math.round(value * 10) / 10;
}
