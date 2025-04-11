
export function formatAum(aumValue: number | string | undefined | null): string {
  if (aumValue === null || aumValue === undefined) {
    return 'N/A';
  }
  
  // Convert string to number if needed
  let numAum: number;
  if (typeof aumValue === 'string') {
    numAum = parseFloat(aumValue);
    if (isNaN(numAum)) {
      return 'N/A';
    }
  } else {
    numAum = aumValue;
  }
  
  if (numAum >= 1000) {
    return `${(numAum / 1000).toFixed(1)}B`;
  }
  return `${numAum.toFixed(1)}M`;
}
