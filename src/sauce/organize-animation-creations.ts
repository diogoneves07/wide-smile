import AnimationInstanceProperties, {
  AnimationInstance,
  AnimationOptions,
} from '../contracts/animation-inter';
import FunctionForPropertyValueInKeyframe from '../contracts/function-for-property-value-in-keyframe';
import PerformerFn from '../contracts/performer-fn';
import AnimationWS from './animation';
import logicToPlayAnimations from './logic-to-play-animations';
import { organizeCycleSequence } from './organize-cycle';
import parserStringStagger from './parser-string-stagger';

/* eslint-disable @typescript-eslint/no-use-before-define  */
const STACK_OF_ANIMATIONS_SKETCHES: {
  animationOptions: AnimationOptions;
  indexOrAnimation?: number | AnimationWS;
  typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations';
  amountOfIterations?: number;
  performerFn: PerformerFn;
}[] = [];

let ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS: [
  PerformerFn,
  AnimationOptions
][] = [];

export function useAnimationObjectExpectingSideEffects(
  animationPerformer: PerformerFn,
  v?: AnimationOptions
): AnimationOptions | undefined {
  if (v) {
    ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS.unshift([animationPerformer, v]);
    return undefined;
  }
  for (
    let index = 0, l = ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS.length;
    index < l;
    index += 1
  ) {
    if (
      ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS[index][0] === animationPerformer
    ) {
      return ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS[index][1];
    }
  }
  return undefined;
}

function createAnimationPropertiesFromStaggers(
  animationOptions: AnimationOptions
) {
  const animationPropertiesObjects: AnimationOptions[] = [];
  if (animationOptions.targets) {
    animationOptions.targets.forEach((targetObject) => {
      const { target, index, originalArrayLength } = targetObject;
      const newAnimationProperties: AnimationOptions = {};
      let checkCreateNewObject = false;

      ['delay', 'drive', 'endDelay', 'dur', 'loop'].forEach((propertyName) => {
        let fn: string | FunctionForPropertyValueInKeyframe =
          animationOptions[propertyName as never];

        if (typeof fn === 'string') {
          fn = parserStringStagger(fn);
        }
        if (typeof fn === 'function') {
          newAnimationProperties[propertyName as never] = fn(
            target,
            index,
            originalArrayLength
          ) as never;
          checkCreateNewObject = true;
        }
      });

      if (checkCreateNewObject) {
        animationPropertiesObjects.push({
          ...animationOptions,
          ...newAnimationProperties,
          targets: [targetObject],
        });
      }
    });
  }
  if (!animationPropertiesObjects[0]) {
    return false;
  }

  return animationPropertiesObjects;
}

/**
 * Executes the methods and forwards the animations to the construct.
 */
export const runCallbacksAtTheRightTime = (() => {
  const callbacks: Function[] = [];
  let alreadyInProcess = false;
  return (callbackfn: Function) => {
    callbacks.push(callbackfn);
    if (!alreadyInProcess) {
      const setTimeoutId = setTimeout(() => {
        clearTimeout(setTimeoutId);

        if (STACK_OF_ANIMATIONS_SKETCHES[0]) {
          createAnimationsFromTheStackedSketches();
        }

        callbacks.forEach((c) => {
          c();
        });
        callbacks.length = 0;
        alreadyInProcess = false;
      }, 0);
      alreadyInProcess = true;
    }
  };
})();

type OrganizedAnimations = {
  typeOfLink: typeof STACK_OF_ANIMATIONS_SKETCHES[number]['typeOfLink'];
  linkedAnimation: AnimationWS | undefined;
  animation: AnimationWS;
  playTogether?: AnimationWS[];
  afterIterations?: {
    animations: AnimationWS[];
    amountOfIterations: number;
  };
}[];

function addToLinkedAnimationObject(
  organizedAnimations: OrganizedAnimations,
  animation: AnimationWS,
  linkedAnimation: AnimationWS,
  typeOfLink: typeof STACK_OF_ANIMATIONS_SKETCHES[number]['typeOfLink'],
  amountOfIterations?: number
) {
  const l = organizedAnimations.length;
  for (let index = 0; index < l; index += 1) {
    const o = organizedAnimations[index];
    const a =
      typeOfLink === 'afterIterations' && o.afterIterations
        ? o.afterIterations.animations
        : o.playTogether;

    if (linkedAnimation === o.animation) {
      if (a) {
        a.push(animation);
      } else if (typeOfLink === 'afterIterations') {
        if (!o.afterIterations) {
          o.afterIterations = {
            animations: [animation],
            amountOfIterations: amountOfIterations as number,
          };
        }
      } else if (typeOfLink === 'together') {
        if (!o.playTogether) {
          o.playTogether = [animation];
        }
      }
      return true;
    }
    if (a) {
      const i = a.indexOf(linkedAnimation);

      if (i > -1) {
        a.splice(i, 0, animation);
        return true;
      }
    }
  }

  return false;
}

