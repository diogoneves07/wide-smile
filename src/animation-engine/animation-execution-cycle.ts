import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { MAX_KEYFRAME, ANIMATION_STATES } from '../sauce/constants';
import { applyAnimationsStyleToElement } from './crud-animations-style';

import { customForIn, getTimeNow, toMs } from '../utilities/index';
import { releasesGarbageFromAnimations } from '../sauce/manage-memory-collections';
import {
  addMountedStackObserver,
  getAnimationInTheStack,
  addAnimationToStack,
} from './mount-animations-stack';
import {
  propagateAnimationEventListener,
  LISTENERS_NAMES,
} from '../animation-listeners/animations-listeners-handlers';

import { recyclePropertyObjectToAnimate } from '../animation-mount/get-property-object-to-animate';
import setAnimationProgress from './set-animation-progress';
import { AnimationInstance } from '../contracts/animation-inter';

/* 
  eslint-disable @typescript-eslint/no-use-before-define 
*/

const manageAnimationDelay = (() => {
  let ANIMATIONS_DELAY: {
    animationAuxiliaryObject: AnimationAuxiliaryObject;
    delay: number;
    startTime: number;
    callback: (a: AnimationAuxiliaryObject) => void;
  }[] = [];
  let timeoutId: number | NodeJS.Timeout | undefined;
  function t() {
    timeoutId = setInterval(() => {
      if (ANIMATIONS_DELAY.length === 0) {
        clearInterval(timeoutId as number);
        timeoutId = undefined;
        return;
      }
      ANIMATIONS_DELAY = ANIMATIONS_DELAY.filter((values) => {
        const v = values;
        const c = getTimeNow() - v.startTime;
        const state = v.animationAuxiliaryObject.animation.state;
        if (state === ANIMATION_STATES[1]) {
          if (c >= v.delay) {
            v.animationAuxiliaryObject.remainingDelayAnimation = v.delay - c;
            resetIterationRelatedProperties(v.animationAuxiliaryObject);
            v.animationAuxiliaryObject.remainingDelayAnimation = 0;

            v.callback(v.animationAuxiliaryObject);
            return false;
          }
        }

        if (state === ANIMATION_STATES[7] || state === ANIMATION_STATES[4]) {
          return false;
        }

        return true;
      });
    }, 0);
  }

  return (
    animationAuxiliaryObject: AnimationAuxiliaryObject,
    delay: number,
    startTime: number,
    callback: (a: AnimationAuxiliaryObject) => void
  ) => {
    ANIMATIONS_DELAY.push({
      animationAuxiliaryObject,
      delay,
      startTime,
      callback,
    });
    if (!timeoutId) {
      t();
    }
  };
})();

/**
 * Delegates the animation to be executed.
 */
function insertAnimationInTheQueue(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  jumpTimeout = false,
  animationLoadingTime = 0
) {
  const a = animationAuxiliaryObject;
  const { animation, remainingDelayAnimation } = a;

  if (!a.animationAlreadyStarted) {
    propagateAnimationEventListener(LISTENERS_NAMES[8], animation);
  }

  const delay = Math.max(toMs(animation.delay) - animationLoadingTime, 0);

  if ((delay > 0 || remainingDelayAnimation) && !jumpTimeout) {
    manageAnimationDelay(
      a,
      remainingDelayAnimation || delay,
      getTimeNow(),
      () => {
        addAnimationToStack(a);
        propagateAnimationEventListener(LISTENERS_NAMES[10], animation);
      }
    );
  } else {
    resetIterationRelatedProperties(a);

    a.remainingDelayAnimation = 0;

    addAnimationToStack(a);
    propagateAnimationEventListener(LISTENERS_NAMES[10], animation);
  }
}

/**
 * Deal with the processing of a new animation intercalation.
 */
