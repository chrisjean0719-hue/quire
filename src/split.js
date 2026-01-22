/**
 * Split a page count into signatures. The last signature is padded with
 * blank slots so its length is a multiple of 4, and it is never longer
 * than signatureSize.
 */
export function splitBook(pageCount, signatureSize) {
  const signatures = [];
  let start = 1;
  while (start <= pageCount) {
    const remaining = pageCount - start + 1;
    const padded = Math.ceil(remaining / 4) * 4;
    const size = Math.min(signatureSize, padded);
    const pages = [];
    for (let offset = 0; offset < size; offset += 1) {
      const page = start + offset;
      pages.push(page <= pageCount ? page : null);
    }
    signatures.push({ index: signatures.length, pages });
    start += size;
  }
  return signatures;
}
