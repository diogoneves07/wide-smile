import AnimationInstanceProperties, {
  AnimationInstance,
} from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import AnimationWS from './animation';
import {
  playAnimationsTogether,
  playAnimationsAfterIterations,
} from './logic-to-play-animations';
import organizeTheExecutionOfCycleAnimations from '../animation-engine/organize-the-execution-of-cycle-animations';
import createAnimationObjectsFromStaggers from './create-animation-objects-from-staggers';
import { resetArrayOfLastAddedAnimationObjects } from './last-added-animation-object';
import { ANIMATION_STATES } from './constants';
import customForIn from '../utilities/custom-for-in';
import isEmptyObject from '../utilities/is-empty-object';

/* eslint-disable @typescript-eslint/no-use-before-define  */

type AnimationObjectSketche = {
  animationOptions: AnimationInstanceProperties;

  /**
   * It can be used in case there is stagger.
   */
  originalAnimationOptions?: AnimationInstanceProperties;

  indexOrAnimation?: number | AnimationWS;
  typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations';
  amountOfIterations?: number;
};

let STACK_OF_ANIMATIONS_SKETCHES: Record<
  string,
  {
    sketches: AnimationObjectSketche[];
    callbacksCalledDuringStructuring?: Function[];
    performerFn: PerformerFn;
  }
> = {};

const CALLBACKS_CALLED_DURING_STRUCTURING: Function[] = [];

function pushSketcheInPerformerBucket(
  performer: PerformerFn,
  sketche: AnimationObjectSketche
) {
  const performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];
  if (performerBucket) {
    performerBucket.sketches.push(sketche);
  } else {
    STACK_OF_ANIMATIONS_SKETCHES[performer.id] = {
      sketches: [sketche],
      performerFn: performer,
    };
  }
}

export function buildAnimationsForSpecificPerformer(
  performer: PerformerFn,
  setProperties?: AnimationInstanceProperties
): void {
  let organizedAnimationInstances: ReturnType<
    typeof organizeAnimationInstances
  > = [];

  const performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  delete STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  if (performerBucket) {
    if (setProperties) {
      performerBucket.sketches.forEach((sketche) => {
        Object.assign(sketche.animationOptions, setProperties);
      });
    }

    organizedAnimationInstances = organizedAnimationInstances.concat(
      organizeAnimationInstances(
        createAnimationInstances(performer, performerBucket.sketches)
      )
    );
    if (performerBucket.callbacksCalledDuringStructuring) {
      performerBucket.callbacksCalledDuringStructuring.forEach((fn) => {
        fn();
      });
    }
  }
  CALLBACKS_CALLED_DURING_STRUCTURING.forEach((a) => {
    a();
  });
  if (organizedAnimationInstances) {
    applyRulesForTheExecutionOfAnimations(organizedAnimationInstances);
  }
}

export function getCurrentAnimationSketches(
  performer: PerformerFn
): AnimationInstanceProperties[] | undefined {
  const performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];
  if (performerBucket) {
    return performerBucket.sketches.map((o) => o.animationOptions);
  }
  return undefined;
}

type OrganizedAnimations = {
  typeOfLink: 'afterAnimation' | 'together' | 'afterIterations';
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
  linkedAnimation: AnimationWS
) {
  const l = organizedAnimations.length;
  for (let index = 0; index < l; index += 1) {
    const o = organizedAnimations[index];

    if (linkedAnimation === o.animation) {
      if (o.playTogether) {
        o.playTogether.push(animation);
      } else {
        o.playTogether = [animation];
      }

      return true;
    }
    let i = -1;
    const a = o.playTogether;
    if (a) {
      i = a.indexOf(linkedAnimation);
    }

    if (i > -1 && a) {
      a.splice(i, 0, animation);
      return true;
    }
  }

  return false;
}

