export function sheetsInSignature(pageSlots) {
  return pageSlots / 4;
}

export function totalSheets(signatures) {
  return signatures.reduce((sum, signature) => sum + sheetsInSignature(signature.pages.length), 0);
}
