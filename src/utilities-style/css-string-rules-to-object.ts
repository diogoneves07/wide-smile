import { removeSpacesChar, toCamelCase, trimString } from '../utilities/index';

/**
 * Converts CSS string rules to object.
 */
export default function CSSStringRulesToObject(
  CSSStringRules: string
): Record<string, string> {
  const CSSProperties = `${CSSStringRules};`.split(';');
  const styleObject: Record<string, string> = {};
  CSSProperties.forEach((value) => {
    const property = value;
    const propertyIndex = property.indexOf(':') + 1;
    const propertyName = property.substring(0, propertyIndex - 1);
    if (propertyName) {
      styleObject[removeSpacesChar(toCamelCase(propertyName))] = trimString(
        property.substring(propertyIndex, property.length)
      );
    }
  });
  return styleObject;
}
