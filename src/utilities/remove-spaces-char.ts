/**
 * Removes the spaces between the characters in the string.
 */
export default function removeSpacesChar(str: string): string {
  return str.replace(/[ ]+/g, '');
}
