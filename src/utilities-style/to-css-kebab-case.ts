/**
 * Converts the string to a CSS valid.
 */
export default function toCSSKebabCase(string: string): string {
  const rdashAlpha = /([A-Z])/g;
  return string.replace(rdashAlpha, (_all, letter: string) => {
    return `-${letter}`.toLowerCase();
  });
}
