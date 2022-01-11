import { ANIMATION_STATES } from '../sauce/constants';
import getNewAnimationProgress from '../animation-engine/get-new-animation-progress';
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
import startAnimationExecutionCycle from '../animation-engine/start-animation-execution-cycle';
import loadPropertiesToAnimate from './load-properties-to-animate';
import flattenKeyframes from './flatten-keyframes';
import { AnimationInstance } from '../contracts/animation-inter';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import resetAnimationProgress from '../animation-engine/reset-animation-progress';

function getKeyframesKeys(
  keyframes: ReturnType<typeof flattenKeyframes>['keyframes']
) {
  const keys: string[] = [];
  customForIn(keyframes, (propertyKeyframes) => {
    customForIn(propertyKeyframes, (_v, key) => {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
      }
    });
  });

  return ordernateByGrowingValues(keys);
}
function forwardAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  animationArrivalTime: number,
  callbackLoaded: (animationAuxiliaryObjects: AnimationAuxiliaryObject) => void
) {
  const aAuxiliaryObject = animationAuxiliaryObject;
  const { animation } = aAuxiliaryObject;

  const fKeyframes = flattenKeyframes(
    animation.keyframes,
    animation.performer.$hidden.orderOfThePropertiesUsed
  );

  animation.performer.$hidden.orderOfThePropertiesUsed =
    fKeyframes.orderOfThePropertiesUsed;
  const keyframes = fKeyframes.keyframes;

  aAuxiliaryObject.keyframesKeys = getKeyframesKeys(keyframes);
  const animationProgressObject = getNewAnimationProgress(aAuxiliaryObject);

  aAuxiliaryObject.lastStartProgress = animationProgressObject.progress;
  aAuxiliaryObject.countDriveLoops = animationProgressObject.countDriveLoops;
  animation.progressValue = animationProgressObject.progress;
  animation.max = animationProgressObject.maxProgress;

  loadPropertiesToAnimate(
    aAuxiliaryObject,
    keyframes,
    (result, propertiesToAnimate) => {
      const currentTime = getTimeNow();
      const animationLoadingTime = currentTime - animationArrivalTime;

      aAuxiliaryObject.dataLoadingState = result ? 'load' : 'stoped';
      aAuxiliaryObject.animationLoadingTime = animationLoadingTime;
      aAuxiliaryObject.propertiesToBeAnimate = propertiesToAnimate;

      callbackLoaded(aAuxiliaryObject);

      propagateAnimationEventListener(
        LISTENERS_NAMES[3],
        aAuxiliaryObject.animation
      );
    }
  );
}

/**
 * Creates an object with the properties of the user's animation instance, and adds control-related properties and the execution of the animation, thus maintaining hidden complexity.
 */
export default function LoadAnimation(
  animation: AnimationInstance,
  callbackLoaded: (animationAuxiliaryObjects: AnimationAuxiliaryObject) => void
): void {
  const hasAnimationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );

  if (!hasAnimationAuxiliaryObject) {
    propagateAnimationEventListener(LISTENERS_NAMES[6], animation);
  }

  if (animation.state !== ANIMATION_STATES[0] || hasAnimationAuxiliaryObject) {
    if (hasAnimationAuxiliaryObject) {
      if (hasAnimationAuxiliaryObject.dataLoadingState === 'loading') {
        const setTimeoutId = setTimeout(() => {
          clearTimeout(setTimeoutId);

          if (animation.state !== ANIMATION_STATES[1]) {
            LoadAnimation(animation, callbackLoaded);
          }
        });
      } else {
        startAnimationExecutionCycle(
          resetAnimationProgress(hasAnimationAuxiliaryObject),
          true
        );
      }

      return;
    }
  }

  const currentTime = getTimeNow();

  const animationAuxiliaryObject = CreateAnimationAuxiliaryObject(animation);

  addAnimationAuxiliaryObject(animationAuxiliaryObject);

  Object.assign(animationAuxiliaryObject.animation, {
    state: ANIMATION_STATES[6],
    delay: animation.delay,
  });

  forwardAnimation(animationAuxiliaryObject, currentTime, callbackLoaded);
}

export function startAnimationIfItIsLoaded(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  if (
    animationAuxiliaryObject.dataLoadingState === 'load' &&
    animationAuxiliaryObject.animation.state !== ANIMATION_STATES[3]
  ) {
    const a = animationAuxiliaryObject;
    a.animation.state = ANIMATION_STATES[1];

    startAnimationExecutionCycle(animationAuxiliaryObject);
  }
}
