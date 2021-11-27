import removesImportantString from './removes-important-string';
/**
 * Adds the CSS string "!important" to all properties.
 */
export default function CSSPropertiesImportant(CSSStringRules: string): string {
  return removesImportantString(CSSStringRules).split(';').join(' !important;');
}
