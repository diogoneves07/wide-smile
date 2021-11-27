/**
 * Removes the leading and trailing white space and line terminator characters from a string.
 */
export function trimString(string: string): string {
  if (string.trim) {
    return string.trim();
  }
  return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

/**
 * Converts to camelCase the string.
 */
export function toCamelCase(string: string): string {
  const rmsPrefix = /^-ms-/;
  const rdashAlpha = /-([a-z])/g;
  return string
    .replace(rmsPrefix, 'ms-')
    .replace(rdashAlpha, (_all: string, letter: string): string => {
      return letter.toUpperCase();
    });
}
