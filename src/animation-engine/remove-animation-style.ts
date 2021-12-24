import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
import isEmptyObject from '../utilities/is-empty-object';
import getVendorCSSProperty from '../utilities-style/get-vendor-css-property';
import customForIn from '../utilities/custom-for-in';
import { removeAttr, setAttr } from '../utilities/dom-attributes';
import isDOMElement from '../utilities/is-dom-element';
import {
  applyAnimationsStyleToTargets,
  transformFunctionsObjectToString,
  transformFunctionsToObject,
} from './crud-animations-style';
import restartAnimationProperties from './restart-animation-properties';

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

function resetAnimationStyle(a: AnimationInstance): void {
  const animation = a;
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );
  if (animationAuxiliaryObject) {
    restartAnimationProperties(animationAuxiliaryObject);
    applyAnimationsStyleToTargets(
      animationAuxiliaryObject.propertiesToBeAnimate,
      animationAuxiliaryObject
    );
  }
}
/**
 * Removes the style added by the animation.
 */
export default function removeAnimationStyle(
  requiredAnimationProperties: Pick<
    AnimationAuxiliaryObject,
    'animationId' | 'valuesOfThePropertiesBeforeAnimating'
  > & {
    animation: AnimationInstance;
  }
): void {
  const {
    animation,
    valuesOfThePropertiesBeforeAnimating,
  } = requiredAnimationProperties;
  if (!animation.removeChanges) {
    return;
  }
  resetAnimationStyle(animation);
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
