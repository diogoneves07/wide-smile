import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { toMs } from '../utilities/index';
import { parseEasings } from '../based-implementations/easings';
import { getCustomEasing } from '../sauce/custom-easings';
import { AnimationInstance } from '../contracts/animation-inter';
import EasingFunction from '../contracts/easing-function';

/**
 * Sets the value of some properties For `AnimationAuxiliaryObject` from a `AnimationInstance`.
 */
export function propertiesForAnimationAuxiliaryObject(
  animation: AnimationInstance
): Pick<AnimationAuxiliaryObject, 'easing' | 'reverseExecution' | 'duration'> {
  let easing: EasingFunction;
  if (
    typeof animation.easing === 'string' &&
    getCustomEasing(animation.easing)
  ) {
    easing = getCustomEasing(animation.easing) as EasingFunction;
  } else {
    easing = parseEasings(animation.easing, toMs(animation.dur));
  }
  return {
    easing,

    duration: animation.dur,

    reverseExecution: ((direction: AnimationInstance['dir']) => {
      switch (direction) {
        case 'reverse':
        case 'alternate-reverse':
          return true;

        default:
          return false;
      }
    })(animation.dir),
  };
}
export default function CreateAnimationAuxiliaryObject(
  animation: AnimationInstance
): AnimationAuxiliaryObject {
  return {
    animateProperties: [],

    keyframesKeys: [],

    remainingDelayAnimation: toMs(animation.delay),

    initialProgress: animation.progressValue,

    lastStartProgress: 0,

    animationId: animation.animationId,

    countDriveloop: 0,

    dataLoadingState: 'loading',

    backRunning: false,

    startTimeOfTheIteration: 0,

    timeRunningIteration: 0,

    valuesOfThePropertiesBeforeAnimating: [],

    animationAlreadyStarted: false,

    iterationInterlacations: {
      timeConsumed: 0,
      completed: 0,
      leftovers: 0,
    },
    animationLoadingTime: 0,

    animation,
    ...propertiesForAnimationAuxiliaryObject(animation),
  } as AnimationAuxiliaryObject;
}
