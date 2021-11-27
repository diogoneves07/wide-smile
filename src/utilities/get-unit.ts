import { trimString } from './handle-string';

/**
 * Gets the unit of measure present in the string.
 */
export default function getUnit(val: string): string {
  const propertyValue = trimString(val);

  const n = parseFloat(propertyValue);
  if (
    Number.isNaN(n) ||
    propertyValue.indexOf(',') > -1 ||
    propertyValue.indexOf(' ') > -1
  ) {
    return '';
  }

  return propertyValue
    .split(n.toString())
    .join('')
    .replace(/([0-9 .])/g, '');
}
