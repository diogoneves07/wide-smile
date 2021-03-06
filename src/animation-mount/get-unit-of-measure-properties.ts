import toCSSKebabCase from '../utilities-style/to-css-kebab-case';
import customForIn from '../utilities/custom-for-in';
import getUnit from '../utilities/get-unit';
import { trimString } from '../utilities/handle-string';
import hasOwnProperty from '../utilities/has-own-property';

const DIV_ELEMENT_STYLE = document.createElement('div').style;
const possibleUnits = ['px', 'deg'];
const possibleUnitsLength = possibleUnits.length;
const knownProperties: Record<string, string> = {
  perspective: 'px',
  rotate: 'deg',
  rotate3d: '',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  translate: 'px',
  translate3d: 'px',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px',
  scale: '',
  scale3d: '',
  scaleX: '',
  scaleY: '',
  scaleZ: '',
  skew: 'deg',
  skewX: 'deg',
  skewY: 'deg',
  scrollLeft: '',
  scrollTop: '',
  scrollTo: '',
  opacity: '',
};
export function getUnitOfMeasureForPropertyValue(
  propertyName: string,
  propertyValue: string
): string {
  const propertyNameCSS = toCSSKebabCase(propertyName) as never;
  if (typeof propertyValue === 'string') {
    return propertyValue
      .split(' ')
      .map((value) => {
        const v = trimString(value);
        const valueNumber = parseFloat(v);

        if (
          !getUnit(v) &&
          typeof valueNumber === 'number' &&
          !Number.isNaN(valueNumber)
        ) {
          if (hasOwnProperty(knownProperties, propertyName)) {
            return (
              valueNumber +
              knownProperties[propertyName] +
              (v.indexOf(',') > -1 ? ',' : '')
            );
          }

          for (let index = 0; index < possibleUnitsLength; index += 1) {
            const u = possibleUnits[index];

            DIV_ELEMENT_STYLE[propertyNameCSS] = v + u;

            if (DIV_ELEMENT_STYLE.item(0)) {
              knownProperties[propertyName] = u;
              DIV_ELEMENT_STYLE[propertyNameCSS] = '';

              return v + u;
            }
          }

          DIV_ELEMENT_STYLE[propertyNameCSS] = '';
        }

        return value;
      })
      .join(' ');
  }

  return propertyValue;
}
export function getUnitOfMeasureForPropertiesValues<T>(
  keyframe: Record<string, string>
): T {
  const k = keyframe;
  customForIn(k, (propertyValue, propertyName) => {
    k[propertyName] = getUnitOfMeasureForPropertyValue(
      propertyName,
      propertyValue
    );
  });
  return (k as unknown) as T;
}
