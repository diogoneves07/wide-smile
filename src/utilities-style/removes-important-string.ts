/**
 * Removes the CSS string "!important" from all properties.
 */
export default function removesImportantString(CSSStringRules: string): string {
  return CSSStringRules.split('!important').join('');
}
