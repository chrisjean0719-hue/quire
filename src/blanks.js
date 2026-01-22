export function blankPages(signatures) {
  const blanks = [];
  for (const signature of signatures) {
    signature.pages.forEach((page, index) => {
      if (page === null) blanks.push({ signature: signature.index, slot: index });
    });
  }
  return blanks;
}

export function blankCount(signatures) {
  return blankPages(signatures).length;
}
