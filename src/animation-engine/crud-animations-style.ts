import {
  CSSStringRulesToObject,
  getVendorCSSProperty,
  toCSSKebabCase,
} from '../utilities-style/index';
import { customForIn, hasOwnProperty, trimString } from '../utilities/index';
import { setAttr, getAttr } from '../utilities/dom-attributes';
import { getCustomProperty } from '../sauce/custom-properties-for-animations';
import calcNextPropertyValue from './calc-next-property-value';
import { MAX_KEYFRAME } from '../sauce/constants';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { propagateAnimationPropertyEventListener } from '../animation-listeners/animations-listeners-handlers';
import { recyclePropertyObjectToAnimate } from '../animation-mount/property-object-to-animate';
import isDOMElement from '../utilities/is-dom-element';

export function transformFunctionsToObject(
  target: HTMLElement
): Record<string, string> | false {
  const t = getVendorCSSProperty('transform') as never;
  const current = target.style[t];
  if (current) {
    return CSSStringRulesToObject(
      current.replace(/[(]/g, ':').replace(/[)]/g, ';')
    );
  }
  return false;
}
export function transformFunctionsObjectToString(
  transformFunctionsObject: Record<string, string>
): string {
  let newValue = '';
  customForIn(transformFunctionsObject, (v, n) => {
    if (v) {
      newValue += `${n}(${trimString(v)
        .replace(/( {2})/g, ' ')
        .replace(/ /g, ', ')
        .replace(/,,/g, ',')})`;
    }
  });

  return newValue;
}

function animateTargetTransform(
  target: HTMLElement,
  propertyName: string,
  propertyValue: string,
  beforeAnimating: AnimationAuxiliaryObject['valuesOfThePropertiesBeforeAnimating'][number]
) {
  const fnName = propertyName;
  const properties = beforeAnimating.transfromFns;
  const elt = target;
  const t = getVendorCSSProperty('transform') as never;
  const transformFunctionsObject = transformFunctionsToObject(target) || {};

  if (!hasOwnProperty(properties, fnName)) {
    properties[fnName] = transformFunctionsObject[fnName] || '';
  }
  transformFunctionsObject[fnName] = propertyValue;

  elt.style[t] = transformFunctionsObjectToString(transformFunctionsObject);
}

function animateTargetCSS(
  target: HTMLElement,
  propertyName: string,
  propertyValue: string,
  beforeAnimating: AnimationAuxiliaryObject['valuesOfThePropertiesBeforeAnimating'][number]
) {
  const properties = beforeAnimating.style;
  const elt = target;

  if (!hasOwnProperty(properties, propertyName)) {
    properties[propertyName] = elt.style[propertyName as never];
  }
  elt.style[propertyName as never] = propertyValue;
}

function animateTargetDirectProps(
  target: HTMLElement,
  propertyName: string,
  propertyValue: string,
  beforeAnimating: AnimationAuxiliaryObject['valuesOfThePropertiesBeforeAnimating'][number]
): void {
  const pName = propertyName as never;
  const elt = target;
  const properties = beforeAnimating.direct;
  if (!hasOwnProperty(beforeAnimating, pName)) {
    properties[pName] = elt[pName];
  }
  elt[pName] = propertyValue as never;
}

function animateTargetAttributes(
  target: HTMLElement,
  propertyName: string,
  propertyValue: string,
  beforeAnimating: AnimationAuxiliaryObject['valuesOfThePropertiesBeforeAnimating'][number]
) {
  const pName = toCSSKebabCase(propertyName);

  const properties = beforeAnimating.attr;
  if (!hasOwnProperty(properties, propertyName)) {
    properties[propertyName] = getAttr(target, pName);
  }

  setAttr(target, pName, propertyValue);
}

function animateTargetObserved(
  target: object,
  propertyName: string,
  value: unknown,
  percentageCompleted: number,
  index: number
) {
  return getCustomProperty(propertyName, 'observed')(
    value,
    percentageCompleted,
    target,
    index
  );
}