function newIntercalation(
  requiredAnimationProperties: Pick<
    AnimationAuxiliaryObject,
    | 'iterationInterlacations'
    | 'startTimeOfTheIteration'
    | 'reverseExecution'
    | 'timeRunningIteration'
  > & {
    animation: Pick<
      AnimationInstance,
      'dur' | 'delay' | 'progressValue' | 'max'
    >;
  }
): {
  toAuxiliaryObject: Pick<
    AnimationAuxiliaryObject,
    | 'iterationInterlacations'
    | 'startTimeOfTheIteration'
    | 'reverseExecution'
    | 'timeRunningIteration'
  >;
  progress: number;
} {
  const animationAuxiliaryObject = requiredAnimationProperties;
  const { animation, iterationInterlacations } = animationAuxiliaryObject;
  const maxProgress = animation.max;
  let progress = animation.progressValue;

  let {
    startTimeOfTheIteration,
    reverseExecution,
    timeRunningIteration,
  } = animationAuxiliaryObject;

  const duration = toMs(animation.dur);

  if (duration <= 0) {
    return {
      toAuxiliaryObject: {
        iterationInterlacations,
        startTimeOfTheIteration,
        reverseExecution,
        timeRunningIteration,
      },
      progress: maxProgress,
    };
  }

  const currentTime = getTimeNow();

  /**
   * Checks how the animation's progress should behave.
   */
  reverseExecution = progress > maxProgress;

  let durationOfTheInterlacation: number;

  if (startTimeOfTheIteration > 0) {
    durationOfTheInterlacation =
      currentTime - startTimeOfTheIteration - timeRunningIteration;
  } else {
    durationOfTheInterlacation = 0;
  }

  durationOfTheInterlacation += iterationInterlacations.leftovers;

  iterationInterlacations.timeConsumed += durationOfTheInterlacation;

  const averageDurationForIntercalation =
    iterationInterlacations.completed > 0
      ? iterationInterlacations.timeConsumed / iterationInterlacations.completed
      : 0;

  iterationInterlacations.leftovers = Math.max(
    0,
    durationOfTheInterlacation - averageDurationForIntercalation
  );

  iterationInterlacations.completed += 1;

  const timeBasedProgress =
    (MAX_KEYFRAME / duration) * averageDurationForIntercalation;

  let newProgress: number;

  if (reverseExecution) {
    newProgress = progress - timeBasedProgress;
    newProgress = newProgress < 0 ? 0 : newProgress;
    newProgress = newProgress < maxProgress ? maxProgress : newProgress;
  } else {
    newProgress = progress + timeBasedProgress;
    newProgress = newProgress > MAX_KEYFRAME ? MAX_KEYFRAME : newProgress;
    newProgress = newProgress > maxProgress ? maxProgress : newProgress;
  }

  progress = newProgress;
  timeRunningIteration = (duration / MAX_KEYFRAME) * progress;

  startTimeOfTheIteration = currentTime - timeRunningIteration;

  return {
    toAuxiliaryObject: {
      iterationInterlacations,
      startTimeOfTheIteration,
      reverseExecution,
      timeRunningIteration,
    },
    progress,
  };
}

export function resetIterationRelatedProperties(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  const a = animationAuxiliaryObject;

  a.iterationInterlacations = {
    timeConsumed: 0,
    completed: 0,
    leftovers: 0,
  };
  a.startTimeOfTheIteration = 0;
  a.timeRunningIteration = 0;
  return a;
}

/**
 * Deals with the completion of an animation's iteration.
 */ function iterationCompleted(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const a = animationAuxiliaryObject;
  const { animation } = a;
  let { backRunning } = a;
  let maxProgress = animation.max;

  const amountOfIterations = animation.loop;
  let iterationsCompleted = animation.count;

  let backRunningStopped = -1;

  a.animateProperties.forEach((obj) => {
    const o = obj;
    o.lastKey = undefined;
  });

  /**
   * Checks that the completion of the interaction was not an animation return action(methods: `go` and `back`).
   */
  if (!backRunning) {
    iterationsCompleted += 1;
  }
  animation.count = iterationsCompleted;

  if (
    amountOfIterations > iterationsCompleted ||
    amountOfIterations === Infinity ||
    amountOfIterations === true
  ) {
    if (backRunning) {
      backRunningStopped = animation.progressValue;
      backRunning = false;
      propagateAnimationEventListener(LISTENERS_NAMES[7], animation);
    }

    const animationProgressObject = setAnimationProgress(a);

    a.countDriveloop = animationProgressObject.countDriveloop;
    a.lastStartProgress = animationProgressObject.progress;

    maxProgress = animationProgressObject.maxProgress;

    propagateAnimationEventListener(LISTENERS_NAMES[7], animation);
    propagateAnimationEventListener(LISTENERS_NAMES[1], animation);

    resetIterationRelatedProperties(a);

    a.backRunning = backRunning;

    animation.max = maxProgress;
    animation.progressValue = animationProgressObject.progress;

    if (backRunningStopped > -1) {
      /**
       * Maintain the value of the last progress.
       */
      animation.progressValue = backRunningStopped;

      performNewAnimationIntercalation(a);
    } else {
      const newIntercalationObject = newIntercalation(a);

      Object.assign(a, newIntercalationObject.toAuxiliaryObject);
      animation.progressValue = newIntercalationObject.progress;

      insertAnimationInTheQueue(a);
    }
  } else {
    propagateAnimationEventListener(LISTENERS_NAMES[1], animation);
    completedAnimation(a);
  }
}
/**
 * Checks whether the animation iteration has been completed or there should be more intercalations.
 */
