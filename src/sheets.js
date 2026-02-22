export function sheetsInSignature(pageSlots) {
  return pageSlots / 4;
}

export function totalSheets(signatures) {
  return signatures.reduce((sum, signature) => {
    if (Array.isArray(signature.sheets)) return sum + signature.sheets.length;
    return sum + sheetsInSignature(signature.pages.length);
  }, 0);
}
