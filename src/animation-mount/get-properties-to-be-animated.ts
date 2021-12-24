import { WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS } from '../sauce/constants';
import { getCustomProperty } from '../sauce/custom-properties-for-animations';
import isEmptyObject from '../utilities/is-empty-object';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import getLinkedCSSProperties from '../utilities-style/get-linked-css-properties';
import getVendorCSSProperty from '../utilities-style/get-vendor-css-property';
import customForIn from '../utilities/custom-for-in';
import { getAttr } from '../utilities/dom-attributes';
import hasOwnProperty from '../utilities/has-own-property';
import ordernateByGrowingValues from '../utilities/ordernate-by-growing-values';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
import TargetsAnimationProperty from '../contracts/targets-animation-property';
import getCSSPropertiesToBeAnimated from './get-css-properties-to-be-animated';
import getDirectPropertiesToBeAnimated from './get-direct-properties-to-be-animated';
import getTransformPropertiesToBeAnimated from './get-transform-properties-to-be-animated';
import TypeOfPropertiesToAnimate from '../contracts/type-of-properties-to-animate';
import getAttrPropertiesToBeAnimated from './get-attr-properties-to-be-animated';
import isDOMElement from '../utilities/is-dom-element';

/* eslint-disable @typescript-eslint/no-use-before-define  */

type PropertyObject = AnimationAuxiliaryObject['propertiesToBeAnimate'][number];

type Properties = Record<string, Record<string, ValuesToAnimateProperty>>;

function revealSpecialProperties(
  propertyName: string,
  propertyValue: unknown,
  target: object,
  index: number
): Record<string, unknown> {
  const pName = propertyName;
  const specialPropertyCallback = getCustomProperty(pName, 'special');

  const propertiesFound: Record<string, unknown> = {};
  if (specialPropertyCallback) {
    const o = specialPropertyCallback(propertyValue as never, target, index);
    customForIn(o, (value, name) => {
      if (getCustomProperty(name, 'special')) {
        Object.assign(
          propertiesFound,
          revealSpecialProperties(name, value, target, index)
        );
      } else {
        propertiesFound[name] = value;
      }
    });
  }

  return propertiesFound;
}

function treatEachTypeProperties(
  properties: Properties,
  type: TypeOfPropertiesToAnimate,
  target: object,
  index: number,
  length: number
) {
  if (!isEmptyObject(properties)) {
    let fn: Function;
    switch (type) {
      case 'attr':
        fn = getAttrPropertiesToBeAnimated;
        break;
      case 'transform':
        fn = getTransformPropertiesToBeAnimated;
        break;
      case 'direct':
        fn = getDirectPropertiesToBeAnimated;
        break;
      default:
        fn = getCSSPropertiesToBeAnimated;
        break;
    }
    return fn(
      properties,
      target,
      index,
      length
    ) as AnimationAuxiliaryObject['propertiesToBeAnimate'][number][];
  }
  return false;
}

function organizePropertiesToBeAnimate(
  properties: PropertiesToAnimateObjectKeyframes,
  target: object,
  index: number,
  originalArrayLength: number
) {
  const DOMElement = isDOMElement(target);
  const CSSProperties: Properties = {};
  const attrProperties: Properties = {};
  const transformProperties: Properties = {};
  const directProperties: Properties = {};
  const observedProperties: PropertyObject[] = [];
  customForIn(properties, (propertyValue, propertyName) => {
    const keyframes = { ...propertyValue };
    const isCSSProperty = DOMElement
      ? getLinkedCSSProperties(getVendorCSSProperty(propertyName as string))[0]
      : false;

    if (getCustomProperty(propertyName, 'observed')) {
      if (keyframes[0] === '?') {
        keyframes[0] = undefined as never;
      }
      if (keyframes[100] === '?') {
        keyframes[100] = keyframes[0];
      }

      observedProperties.push({
        keyframes,
        keyframesKeys: ordernateByGrowingValues(Object.keys(keyframes)),
        target,
        index,
        propertyName: propertyName as string,
        type: 'observed',
        originalArrayLength,
      });
    } else if (
      hasOwnProperty(WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS, propertyName)
    ) {
      transformProperties[propertyName] = keyframes;
    } else if (
      DOMElement &&
      (getAttr(target as HTMLElement, propertyName) !== null || !isCSSProperty)
    ) {
      attrProperties[propertyName] = keyframes;
    } else if (isCSSProperty) {
      CSSProperties[getVendorCSSProperty(propertyName as string)] = keyframes;
    } else if (propertyName in target) {
      directProperties[propertyName] = keyframes;
    }
  });

  const objectsWithProperties: [Properties, TypeOfPropertiesToAnimate][] = [
    [CSSProperties, 'css'],
    [attrProperties, 'attr'],
    [transformProperties, 'transform'],
    [directProperties, 'direct'],
  ];
  return { observedProperties, otherProperties: objectsWithProperties };
}
export default function getPropertiesToBeAnimated(
  targetObject: TargetsAnimationProperty[number],
  props: PropertiesToAnimateObjectKeyframes,
  specials: PropertiesToAnimateObjectKeyframes
): AnimationAuxiliaryObject['propertiesToBeAnimate'] {
  let propertiesToBeAnimate: PropertyObject[] = [];
  const properties = props;

  const { target, index, originalArrayLength } = targetObject;

  customForIn(specials, (o, propertyName) => {
    customForIn(o, (value, key) => {
      customForIn(
        revealSpecialProperties(propertyName as string, value, target, index),
        (v, n) => {
          const newPropertyName = n as never;
          if (!properties[newPropertyName]) {
            properties[newPropertyName] = {} as never;
          }
          if (value !== '?') {
            properties[newPropertyName][key] = v as never;
          } else {
            properties[newPropertyName][key] = value as never;
          }
        }
      );
    });
  });
  const organizedProperties = organizePropertiesToBeAnimate(
    properties,
    target,
    index,
    originalArrayLength
  );

  propertiesToBeAnimate = propertiesToBeAnimate.concat(
    organizedProperties.observedProperties
  );

  organizedProperties.otherProperties.forEach((o) => {
    const p = treatEachTypeProperties(
      o[0],
      o[1],
      target as HTMLElement,
      index,
      originalArrayLength
    );
    if (p) {
      propertiesToBeAnimate = propertiesToBeAnimate.concat(p);
    }
  });
  return propertiesToBeAnimate;
}