function organizeAnimationsObjects() {
  STACK_OF_ANIMATIONS_SKETCHES.slice().forEach((obj, index) => {
    const o = obj;
    const fromStaggers = createAnimationPropertiesFromStaggers(
      o.animationOptions
    );
    if (fromStaggers) {
      fromStaggers.forEach((a, i) => {
        if (i === 0) {
          o.animationOptions = a;
          STACK_OF_ANIMATIONS_SKETCHES[index] = o;
        } else {
          STACK_OF_ANIMATIONS_SKETCHES.push({
            indexOrAnimation: index,
            typeOfLink: 'together',
            animationOptions: a,
            performerFn: o.performerFn,
          });
        }
      });
    }
  });
  const organizedAnimations: OrganizedAnimations = [];

  STACK_OF_ANIMATIONS_SKETCHES.map((o) => {
    const performerFn = o.performerFn;
    const creator = performerFn.creator as AnimationInstance['creator'];

    return {
      ...o,
      animation: new AnimationWS(
        o.animationOptions as AnimationInstanceProperties,
        creator
      ),
    } as Omit<typeof o, 'animationOptions'> & {
      animation: AnimationWS;
    };
  }).forEach((o, _index, array) => {
    const linkedAnimation =
      typeof o.indexOrAnimation === 'number'
        ? array[o.indexOrAnimation].animation
        : o.indexOrAnimation;

    if (
      !linkedAnimation ||
      o.typeOfLink === 'afterAnimation' ||
      (linkedAnimation &&
        !addToLinkedAnimationObject(
          organizedAnimations,
          o.animation,
          linkedAnimation,
          o.typeOfLink,
          o.amountOfIterations
        ))
    ) {
      organizedAnimations.push({
        typeOfLink: o.typeOfLink,
        linkedAnimation,
        animation: o.animation,
      });
    }
  });
  return organizedAnimations;
}
function createAnimationsFromTheStackedSketches(): void {
  organizeAnimationsObjects().forEach((o) => {
    const {
      animation,
      linkedAnimation,
      typeOfLink,

      playTogether,
      afterIterations,
    } = o;
    const performerFn = animation.performer;
    if (typeOfLink === 'afterAnimation' && linkedAnimation) {
      linkedAnimation.on('end', function f() {
        organizeCycleSequence(performerFn, animation);
        logicToPlayAnimations(animation, playTogether, afterIterations);

        linkedAnimation.off('end', f);
      });
    } else {
      performerFn.$hidden.animationInstances.push(animation);

      performerFn.$hidden.independentAnimations.push(animation);

      organizeCycleSequence(performerFn, animation);

      logicToPlayAnimations(animation, playTogether, afterIterations);
    }
  });
}

export function addInStackForConstruction(
  animationOptions: AnimationOptions,
  performerFn: PerformerFn,
  linkedAnimation?:
    | AnimationOptions
    | AnimationInstanceProperties
    | AnimationWS,
  typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations',
  amountOfIterations?: number
): void {
  const aOptions = animationOptions;
  let lAnimation = linkedAnimation;
  if (performerFn.$hidden.cycleOptions) {
    (aOptions as AnimationInstanceProperties).isInCycle = true;

    if (lAnimation && !(lAnimation as AnimationInstanceProperties).isInCycle) {
      /**
       * Do not allow link  with out-of-cycle animations.
       */
      lAnimation = undefined;
    }
  }
  if (!STACK_OF_ANIMATIONS_SKETCHES[0]) {
    /**
     * Wait for the stacking to complete.
     */
    runCallbacksAtTheRightTime(() => {
      STACK_OF_ANIMATIONS_SKETCHES.length = 0;
      ANIMATION_OBJECT_EXPECTING_SIDE_EFFECTS = [];
    });
  }
  if (lAnimation) {
    const indexOrAnimation = (lAnimation as AnimationWS).play
      ? (lAnimation as AnimationWS)
      : (() => {
          const l = STACK_OF_ANIMATIONS_SKETCHES.length;
          for (let index = 0; index < l; index += 1) {
            if (
              STACK_OF_ANIMATIONS_SKETCHES[index].animationOptions ===
              lAnimation
            ) {
              return index;
            }
          }
          return null;
        })();

    if (indexOrAnimation !== null) {
      STACK_OF_ANIMATIONS_SKETCHES.push({
        indexOrAnimation,
        typeOfLink,
        amountOfIterations,
        animationOptions,
        performerFn,
      });
    } else {
      STACK_OF_ANIMATIONS_SKETCHES.push({
        animationOptions,
        performerFn,
      });
    }
  } else {
    STACK_OF_ANIMATIONS_SKETCHES.push({
      animationOptions,
      performerFn,
    });
  }
}
