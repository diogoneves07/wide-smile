import customForIn from '../utilities/custom-for-in';
import { addAnimationObjectToTheConstructionStack } from './organize-animation-creations';
import WideSmileDebug from './wide-smile-debug';
import AllAnimableProperties from '../contracts/animable-properties';
import createAnimationPropertiesObject from './create-animation-properties-object';
import PerformerFn, {
  OverloadsForAnimationCreation,
} from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import Keyframes from '../contracts/key-frames';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import { AnimationOptions } from '../contracts/animation-inter';
import {
  addLastAnimationObjectAddedToPerformer,
  getLastAnimationObjectAddedToPerformer,
} from './last-added-animation-object';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const createIndependentAnimations: OverloadsForAnimationCreation = function a(
  this: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | string
    | ValuesToAnimateProperty[],
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
): PerformerFn {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const animationProperties = createAnimationPropertiesObject(
    this,
    animate as never,
    parametersToAnimateOrPropertyValue as never,
    parametersToAnimate as never
  );

  addLastAnimationObjectAddedToPerformer(this, animationProperties);
  addAnimationObjectToTheConstructionStack(this, animationProperties);

  return this;
};

export const createDependentAnimations: OverloadsForAnimationCreation = function a(
  this: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | string
    | ValuesToAnimateProperty[],
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
): PerformerFn {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const animationProperties = createAnimationPropertiesObject(
    this,
    animate as never,
    parametersToAnimateOrPropertyValue as never,
    parametersToAnimate as never
  );

  const lastAnimationObjectAdded = getLastAnimationObjectAddedToPerformer(this);

  addLastAnimationObjectAddedToPerformer(this, animationProperties);
  if (lastAnimationObjectAdded) {
    addAnimationObjectToTheConstructionStack(
      this,
      animationProperties,

      lastAnimationObjectAdded,
      'afterAnimation'
    );
  } else {
    const lastAnimationCreated = this.$hidden.animationInstances[
      this.$hidden.animationInstances.length - 1
    ];
    if (lastAnimationCreated) {
      addAnimationObjectToTheConstructionStack(
        this,
        animationProperties,

        lastAnimationCreated,
        'afterAnimation'
      );
    } else {
      addAnimationObjectToTheConstructionStack(this, animationProperties);
    }
  }

  return this;
};

export function addFinalKeyframeInTheAnimation(
  this: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | ValuesToAnimateProperty[]
    | ValuesToAnimateProperty,
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimateOrDurOrAutoDestroy?:
    | AnimationOptions
    | AnimationOptions['dur']
    | true
) {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const objectExpectingSideEffects = getLastAnimationObjectAddedToPerformer(
    this
  );
  if (objectExpectingSideEffects) {
    const lastAnimationObjectAdded = objectExpectingSideEffects;
    let initialKeyframe: PropertiesToAnimateObject | false = false;

    let animateProps = animate;

    if (
      typeof animate !== 'object' &&
      parametersToAnimateOrPropertyValue === undefined
    ) {
      animateProps = [animateProps] as ValuesToAnimateProperty[];
    }
    if (Array.isArray(animateProps)) {
      initialKeyframe = {};
      let count = 0;
      customForIn(
        lastAnimationObjectAdded.keyframes as PropertiesToAnimateObject,
        (_propertyValue, propertyName) => {
          const array = animateProps as ValuesToAnimateProperty[];
          const v = array[count];

          (initialKeyframe as PropertiesToAnimateObject)[propertyName] = v;
          if (typeof array[count + 1] !== 'undefined') {
            count += 1;
          }
        }
      );
    }
    const animationProperties = createAnimationPropertiesObject(
      this,
      (initialKeyframe || animateProps) as PropertiesToAnimateObject,
      parametersToAnimateOrPropertyValue,
      parametersToAnimateOrDurOrAutoDestroy
    );

    customForIn(animationProperties, (propertyValue, propertyName) => {
      const v = propertyValue as never;
      if (propertyName === 'keyframes') {
        lastAnimationObjectAdded.keyframes = [
          lastAnimationObjectAdded.keyframes as PropertiesToAnimateObject,
          v,
        ];
      } else {
        lastAnimationObjectAdded[propertyName as never] = v;
      }
    });
  } else {
    WideSmileDebug(
      'Call at an improper moment.',
      'To use the "to" method you should call it right after the animation call to which it will be applied.'
    );
  }
  return this;
}
