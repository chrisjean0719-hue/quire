function cellsOf(side) {
  if (Array.isArray(side)) return side;
  return [[side.left, side.right]];
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }[character]));
}

function round(value) {
  return Math.round(value * 10) / 10;
}

/** One sheet side, with a rectangle and a page number in each cell. No fold marks. */
export function sheetSvg(paper, side, label) {
  const rows = cellsOf(side);
  const rowCount = rows.length;
  const colCount = rows[0].length;
  const width = paper.widthMm;
  const height = paper.heightMm;
  const cellWidth = width / colCount;
  const cellHeight = height / rowCount;
  const fontSize = Math.min(cellWidth, cellHeight) / 5;
  const shapes = [];
  rows.forEach((row, rowIndex) => {
    row.forEach((page, columnIndex) => {
      const x = columnIndex * cellWidth;
      const y = rowIndex * cellHeight;
      const mark = page === null ? 'blank' : page;
      shapes.push(
        `<rect x="${round(x)}" y="${round(y)}" width="${round(cellWidth)}" height="${round(cellHeight)}" fill="white" stroke="black"/>`,
        `<text x="${round(x + cellWidth / 2)}" y="${round(y + cellHeight / 2)}" text-anchor="middle" dominant-baseline="middle" font-size="${round(fontSize)}">${escapeXml(mark)}</text>`,
      );
    });
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(height)}" width="${round(width)}mm" height="${round(height)}mm">`,
    `  <title>${escapeXml(label)}</title>`,
    ...shapes.map((shape) => `  ${shape}`),
    '</svg>',
  ].join('\n');
}

export function sheetDiagrams(plan) {
  const files = [];
  for (const signature of plan.signatures) {
    for (const sheet of signature.sheets) {
      for (const face of ['front', 'back']) {
        const name = `signature-${signature.index + 1}-sheet-${sheet.index + 1}-${face}.svg`;
        const label = `${plan.title}, signature ${signature.index + 1}, sheet ${sheet.index + 1}, ${face}`;
        files.push({ name, svg: sheetSvg(plan.paper, sheet[face], label) });
      }
    }
  }
  return files;
}
