function $typeof(i: unknown) {
  return typeof i;
}

/**
 * Check if a variable is an empty object.
 */
export function isEmptyObject(variable: unknown): boolean {
  return Object.keys(variable as Record<string, unknown>).length < 1;
}

/** Returns a Boolean value that indicates whether a value is the reserved value number. */
export function isNumber(i: unknown): boolean {
  return $typeof(i) === 'number' && !Number.isNaN(i as number);
}