export function applyAnimationsStyleToTargets(
  propertiesToBeAnimate: AnimationAuxiliaryObject['propertiesToBeAnimate'],
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject['propertiesToBeAnimate'] {
  const {
    valuesOfThePropertiesBeforeAnimating,
    reverseExecution,
    animation,
  } = animationAuxiliaryObject;
  const progress = animation.progressValue;

  propertiesToBeAnimate.slice().forEach((o, index) => {
    const propertyObject = o;
    const target = propertyObject.target;

    if (
      (isDOMElement(target) || 'parentElement' in target) &&
      !(target as HTMLElement).parentElement &&
      !(target as HTMLElement).parentNode
    ) {
      recyclePropertyObjectToAnimate(propertyObject);
      propertiesToBeAnimate.splice(index, 1);
    } else {
      if (!valuesOfThePropertiesBeforeAnimating[propertyObject.index]) {
        valuesOfThePropertiesBeforeAnimating[propertyObject.index] = {
          style: {},
          attr: {},
          direct: {},
          transfromFns: {},
        };
      }
      let from = 0;
      let to = MAX_KEYFRAME;

      if (propertyObject.keyframesKeys) {
        const l = propertyObject.keyframesKeys.length;
        for (let i = 0; i < l; i += 1) {
          const key = propertyObject.keyframesKeys[i];
          if (progress <= key) {
            to = key;
            break;
          }
          from = key;
        }
      }
      let percentageInRelationToKey =
        to - from > 0
          ? (MAX_KEYFRAME / (to - from)) * (progress - from)
          : MAX_KEYFRAME;

      if (
        typeof propertyObject.lastKey === 'number' &&
        propertyObject.lastKey !== to &&
        !reverseExecution
      ) {
        const s = to;
        percentageInRelationToKey = reverseExecution ? 0 : MAX_KEYFRAME;
        to = propertyObject.lastKey;
        propertyObject.lastKey = s;
        from = to;
      } else {
        propertyObject.lastKey = to;
      }

      if (reverseExecution) {
        const ss = from;
        from = to;
        to = ss;
        percentageInRelationToKey = reverseExecution
          ? MAX_KEYFRAME - percentageInRelationToKey
          : percentageInRelationToKey;
      }

      if (propertyObject.type === 'observed') {
        const result = animationAuxiliaryObject.easing(
          (1 / 100) * percentageInRelationToKey,
          target,
          propertyObject.index,
          propertyObject.originalArrayLength
        );

        const lastValue =
          propertyObject.newPropertyValue ||
          (reverseExecution
            ? propertyObject.keyframes[100]
            : propertyObject.keyframes[0]);

        propertyObject.newPropertyValue = animateTargetObserved(
          target,
          propertyObject.propertyName,

          reverseExecution
            ? propertyObject.keyframes[from]
            : propertyObject.keyframes[to],

          0 + result * (100 - 0),
          propertyObject.index
        );

        if (
          !propagateAnimationPropertyEventListener(
            propertyObject.propertyName,
            animation,
            propertyObject
          )
        ) {
          propertyObject.newPropertyValue = animateTargetObserved(
            target,
            propertyObject.propertyName,
            lastValue,
            100,
            propertyObject.index
          );
        }
      } else {
        propertyObject.newPropertyValue = calcNextPropertyValue(
          propertyObject,
          [from, to],
          percentageInRelationToKey,
          animationAuxiliaryObject.easing,
          animation.round
        );

        let f: Function;

        const allowedToApplyStyle = propagateAnimationPropertyEventListener(
          propertyObject.propertyName,
          animation,
          propertyObject
        );

        if (allowedToApplyStyle) {
          switch (propertyObject.type) {
            case 'transform':
              f = animateTargetTransform;
              break;
            case 'attr':
              f = animateTargetAttributes;
              break;
            case 'direct':
              f = animateTargetDirectProps;
              break;
            default:
              f = animateTargetCSS;
              break;
          }

          f(
            propertyObject.target,
            propertyObject.propertyName,
            propertyObject.newPropertyValue,
            valuesOfThePropertiesBeforeAnimating[propertyObject.index]
          );
        }
      }
    }
  });

  return propertiesToBeAnimate;
}
