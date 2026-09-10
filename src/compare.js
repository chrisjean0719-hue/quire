/** Total trimmed waste across the parent sheets. Null when the book has no parent sheet. */
export function trimmedWaste(plan) {
  if (!plan.fit || plan.fit.wasteMm2 === null || plan.parentSheets === null) return null;
  return plan.fit.wasteMm2 * plan.parentSheets;
}

export function comparePlans(left, right) {
  return {
    sheets: [left.sheetCount, right.sheetCount],
    blanks: [left.blankCount, right.blankCount],
    wasteMm2: [trimmedWaste(left), trimmedWaste(right)],
  };
}

function wasteText(value) {
  return value === null ? 'none' : `${value} mm²`;
}

export function formatCompare(leftName, rightName, diff) {
  return [
    `${leftName} vs ${rightName}`,
    `sheets: ${diff.sheets[0]} vs ${diff.sheets[1]}`,
    `blanks: ${diff.blanks[0]} vs ${diff.blanks[1]}`,
    `waste: ${wasteText(diff.wasteMm2[0])} vs ${wasteText(diff.wasteMm2[1])}`,
  ].join('\n');
}
