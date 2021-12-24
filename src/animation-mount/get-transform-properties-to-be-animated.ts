import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import customForIn from '../utilities/custom-for-in';
import getPropertyObjectToAnimate from './property-object-to-animate';
import { getRealPropertyValue } from './get-real-property-value';
import { getUnitOfMeasureForPropertiesValues } from './get-unit-of-measure-properties';
import organizeTransformFunctionsValues from './organize-transform-functions-values';
import treatPropertyCurrentValue from './treat-property-current-value';

export default function getTransformPropertiesToBeAnimated(
  transformProperties: Record<string, Record<string, ValuesToAnimateProperty>>,
  target: HTMLElement,
  index: number,
  length: number
): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][] {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(transformProperties, (propertyKeyframes, propertyName) => {
    const transformFnName = propertyName;
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = treatPropertyCurrentValue(
        getRealPropertyValue(value, target, index, length),
        transformFnName,
        'transform',
        target
      );

      keyframes[key][propertyName] = v;
    });
  });
  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const properties = getUnitOfMeasureForPropertiesValues(keyframe) as Record<
      string,
      string
    >;

    customForIn(properties, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = organizeTransformFunctionsValues(
        propertyName,
        propertyValue
      );
    });
  });
  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'transform'
  );
}
