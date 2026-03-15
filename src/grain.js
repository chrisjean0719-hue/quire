import { foldMarks } from './marks.js';

/** Long grain runs with the longer edge. A fold along that same direction fights the grain. */
export function grainAxis(paper, grain) {
  const longIsVertical = paper.heightMm >= paper.widthMm;
  if (grain === 'long') return longIsVertical ? 'vertical' : 'horizontal';
  if (grain === 'short') return longIsVertical ? 'horizontal' : 'vertical';
  return null;
}

export function grainWarnings(paper, imposition, grain) {
  const axis = grainAxis(paper, grain);
  if (!axis) return [];
  return foldMarks(paper, imposition)
    .folds.filter((fold) => fold.axis === axis)
    .map((fold) => `${fold.axis} fold runs along the ${grain} grain`);
}
