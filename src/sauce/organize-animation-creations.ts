import AnimationInstanceProperties, {
  AnimationInstance,
  AnimationOptions,
} from '../contracts/animation-inter';
import FunctionForPropertyValueInKeyframe from '../contracts/function-for-property-value-in-keyframe';
import PerformerFn from '../contracts/performer-fn';
import hasOwnProperty from '../utilities/has-own-property';
import AnimationWS from './animation';
import logicToPlayAnimations from './logic-to-play-animations';
import { organizeCycleSequence } from './organize-cycle';
import parserStringStagger from './parser-string-stagger';

/* eslint-disable @typescript-eslint/no-use-before-define  */

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

const STACK_OF_ANIMATIONS_SKETCHES: {
  animationProperties: AnimationOptions;
  playAfter?:
    | {
        index: number;
        deepIndex?: number;
        array?: 'waitIterations' | 'playTogether';
      }
    | AnimationWS;
  playTogether?: AnimationOptions[];
  waitIterations?: {
    animations: AnimationOptions[];
    waitIterations: number;
  };
  performerFn: PerformerFn;
}[] = [];

function createAnimationPropertiesFromStaggers(
  animationProperties: AnimationOptions
) {
  const animationPropertiesObjects: AnimationOptions[] = [];
  if (animationProperties.targets) {
    animationProperties.targets.forEach((targetObject) => {
      const { target, index, originalArrayLength } = targetObject;
      const newAnimationProperties: AnimationOptions = {};
      let checkCreateNewObject = false;

      ['delay', 'drive', 'endDelay', 'dur', 'loop'].forEach((propertyName) => {
        let fn: string | FunctionForPropertyValueInKeyframe =
          animationProperties[propertyName as never];

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
          ...animationProperties,
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

function organizeAnimationsObjects() {
  return STACK_OF_ANIMATIONS_SKETCHES.map((obj) => {
    const o = obj;

    const fromStaggers = createAnimationPropertiesFromStaggers(
      o.animationProperties
    );
    if (fromStaggers) {
      o.animationProperties = fromStaggers.shift() as AnimationOptions;
      if (!o.playTogether) {
        o.playTogether = [];
      }
      o.playTogether = o.playTogether.concat(fromStaggers);
    }
    return o;
  }).map((o) => {
    const performerFn = o.performerFn;
    const creator = performerFn.creator as AnimationInstance['creator'];

    const animationObject = new AnimationWS(
      o.animationProperties as AnimationInstanceProperties,
      creator
    );

    const playTogether = o.playTogether
      ? o.playTogether.map(
          (i) => new AnimationWS(i as AnimationInstanceProperties, creator)
        )
      : undefined;

    const waitIterations = o.waitIterations as
      | undefined
      | {
          animations: AnimationWS[];
          waitIterations: number;
        };
    if (waitIterations) {
      waitIterations.animations = waitIterations.animations.map(
        (i) => new AnimationWS(i as AnimationInstanceProperties, creator)
      );
    }
    return {
      animationObject,
      playAfter: o.playAfter,
      playTogether,
      waitIterations,
      performerFn,
    };
  });
}
function createAnimationsFromTheStackedSketches(): void {
  const animationsObjects = organizeAnimationsObjects();

  animationsObjects.forEach((o) => {
    const {
      animationObject,
      playAfter,
      playTogether,
      waitIterations,
      performerFn,
    } = o;

    if (typeof playAfter === 'object' && !(playAfter instanceof AnimationWS)) {
      const index = playAfter.index as number;
      let instanceLink: AnimationWS;
      if (hasOwnProperty(playAfter, 'deepIndex')) {
        if (playAfter.array === 'waitIterations') {
          instanceLink = animationsObjects[index].waitIterations?.animations[
            playAfter.deepIndex as number
          ] as AnimationWS;
        } else {
          instanceLink = (animationsObjects[index]
            .playTogether as AnimationWS[])[playAfter.deepIndex as number];
        }
      } else {
        instanceLink = animationsObjects[index].animationObject;
      }

      instanceLink.on('end', function f() {
        performerFn.$hidden.independentAnimations.push(animationObject);

        organizeCycleSequence(performerFn, animationObject);
        logicToPlayAnimations(animationObject, playTogether, waitIterations);

        instanceLink.off('end', f);
      });
    } else if (playAfter instanceof AnimationWS) {
      playAfter.on('end', function f() {
        performerFn.$hidden.independentAnimations.push(animationObject);
        organizeCycleSequence(performerFn, animationObject);

        logicToPlayAnimations(animationObject, playTogether, waitIterations);
        playAfter.off('end', f);
      });
    } else {
      performerFn.$hidden.animationInstances.push(animationObject);

      performerFn.$hidden.independentAnimations.push(animationObject);

      organizeCycleSequence(performerFn, animationObject);

      logicToPlayAnimations(animationObject, playTogether, waitIterations);
    }
  });
}

function getInstanceLink(animationObject: AnimationOptions) {
  const l = STACK_OF_ANIMATIONS_SKETCHES.length;
  for (let index = 0; index < l; index += 1) {
    const sketcheObject = STACK_OF_ANIMATIONS_SKETCHES[index];
    let check = sketcheObject.playTogether
      ? sketcheObject.playTogether.indexOf(animationObject)
      : -1;
    if (sketcheObject.playTogether && check > -1) {
      return {
        index,
        deepIndex: check,
        array: 'playTogether',
      };
    }
    check = sketcheObject.waitIterations
      ? sketcheObject.waitIterations.animations.indexOf(animationObject)
      : -1;
    if (sketcheObject.waitIterations && check > -1) {
      return {
        index,
        deepIndex: check,
        array: 'waitIterations',
      };
    }
    if (sketcheObject.animationProperties === animationObject) {
      return { index };
    }
  }

  return false;
}
export function addInStackForConstruction(
  animationProperties: AnimationOptions,
  performerFn: PerformerFn,
  animationObject?:
    | AnimationOptions
    | AnimationInstanceProperties
    | AnimationWS,
  typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations',
  waitIterations?: number
): void {
  const aProperties = animationProperties;
  let instanceToLink = animationObject;
  if (performerFn.$hidden.cycleOptions) {
    (aProperties as AnimationInstanceProperties).isInCycle = true;

    if (
      instanceToLink &&
      !(instanceToLink as AnimationInstanceProperties).isInCycle
    ) {
      /**
       * Do not allow link  with out-of-cycle animations.
       */
      instanceToLink = undefined;
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
  if (instanceToLink) {
    const playAfter = (instanceToLink as AnimationWS).play
      ? (instanceToLink as AnimationWS)
      : (getInstanceLink(
          instanceToLink as AnimationOptions
        ) as typeof STACK_OF_ANIMATIONS_SKETCHES[number]['playAfter']);

    if (typeOfLink === 'afterAnimation') {
      STACK_OF_ANIMATIONS_SKETCHES.push({
        playAfter,
        animationProperties,
        performerFn,
      });
    } else if (typeOfLink === 'together' && playAfter) {
      const i = playAfter.index as number;
      if (i > -1) {
        if (!STACK_OF_ANIMATIONS_SKETCHES[i].playTogether) {
          STACK_OF_ANIMATIONS_SKETCHES[i].playTogether = [];
        }
        STACK_OF_ANIMATIONS_SKETCHES[i].playTogether?.push(animationProperties);
      }
    } else if (typeOfLink === 'afterIterations' && playAfter) {
      const i = playAfter.index as number;
      if (i > -1) {
        if (!STACK_OF_ANIMATIONS_SKETCHES[i].waitIterations) {
          STACK_OF_ANIMATIONS_SKETCHES[i].waitIterations = {
            waitIterations: waitIterations as number,
            animations: [],
          };
        }

        STACK_OF_ANIMATIONS_SKETCHES[i].waitIterations?.animations.push(
          animationProperties
        );
      }
    }
  } else {
    STACK_OF_ANIMATIONS_SKETCHES.push({
      animationProperties,
      performerFn,
    });
  }
}