function organizeAnimationInstances(
  animationInstances: ReturnType<typeof createAnimationInstances>
) {
  const organizedAnimations: OrganizedAnimations = [];

  animationInstances.forEach((o, _index, array) => {
    const linkedAnimation =
      typeof o.indexOrAnimation === 'number'
        ? array[o.indexOrAnimation].animation
        : o.indexOrAnimation;

    if (
      !linkedAnimation ||
      o.typeOfLink === 'afterAnimation' ||
      o.typeOfLink === 'afterIterations' ||
      (linkedAnimation &&
        !addToLinkedAnimationObject(
          organizedAnimations,
          o.animation,
          linkedAnimation
        ))
    ) {
      if (o.typeOfLink === 'afterIterations') {
        organizedAnimations.push({
          typeOfLink: o.typeOfLink,
          linkedAnimation,
          animation: o.animation,
          afterIterations: {
            animations: [o.animation],
            amountOfIterations: o.amountOfIterations as number,
          },
        });
      } else {
        organizedAnimations.push({
          typeOfLink: o.typeOfLink as Exclude<typeof o.typeOfLink, undefined>,
          linkedAnimation,
          animation: o.animation,
        });
      }
    }
  });

  return organizedAnimations;
}
function applyRulesForTheExecutionOfAnimations(
  organizedAnimationInstances: ReturnType<typeof organizeAnimationInstances>
): void {
  organizedAnimationInstances.forEach((o) => {
    const {
      animation,
      linkedAnimation,
      typeOfLink,
      playTogether,
      afterIterations,
    } = o;

    const performerFn = animation.performer;
    if (typeOfLink === 'afterIterations' && linkedAnimation) {
      if (playTogether && afterIterations) {
        afterIterations.animations = afterIterations.animations.concat(
          playTogether
        );
      }
      playAnimationsAfterIterations(linkedAnimation, afterIterations);
    } else if (typeOfLink === 'afterAnimation' && linkedAnimation) {
      linkedAnimation.on('end', function f() {
        organizeTheExecutionOfCycleAnimations(performerFn, animation);

        if (playTogether) {
          playAnimationsTogether(animation, playTogether);
        } else if (animation.autoPlay) {
          animation.play();
        }

        linkedAnimation.off('end', f);
      });
    } else {
      performerFn.$hidden.independentAnimations.push(animation);
      organizeTheExecutionOfCycleAnimations(performerFn, animation);

      if (playTogether) {
        playAnimationsTogether(animation, playTogether);
      }
    }
    if (
      !linkedAnimation &&
      (!playTogether || !playTogether[0]) &&
      (!afterIterations || !afterIterations.animations[0])
    ) {
      if (animation.autoPlay && animation.state === ANIMATION_STATES[0]) {
        animation.play();
      }
    }
  });
}

function createAnimationInstances(
  performer: PerformerFn,
  sketches: AnimationObjectSketche[]
) {
  const s = sketches;
  s.slice().forEach((obj, index) => {
    const o = obj;
    const fromStaggers = createAnimationObjectsFromStaggers(o.animationOptions);
    if (fromStaggers) {
      fromStaggers.forEach((newAnimationOptions, i) => {
        const a = newAnimationOptions;
        if (i === 0) {
          o.animationOptions = a;
          s[index] = o;
        } else {
          s.push({
            indexOrAnimation: index,
            typeOfLink: 'together',
            animationOptions: a,
            originalAnimationOptions: o.animationOptions,
          });
        }
      });
    }
  });

  const animationInstances = s.map((o) => {
    const creator = performer.creator as AnimationInstance['creator'];
    const animation = new AnimationWS(
      o.animationOptions as AnimationInstanceProperties,
      creator
    );

    animation.originalAnimationOptions = o.originalAnimationOptions
      ? o.originalAnimationOptions
      : o.animationOptions;

    performer.$hidden.animationInstances.push(animation);

    return {
      ...o,
      animation,
    } as Omit<typeof o, 'animationOptions'> & {
      animation: AnimationWS;
    };
  });
  return animationInstances;
}

