import { transformFunctionsToObject } from '../animation-engine/crud-animations-style';
import TypeOfPropertiesToAnimate from '../contracts/type-of-properties-to-animate';
import { WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS } from '../sauce/constants';
import getVendorCSSProperty from '../utilities-style/get-vendor-css-property';
import { getAttr } from '../utilities/dom-attributes';
import hasOwnProperty from '../utilities/has-own-property';
import { useElementCanche } from './elements-canche';
import { getUnitOfMeasureForPropertyValue } from './get-unit-of-measure-properties';
import organizeTransformFunctionsValues from './organize-transform-functions-values';

function computedStyle(target: HTMLElement) {
  return (useElementCanche(target).computedStyle as unknown) as Record<
    string,
    string
  >;
}

function getCurrentValueTransformFunction(
  target: HTMLElement,
  transformFunction: string
) {
  const current = target.style[getVendorCSSProperty('transform') as never];

  if (current && current.indexOf(transformFunction) > -1) {
    const transformFunctionsObject = transformFunctionsToObject(target) || {};
    if (
      hasOwnProperty(transformFunctionsObject, transformFunction) &&
      transformFunctionsObject[transformFunction]
    ) {
      return transformFunctionsObject[transformFunction];
    }
  }

  return WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[transformFunction];
}
export default function getPropertyCurrentValue(
  target: HTMLElement,
  propertyName: string,
  type: TypeOfPropertiesToAnimate
): string {
  let currentValue: string;
  switch (type) {
    case 'attr':
      currentValue = getAttr(target, propertyName) || '0';
      break;
    case 'direct':
      currentValue = (target[propertyName as never] as number).toString();
      break;
    case 'transform':
      currentValue = getUnitOfMeasureForPropertyValue(
        propertyName,
        organizeTransformFunctionsValues(
          propertyName,
          getCurrentValueTransformFunction(target, propertyName)
        )
      );
      break;

    default:
      currentValue = computedStyle(target)[propertyName] || '';

      break;
  }
  return currentValue;
}
