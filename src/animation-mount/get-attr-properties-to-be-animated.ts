import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import toCSSKebabCase from '../utilities-style/to-css-kebab-case';
import customForIn from '../utilities/custom-for-in';
import getPropertyObjectToAnimate from './property-object-to-animate';
import { getRealPropertyValue } from './get-real-property-value';
import treatPropertyCurrentValue from './treat-property-current-value';

export default function getAttrPropertiesToBeAnimated(
  attrProperties: Record<string, Record<string, ValuesToAnimateProperty>>,
  target: HTMLElement,
  index: number,
  length: number
): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][] {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(attrProperties, (propertyKeyframes, propertyName) => {
    const attrName = toCSSKebabCase(propertyName);
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = treatPropertyCurrentValue(
        getRealPropertyValue(value, target, index, length),
        attrName,
        'attr',
        target
      );
      keyframes[key][propertyName] = v;
    });
  });

  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const properties = keyframe;

    customForIn(properties, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }
      propertiesKeyframes[propertyName][key] = propertyValue;
    });
  });

  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'attr'
  );
}
