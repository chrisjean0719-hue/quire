/**
 * Page grids for one physical sheet. Numbers are 1-based positions in that
 * sheet's page list. Quarto is 8 pages. Octavo is 16. Page 1 sits beside
 * the last page of the sheet on the outer side.
 */
export const QUARTO = {
  pagesPerSheet: 8,
  front: [
    [4, 5],
    [8, 1],
  ],
  back: [
    [6, 3],
    [2, 7],
  ],
};

export const OCTAVO = {
  pagesPerSheet: 16,
  front: [
    [13, 4, 5, 12],
    [16, 1, 8, 9],
  ],
  back: [
    [15, 2, 7, 10],
    [14, 3, 6, 11],
  ],
};

export const IMPOSITIONS = {
  folio: { pagesPerSheet: 4 },
  quarto: QUARTO,
  octavo: OCTAVO,
};

export function pagesPerSheet(imposition = 'folio') {
  return IMPOSITIONS[imposition]?.pagesPerSheet ?? null;
}

export function placeGrid(pages, grid) {
  return grid.map((row) => row.map((number) => pages[number - 1] ?? null));
}
