import toCSSKebabCase from './to-css-kebab-case';
import { customForIn } from '../utilities/index';

/**
 * Converts a style object to a style string.
 */
export default function toCSSStringRules(styleObject: object): string {
  let string = '';
  customForIn(styleObject, (_value, propertyName) => {
    string = `${string} ${propertyName}: ${styleObject[propertyName]};`;
  });
  return toCSSKebabCase(string);
}