function buildAnimations() {
  let organizedAnimationInstances: ReturnType<
    typeof organizeAnimationInstances
  > = [];

  if (!isEmptyObject(STACK_OF_ANIMATIONS_SKETCHES)) {
    customForIn(STACK_OF_ANIMATIONS_SKETCHES, (bucket) => {
      organizedAnimationInstances = organizedAnimationInstances.concat(
        organizeAnimationInstances(
          createAnimationInstances(bucket.performerFn, bucket.sketches)
        )
      );
      if (bucket.callbacksCalledDuringStructuring) {
        bucket.callbacksCalledDuringStructuring.forEach((fn) => {
          fn();
        });
      }
    });
  }

  return organizedAnimationInstances;
}
export const runCallbacksAfterBuildingAnimations = (() => {
  let alreadyInProcess = false;
  return (callbackfn: Function, performer?: PerformerFn) => {
    if (!performer) {
      CALLBACKS_CALLED_DURING_STRUCTURING.push(callbackfn);
    } else {
      const performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];
      if (performerBucket) {
        if (!performerBucket.callbacksCalledDuringStructuring) {
          performerBucket.callbacksCalledDuringStructuring = [];
        }
        performerBucket.callbacksCalledDuringStructuring.push(callbackfn);
      }
    }

    if (!alreadyInProcess) {
      const setTimeoutId = setTimeout(() => {
        const organizedAnimationInstances = buildAnimations();

        CALLBACKS_CALLED_DURING_STRUCTURING.forEach((a) => {
          a();
        });

        if (organizedAnimationInstances) {
          applyRulesForTheExecutionOfAnimations(organizedAnimationInstances);
        }

        CALLBACKS_CALLED_DURING_STRUCTURING.length = 0;
        alreadyInProcess = false;
        clearTimeout(setTimeoutId);
      }, 0);

      alreadyInProcess = true;
    }
  };
})();

function fireTimeout() {
  if (isEmptyObject(STACK_OF_ANIMATIONS_SKETCHES)) {
    runCallbacksAfterBuildingAnimations(() => {
      STACK_OF_ANIMATIONS_SKETCHES = {};
      resetArrayOfLastAddedAnimationObjects();
    });
  }
}
function getlinkedAnimationIndex(
  performer: PerformerFn,

  linkedAnimation:
    | AnimationInstanceProperties
    | AnimationInstanceProperties
    | AnimationWS
) {
  const performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];
  if (performerBucket) {
    return performerBucket.sketches.findIndex(
      (o) => o.animationOptions === linkedAnimation
    );
  }
  return undefined;
}
export function addAnimationObjectToTheConstructionStack(
  performerFn: PerformerFn,
  animationOptions: AnimationInstanceProperties,
  linkedAnimation?:
    | AnimationInstanceProperties
    | AnimationInstanceProperties
    | AnimationWS,
  typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations',
  amountOfIterations?: number
): void {
  if (performerFn.$hidden.ignorePerformer) {
    performerFn.$hidden.animationInstances.push(
      new AnimationWS(animationOptions, performerFn.creator)
    );
    return;
  }
  fireTimeout();

  const aOptions = animationOptions;
  let lAnimation = linkedAnimation;
  if (performerFn.$hidden.cycleOptions) {
    aOptions.isInCycle = true;

    if (lAnimation && !lAnimation.isInCycle) {
      /**
       * Do not allow link  with out-of-cycle animations.
       */
      lAnimation = undefined;
    }
  }

  if (lAnimation) {
    const indexOrAnimation = (lAnimation as AnimationWS).play
      ? (lAnimation as AnimationWS)
      : getlinkedAnimationIndex(performerFn, lAnimation);

    if (indexOrAnimation !== null) {
      pushSketcheInPerformerBucket(performerFn, {
        indexOrAnimation,
        typeOfLink,
        amountOfIterations,
        animationOptions,
      });
      return;
    }
  }
  pushSketcheInPerformerBucket(performerFn, {
    animationOptions,
  });
}
