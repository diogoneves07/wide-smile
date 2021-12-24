import { colorToRgb, isColor } from '../based-implementations/colors';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import isEmptyObject from '../utilities/is-empty-object';
import getComputedValuesAfterChange from '../utilities-style/get-computed-values-after-change';
import getLinkedCSSProperties from '../utilities-style/get-linked-css-properties';
import toCSSStringRules from '../utilities-style/to-css-string-rules';
import customForIn from '../utilities/custom-for-in';
import { toCamelCase, trimString } from '../utilities/handle-string';
import {
  addToCancheColorValue,
  consultComputedStyle,
  getColorValueFromCanche,
} from './css-properties-to-animate';
import getPropertyObjectToAnimate from './property-object-to-animate';
import { getRealPropertyValue } from './get-real-property-value';
import { getUnitOfMeasureForPropertyValue } from './get-unit-of-measure-properties';
import treatPropertyCurrentValue from './treat-property-current-value';

export default function getCSSPropertiesToBeAnimated(
  CSSProperties: Record<string, Record<string, ValuesToAnimateProperty>>,
  target: HTMLElement,
  index: number,
  length: number
): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][] {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(CSSProperties, (propertyKeyframes, propertyName) => {
    const pName = toCamelCase(propertyName);
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }

      const v = getUnitOfMeasureForPropertyValue(
        propertyName,
        treatPropertyCurrentValue(
          getRealPropertyValue(value, target, index, length),
          propertyName,
          'css',
          target
        )
      );

      getLinkedCSSProperties(propertyName).forEach((n) => {
        const name = toCamelCase(n);
        if (typeof value === 'string' && value.indexOf('?') > -1) {
          const currentValue = getUnitOfMeasureForPropertyValue(
            name,
            treatPropertyCurrentValue(value, name, 'css', target)
          );
          keyframes[key][name] = isColor(currentValue)
            ? colorToRgb(currentValue)
            : currentValue;
        } else {
          keyframes[key][name] = v;
        }
      });
      if (!keyframes[key][pName]) {
        keyframes[key][pName] = v;
      }
    });
  });

  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const kf = keyframe;

    customForIn(kf, (propertyValue, propertyName) => {
      kf[propertyName] = getColorValueFromCanche(propertyValue);
    });

    const properties = toCSSStringRules(kf);

    let o: Record<string, string>;

    if (properties && consultComputedStyle(kf)) {
      const propertiesChanged = getComputedValuesAfterChange(
        target,
        properties
      );

      o = isEmptyObject(propertiesChanged.after)
        ? propertiesChanged.before
        : propertiesChanged.after;
    } else {
      o = kf;
    }

    customForIn(o, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = isColor(propertyValue)
        ? colorToRgb(propertyValue)
        : propertyValue;

      if (
        isColor(propertiesKeyframes[propertyName][key]) &&
        propertiesKeyframes[propertyName][key] !== kf[propertyName] &&
        trimString(kf[propertyName]).split(' ').length === 1
      ) {
        addToCancheColorValue(
          kf[propertyName],
          propertiesKeyframes[propertyName][key]
        );
      }
    });
  });

  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'css'
  );
}
