import { CSS_VENDORS_LENGTH, CSS_VENDORS } from '../sauce/constants';
import { toCamelCase } from '../utilities/index';

/**
 * Gets the vendor for a determined CSS property.
 *
 * @param propertyName
 * The propertyName
 *
 * @returns {string}
 *
 * The CSS property( with the vendor prefix).
 */
const DIV_ELEMENT_STYLE = document.createElement('div').style;
const KNOWN_PROPERTIES: Record<string, string> = {};
export default function getVendorCSSProperty(
  propertyName: string,
  propertyValue?: string
): string {
  if (KNOWN_PROPERTIES[propertyName]) {
    return KNOWN_PROPERTIES[propertyName];
  }
  DIV_ELEMENT_STYLE.cssText = '';

  let name = propertyName;
  const values = [propertyValue, 'inherit', 'initial'];
  const l = values.length;

  for (let index = 0; index < l; index += 1) {
    const value = values[index];
    if (value) {
      if (name.substring(0, 1) === '-') {
        name = name.replace(/-[^>](.*?)-/, '');
      }
      DIV_ELEMENT_STYLE[toCamelCase(name) as never] = value;
      if (DIV_ELEMENT_STYLE.cssText) {
        KNOWN_PROPERTIES[propertyName] = name;
        return name;
      }
      for (let count = CSS_VENDORS_LENGTH - 1; count >= 0; count -= 1) {
        const n = `-${CSS_VENDORS[count]}-${name}`;
        DIV_ELEMENT_STYLE[toCamelCase(n) as never] = value;
        if (DIV_ELEMENT_STYLE.cssText) {
          KNOWN_PROPERTIES[propertyName] = n;
          return n;
        }
      }
    }
  }
  KNOWN_PROPERTIES[propertyName] = propertyName;

  return propertyName;
}
