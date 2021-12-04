import {
  CSSStringRulesToObject,
  getVendorCSSProperty,
  toCSSKebabCase,
} from '../utilities-style/index';
import { customForIn, hasOwnProperty, trimString } from '../utilities/index';
import { setAttr, removeAttr, getAttr } from '../utilities/dom-attributes';
import { getCustomProperty } from '../sauce/custom-properties-for-animations';
import calcNextPropertyValue from './calc-next-property-value';
import { isEmptyObject } from '../sauce/types';
import { MAX_KEYFRAME } from '../sauce/constants';
import isDOMElement from '../utilities/is-dom-element';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';

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
  const observerFn = getCustomProperty(propertyName, 'observed');
  observerFn(value, percentageCompleted, target, index);
}

export function applyAnimationsStyleToElement(
  animateProperties: AnimationAuxiliaryObject['animateProperties'],
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const {
    valuesOfThePropertiesBeforeAnimating,
    reverseExecution,
  } = animationAuxiliaryObject;
  const progress = animationAuxiliaryObject.animation.progressValue;

  animateProperties.forEach((propertyObject) => {
    if (!valuesOfThePropertiesBeforeAnimating[propertyObject.index]) {
      valuesOfThePropertiesBeforeAnimating[propertyObject.index] = {
        style: {},
        attr: {},
        direct: {},
        transfromFns: {},
      };
    }
    const o = propertyObject;
    let from = 0;
    let to = MAX_KEYFRAME;

    if (o.keyframesKeys) {
      const l = o.keyframesKeys.length;
      for (let index = 0; index < l; index += 1) {
        const key = o.keyframesKeys[index];
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
      typeof o.lastKey === 'number' &&
      o.lastKey !== to &&
      !reverseExecution
    ) {
      const s = to;
      percentageInRelationToKey = reverseExecution ? 0 : MAX_KEYFRAME;
      to = o.lastKey;
      o.lastKey = s;
      from = to;
    } else {
      o.lastKey = to;
    }

    if (reverseExecution) {
      const ss = from;
      from = to;
      to = ss;
      percentageInRelationToKey = reverseExecution
        ? MAX_KEYFRAME - percentageInRelationToKey
        : percentageInRelationToKey;
    }

    if (o.type === 'observed') {
      const result = animationAuxiliaryObject.easing(
        (1 / 100) * percentageInRelationToKey,
        propertyObject.target,
        propertyObject.index,
        propertyObject.originalArrayLength
      );
      animateTargetObserved(
        o.target,
        o.propertyName,
        reverseExecution
          ? propertyObject.keyframes[from]
          : propertyObject.keyframes[to],
        0 + result * (100 - 0),
        propertyObject.index
      );
    } else {
      o.newPropertyValue = calcNextPropertyValue(
        propertyObject,
        [from, to],
        percentageInRelationToKey,
        animationAuxiliaryObject.easing,
        animationAuxiliaryObject.animation.round
      );

      let f: Function;

      switch (o.type) {
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
        o.target,
        o.propertyName,
        o.newPropertyValue,
        valuesOfThePropertiesBeforeAnimating[propertyObject.index]
      );
    }
  });
}

function resetHTMLElement(
  target: HTMLElement,
  beforeAnimating: AnimationAuxiliaryObject['valuesOfThePropertiesBeforeAnimating'][number]
) {
  const t = target;
  customForIn(beforeAnimating.attr, (value, name) => {
    if (value) {
      setAttr(t, name, value);
    } else {
      removeAttr(t, name);
    }
  });
  customForIn(beforeAnimating.style, (value, name) => {
    if (value) {
      t.style[name as never] = value;
    } else {
      t.style[name as never] = '';
    }
  });

  const transformFunctionsObject = transformFunctionsToObject(t);

  if (!isEmptyObject(beforeAnimating.transfromFns)) {
    const p = getVendorCSSProperty('transform') as never;
    t.style[p] = transformFunctionsObjectToString({
      ...transformFunctionsObject,
      ...beforeAnimating.transfromFns,
    });
  }
}
/**
 * Removes the style added by the animation.
 */
export function removeAnimationStyle(
  requiredAnimationProperties: Pick<
    AnimationAuxiliaryObject,
    'animationId' | 'valuesOfThePropertiesBeforeAnimating'
  > & {
    animation: Pick<AnimationInstance, 'removeChanges' | 'targets'>;
  }
): void {
  const {
    animation,
    valuesOfThePropertiesBeforeAnimating,
  } = requiredAnimationProperties;
  if (!animation.removeChanges) {
    return;
  }
  const targets = animation.targets;

  for (let index = targets.length - 1; index > -1; index -= 1) {
    const targetObject = targets[index];
    const { target } = targetObject;

    const beforeAnimating = valuesOfThePropertiesBeforeAnimating[index];
    if (isDOMElement(target)) {
      resetHTMLElement(target as HTMLElement, beforeAnimating);
    }
    customForIn(beforeAnimating.direct, (value, name) => {
      target[name as never] = value as never;
    });
  }
}
