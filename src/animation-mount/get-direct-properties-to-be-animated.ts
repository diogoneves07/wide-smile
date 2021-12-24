import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import { WIDE_SMILE_SCROLL_PROPERTIES } from '../sauce/constants';
import customForIn from '../utilities/custom-for-in';
import getPropertyObjectToAnimate from './property-object-to-animate';
import { getRealPropertyValue } from './get-real-property-value';
import getScrollValues from './get-scroll-values';
import treatPropertyCurrentValue from './treat-property-current-value';

export default function getDirectPropertiesToBeAnimated(
  targetProperties: Record<string, Record<string, ValuesToAnimateProperty>>,
  target: object,
  index: number,
  length: number
): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][] {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(targetProperties, (propertyKeyframes, propertyName) => {
    const scrollProperty = propertyName;
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = treatPropertyCurrentValue(
        getRealPropertyValue(value, target, index, length),
        scrollProperty,
        'direct',
        target as never
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
      if (WIDE_SMILE_SCROLL_PROPERTIES.indexOf(propertyName as string) > -1) {
        propertiesKeyframes[propertyName][key] = getScrollValues(
          target as HTMLElement,
          propertyValue
        )[propertyName as 'scrollTop' | 'scrollLeft'];
      } else {
        propertiesKeyframes[propertyName][key] = propertyValue;
      }
    });
  });
  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'direct'
  );
}
