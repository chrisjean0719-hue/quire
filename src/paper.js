/** Trim sizes in millimetres. These are the finished sheet sizes, not a press manufacturer's private data. */
export const PAPERS = {
  letter: { name: 'US Letter', widthMm: 215.9, heightMm: 279.4 },
  tabloid: { name: 'Tabloid', widthMm: 279.4, heightMm: 431.8 },
  a4: { name: 'A4', widthMm: 210, heightMm: 297 },
  a5: { name: 'A5', widthMm: 148, heightMm: 210 },
  a3: { name: 'A3', widthMm: 297, heightMm: 420 },
};

export function lookupPaper(name) {
  if (typeof name !== 'string') return null;
  return PAPERS[name.trim().toLowerCase()] ?? null;
}

export function paperNames() {
  return Object.keys(PAPERS);
}