function conclusionOfTheIntercalation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  releasesGarbageFromAnimations();

  const aAuxiliaryObject = animationAuxiliaryObject;
  const { animation } = aAuxiliaryObject;

  if (animation.state === ANIMATION_STATES[1]) {
    const { reverseExecution } = aAuxiliaryObject;
    const maxProgress = animation.max;
    const progress = animation.progressValue;
    if (
      (reverseExecution && progress < maxProgress) ||
      (!reverseExecution && progress > maxProgress) ||
      progress === maxProgress
    ) {
      animation.progressValue = maxProgress;

      const endDelay = Math.max(toMs(animation.endDelay));

      if (endDelay > 0) {
        manageAnimationDelay(
          aAuxiliaryObject,
          endDelay,
          getTimeNow(),
          iterationCompleted
        );
      } else {
        iterationCompleted(aAuxiliaryObject);
      }
    } else {
      performNewAnimationIntercalation(aAuxiliaryObject);
    }
  }
}

/**
 * Calls the functions that traverse the stack and applies the style to the elements, restarts the values of the mount stack, removes the items from the stack, and forwards the animation objects to be audited.
 */
function performIntercalationOfTheAnimations(
  animationsStack: Record<string, AnimationAuxiliaryObject>
): void {
  customForIn(
    animationsStack,
    (animationAuxiliaryObject: AnimationAuxiliaryObject) => {
      const aAuxiliaryObject = animationAuxiliaryObject;

      const { animation, animateProperties } = aAuxiliaryObject;
      let { animationAlreadyStarted } = aAuxiliaryObject;

      if (animation.state === ANIMATION_STATES[1]) {
        applyAnimationsStyleToElement(animateProperties, aAuxiliaryObject);

        if (!animationAlreadyStarted) {
          propagateAnimationEventListener(LISTENERS_NAMES[0], animation);
          animationAlreadyStarted = true;
          aAuxiliaryObject.animationAlreadyStarted = true;
        }

        propagateAnimationEventListener(LISTENERS_NAMES[9], animation);
        if (typeof animation.progress === 'function') {
          animation.progress(animation.progressValue);
        }
      }
    }
  );

  customForIn(
    animationsStack,
    (animationAuxiliaryObject: AnimationAuxiliaryObject) => {
      conclusionOfTheIntercalation(animationAuxiliaryObject);
    }
  );
}

addMountedStackObserver(
  performIntercalationOfTheAnimations,
  'performIntercalation'
);

export function performNewAnimationIntercalation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const aAuxiliaryObject = animationAuxiliaryObject;
  if (aAuxiliaryObject.remainingDelayAnimation > 0) {
    insertAnimationInTheQueue(aAuxiliaryObject);
    return;
  }
  const newIntercalationObject = newIntercalation(aAuxiliaryObject);

  Object.assign(aAuxiliaryObject, newIntercalationObject.toAuxiliaryObject);

  aAuxiliaryObject.animation.progressValue = newIntercalationObject.progress;

  addAnimationToStack(aAuxiliaryObject);
}

function completedAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const aAuxiliaryObject = animationAuxiliaryObject;
  const { animation } = animationAuxiliaryObject;
  /**
   * Check before propagating events.
   */
  if (animation.autoDestroy) {
    recyclePropertyObjectToAnimate(aAuxiliaryObject.animateProperties);
  }
  animation.state = ANIMATION_STATES[2];
  propagateAnimationEventListener(LISTENERS_NAMES[7], animation);
  propagateAnimationEventListener(LISTENERS_NAMES[2], animation);
  if (animation.isInCycle) {
    propagateAnimationEventListener(LISTENERS_NAMES[11], animation);
  }
}

export default function startAnimationExecutionCycle(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  jumpTimeout = false
): void {
  const a = animationAuxiliaryObject;
  if (getAnimationInTheStack(a.animationId)) {
    return;
  }
  /**
   * Gets the time that the animation took to complete the load.
   */
  const { animationLoadingTime } = a;
  const newIntercalationObject = newIntercalation(a);
  Object.assign(a, newIntercalationObject.toAuxiliaryObject);

  a.animationLoadingTime = 0;

  a.animation.state = ANIMATION_STATES[1];
  a.animation.progressValue = newIntercalationObject.progress;

  insertAnimationInTheQueue(a, jumpTimeout, animationLoadingTime);
}
