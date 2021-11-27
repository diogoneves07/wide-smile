import { customForIn } from '../utilities/index';
import sameCSSProperty from './same-css-property';

/**
 * Checks that a specific property exists in a style object, vendors are not taken into account
 * ([moz, ms, webkit, o]-opacity is equal opacity).
 */
export default function propertyInStyleObject(
  property: string,
  styleObject:
    | Record<keyof HTMLElement['style'], unknown>
    | Record<string, unknown>
): boolean {
  return customForIn(styleObject, (_value, propertyName) => {
    if (sameCSSProperty(propertyName, property)) {
      return true;
    }
    return false;
  });
}
