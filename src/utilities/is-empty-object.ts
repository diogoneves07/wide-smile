/**
 * Check if a variable is an empty object.
 */
export default function isEmptyObject(variable: unknown): boolean {
  return Object.keys(variable as Record<string, unknown>).length < 1;
}
