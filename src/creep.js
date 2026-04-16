/** Millimetres to shift a leaf that has `depth` folios outside it. The outside leaf is depth 0. */
export function creepShift(depth, creepMm) {
  return Math.round(depth * creepMm * 10) / 10;
}

export function folioCreep(sheetIndex, creepMm) {
  return creepShift(sheetIndex, creepMm);
}

/** Quarto folds into two folios. Octavo folds into four. */
export function leafCreep(imposition, creepMm) {
  const leaves = imposition === 'octavo' ? 4 : 2;
  return Array.from({ length: leaves }, (_, depth) => creepShift(depth, creepMm));
}
