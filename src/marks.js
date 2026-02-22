/** Fold and head marks. Folio has one vertical fold. Quarto adds a horizontal fold. Octavo adds the quarter folds. */
export function foldMarks(paper, imposition = 'folio') {
  const folds = [{ axis: 'vertical', atMm: round(paper.widthMm / 2) }];
  if (imposition === 'quarto' || imposition === 'octavo') {
    folds.push({ axis: 'horizontal', atMm: round(paper.heightMm / 2) });
  }
  if (imposition === 'octavo') {
    folds.push({ axis: 'vertical', atMm: round(paper.widthMm / 4) }, { axis: 'vertical', atMm: round((paper.widthMm * 3) / 4) });
  }
  return {
    foldXmm: folds[0].atMm,
    headMm: 12,
    tailMm: round(paper.heightMm - 12),
    folds,
  };
}

function round(value) {
  return Math.round(value * 10) / 10;
}
