import { ANIMATION_STATES } from '../sauce/constants';
import setAnimationProgress from '../animation-engine/set-animation-progress';
import {
  addAnimationAuxiliaryObject,
  getAnimationAuxiliaryObject,
} from './crud-animation-objects';
import CreateAnimationAuxiliaryObject from './create-animation-auxiliary-object';
import {
  customForIn,
  getTimeNow,
  ordernateByGrowingValues,
} from '../utilities/index';
import {
  propagateAnimationEventListener,
  LISTENERS_NAMES,
} from '../animation-listeners/animations-listeners-handlers';
import startAnimationExecutionCycle from '../animation-engine/animation-execution-cycle';
import loadPropertiesToAnimate from './load-properties-to-animate';
import flattenKeyframes from './flatten-keyframes';
import { AnimationInstance } from '../contracts/animation-inter';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';

function forwardAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  animationArrivalTime: number,
  callbackLoaded: (animationAuxiliaryObjects: AnimationAuxiliaryObject) => void
) {
  const aAuxiliaryObject = animationAuxiliaryObject;
  const { animationInstance } = aAuxiliaryObject;
  const startAnimationLoadingTime = getTimeNow();

  const keyframes = flattenKeyframes(
    animationInstance.keyframes,
    animationInstance.performer.$hidden.propertiesUsed
  );

  const keyframesKeys = (() => {
    const keys: string[] = [];
    customForIn(keyframes, (propertyKeyframes) => {
      customForIn(propertyKeyframes, (_v, key) => {
        if (keys.indexOf(key) === -1) {
          keys.push(key);
        }
      });
    });

    return ordernateByGrowingValues(keys);
  })();

  aAuxiliaryObject.keyframesKeys = keyframesKeys;

  const animationProgressObject = setAnimationProgress(aAuxiliaryObject);

  aAuxiliaryObject.lastStartProgress = animationProgressObject.progress;
  aAuxiliaryObject.countDriveloop = animationProgressObject.countDriveloop;

  animationInstance.progressValue = animationProgressObject.progress;
  animationInstance.max = animationProgressObject.maxProgress;
  loadPropertiesToAnimate(
    aAuxiliaryObject,
    keyframes,
    (result, propertiesToAnimate) => {
      const currentTime = getTimeNow();
      const animationLoadingTime = currentTime - animationArrivalTime;
      const waitingTime = animationLoadingTime;
      const loadingTime = currentTime - startAnimationLoadingTime;

      /* console.log(
        `AnimationWS "${animationInstance.animationId}" - Times: [ \n\r\n\r waitingTime: ${waitingTime}ms, \n\r\n\r loadingTime: ${loadingTime}ms,\n\r\n\r elementLenght: ${animationInstance.targets.length}\n\r\n\r]`
      ); */
      aAuxiliaryObject.dataLoadingState = result ? 'load' : 'stoped';
      aAuxiliaryObject.animationLoadingTime = animationLoadingTime;
      aAuxiliaryObject.animateProperties = propertiesToAnimate;

      callbackLoaded(aAuxiliaryObject);

      propagateAnimationEventListener(
        LISTENERS_NAMES[3],
        aAuxiliaryObject.animationInstance
      );
    }
  );
}

/**
 * Creates an object with the properties of the user's animation instance, and adds control-related properties and the execution of the animation, thus maintaining hidden complexity.
 */
export default function LoadAnimation(
  animationInstance: AnimationInstance,
  callbackLoaded: (animationAuxiliaryObjects: AnimationAuxiliaryObject) => void
): void {
  const hasAnimationAuxiliaryObject = getAnimationAuxiliaryObject(
    animationInstance.animationId
  );

  if (
    animationInstance.state !== ANIMATION_STATES[0] ||
    hasAnimationAuxiliaryObject
  ) {
    if (hasAnimationAuxiliaryObject) {
      if (hasAnimationAuxiliaryObject.dataLoadingState === 'loading') {
        const setTimeoutId = setTimeout(() => {
          clearTimeout(setTimeoutId);

          if (animationInstance.state !== ANIMATION_STATES[1]) {
            LoadAnimation(animationInstance, callbackLoaded);
          }
        });
      } else if (
        hasAnimationAuxiliaryObject.dataLoadingState === 'load' &&
        hasAnimationAuxiliaryObject.animationInstance.state ===
          ANIMATION_STATES[5]
      ) {
        startAnimationExecutionCycle(hasAnimationAuxiliaryObject);
      } else {
        startAnimationExecutionCycle(
          /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
          restartAnimationProperties(hasAnimationAuxiliaryObject),
          true
        );
      }

      return;
    }
  }

  const currentTime = getTimeNow();

  const animationAuxiliaryObject = CreateAnimationAuxiliaryObject(
    animationInstance
  );

  addAnimationAuxiliaryObject(animationAuxiliaryObject);

  Object.assign(animationAuxiliaryObject.animationInstance, {
    state: ANIMATION_STATES[6],
    delay: animationInstance.delay,
  });

  forwardAnimation(animationAuxiliaryObject, currentTime, callbackLoaded);
}

export function startAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  if (
    animationAuxiliaryObject.dataLoadingState === 'load' &&
    animationAuxiliaryObject.animationInstance.state !== ANIMATION_STATES[3]
  ) {
    const a = animationAuxiliaryObject;
    a.animationInstance.state = ANIMATION_STATES[1];

    startAnimationExecutionCycle(animationAuxiliaryObject);
  }
}
export function loadedAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const a = animationAuxiliaryObject;
  if (
    a.dataLoadingState === 'load' &&
    a.animationInstance.state !== ANIMATION_STATES[3]
  ) {
    a.animationInstance.state = ANIMATION_STATES[5];
  }
}

export function restartAnimationProperties(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  Object.assign(animationAuxiliaryObject, {
    countDriveloop: 0,
    progress: animationAuxiliaryObject.initialProgress,
    animationAlreadyStarted: false,
  });
  const animationProgressObject = setAnimationProgress(
    animationAuxiliaryObject
  );

  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: animationProgressObject.progress,
    countDriveloop: animationProgressObject.countDriveloop,
    progress: animationProgressObject.progress,
  });

  Object.assign(animationAuxiliaryObject.animationInstance, {
    progress: animationProgressObject.progress,
    max: animationProgressObject.maxProgress,
    state: ANIMATION_STATES[1],
    count: 0,
  });

  return animationAuxiliaryObject;
}
