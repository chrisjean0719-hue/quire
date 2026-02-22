function cell(page) {
  return page === null ? 'blank' : String(page);
}

function side(label, pair) {
  if (Array.isArray(pair)) {
    const rows = pair.map((row) => `    ${row.map((page) => cell(page).padStart(5)).join(' | ')}`);
    return `  ${label}\n${rows.join('\n')}`;
  }
  return `  ${label}  ${cell(pair.left).padStart(5)} | ${cell(pair.right).padStart(5)}`;
}

export function formatPlan(plan) {
  const lines = [
    plan.title,
    `${plan.pageCount} pages, ${plan.imposition}, ${plan.paper.name}, ${plan.sheetCount} sheets, ${plan.signatures.length} signature${plan.signatures.length === 1 ? '' : 's'}`,
  ];
  if (plan.blankCount > 0) lines.push(`${plan.blankCount} blank padding slot${plan.blankCount === 1 ? '' : 's'}`);
  lines.push(`fold at ${plan.marks.foldXmm} mm from the left edge`);

  for (const signature of plan.signatures) {
    lines.push('');
    lines.push(`Signature ${signature.index + 1}`);
    for (const sheet of signature.sheets) {
      lines.push(` Sheet ${sheet.index + 1}`);
      lines.push(side('front', sheet.front));
      lines.push(side('back ', sheet.back));
    }
  }
  return lines.join('\n');
}
