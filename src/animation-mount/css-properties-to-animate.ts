import { isColor } from '../based-implementations/colors';
import customForIn from '../utilities/custom-for-in';
import getUnit from '../utilities/get-unit';
import { toCamelCase, trimString } from '../utilities/handle-string';
import hasOwnProperty from '../utilities/has-own-property';

const CANCHE_COLORS_VALUES: Record<string, string> = {};
const DIV_ELEMENT_STYLE = document.createElement('div').style;

export function addToCancheColorValue(
  wrongValue: string,
  correctValue: string
): void {
  CANCHE_COLORS_VALUES[wrongValue] = correctValue;
}
export function getColorValueFromCanche(value: string): string {
  if (hasOwnProperty(CANCHE_COLORS_VALUES, value)) {
    return CANCHE_COLORS_VALUES[value];
  }
  return value;
}

export function consultComputedStyle(kf: Record<string, string>): boolean {
  return customForIn(kf, (propertyValue, propertyName) => {
    if (propertyValue) {
      DIV_ELEMENT_STYLE.cssText = '';
      const n = toCamelCase(propertyName) as never;
      const unit = getUnit(propertyValue);

      DIV_ELEMENT_STYLE[n] = propertyValue;

      const v1 = DIV_ELEMENT_STYLE[n]
        ? Number(trimString(DIV_ELEMENT_STYLE[n]))
        : DIV_ELEMENT_STYLE[n];
      const v2 = Number(trimString(propertyValue));
      if (
        DIV_ELEMENT_STYLE[n] &&
        (unit === 'px' ||
          isColor(propertyValue) ||
          (DIV_ELEMENT_STYLE[n] === propertyValue &&
            !Number.isNaN(v1) &&
            v1 === v2))
      ) {
        DIV_ELEMENT_STYLE[n] = '';
        return false;
      }
      DIV_ELEMENT_STYLE[n] = '';
    }

    return true;
  });
}
