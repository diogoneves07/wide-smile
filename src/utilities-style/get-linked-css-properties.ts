import toCSSKebabCase from './to-css-kebab-case';

const DIV_ELEMENT_STYLE = document.createElement('div').style;
const KNOWN_PROPERTIES: Record<string, string[]> = {};
export default function getLinkedCSSProperties(
  propertyName: string,
  propertyValue?: string
): string[] {
  if (KNOWN_PROPERTIES[propertyName]) {
    return KNOWN_PROPERTIES[propertyName];
  }
  DIV_ELEMENT_STYLE.cssText = '';

  const propertyNameCSS = toCSSKebabCase(propertyName);

  const linkedCSSPropertiesList: string[] = [];

  let counting = 0;

  const values = [propertyValue, 'inherit', 'initial'];
  const l = values.length;
  let property = '';
  for (let index = 0; index < l; index += 1) {
    const value = values[index];
    if (value) {
      DIV_ELEMENT_STYLE[propertyNameCSS as never] = value;
      property = DIV_ELEMENT_STYLE.item(counting);
      if (property) {
        break;
      }
    }
  }

  while (property !== '') {
    linkedCSSPropertiesList.push(property);

    counting += 1;
    property = DIV_ELEMENT_STYLE.item(counting);
  }

  KNOWN_PROPERTIES[propertyName] = linkedCSSPropertiesList;

  return KNOWN_PROPERTIES[propertyName];
}
