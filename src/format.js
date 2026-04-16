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

function creepLabel(sheet) {
  if (Array.isArray(sheet.leafCreepMm)) return `, leaf creep ${sheet.leafCreepMm.join(' mm, ')} mm`;
  if (typeof sheet.creepMm === 'number' && sheet.creepMm > 0) return `, creep ${sheet.creepMm} mm`;
  return '';
}

export function formatPlan(plan) {
  const lines = [
    plan.title,
    `${plan.pageCount} pages, ${plan.imposition}, ${plan.paper.name}, ${plan.sheetCount} sheets, ${plan.signatures.length} signature${plan.signatures.length === 1 ? '' : 's'}`,
  ];
  if (plan.blankCount > 0) lines.push(`${plan.blankCount} blank padding slot${plan.blankCount === 1 ? '' : 's'}`);
  if (plan.fit) {
    const turn = plan.fit.rotated ? ', turned' : '';
    lines.push(
      `${plan.parent.name}: ${plan.fit.copies} printed sheet${plan.fit.copies === 1 ? '' : 's'} per parent${turn}, ${plan.parentSheets} parent sheets, ${plan.fit.wasteMm2} mm² waste each`,
    );
  }
  lines.push(`fold at ${plan.marks.foldXmm} mm from the left edge`);
  for (const warning of plan.warnings ?? []) lines.push(`warning: ${warning}`);

  for (const signature of plan.signatures) {
    lines.push('');
    lines.push(`Signature ${signature.index + 1}`);
    for (const sheet of signature.sheets) {
      lines.push(` Sheet ${sheet.index + 1}${creepLabel(sheet)}`);
      lines.push(side('front', sheet.front));
      lines.push(side('back ', sheet.back));
    }
  }
  return lines.join('\n');
}
