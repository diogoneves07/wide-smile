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
  animationInstance: AnimationInstance
): Pick<AnimationAuxiliaryObject, 'easing' | 'reverseExecution' | 'duration'> {
  let easing: EasingFunction;
  if (
    typeof animationInstance.easing === 'string' &&
    getCustomEasing(animationInstance.easing)
  ) {
    easing = getCustomEasing(animationInstance.easing) as EasingFunction;
  } else {
    easing = parseEasings(
      animationInstance.easing,
      toMs(animationInstance.dur)
    );
  }
  return {
    easing,

    duration: animationInstance.dur,

    reverseExecution: ((direction: AnimationInstance['dir']) => {
      switch (direction) {
        case 'reverse':
        case 'alternate-reverse':
          return true;

        default:
          return false;
      }
    })(animationInstance.dir),
  };
}
export default function CreateAnimationAuxiliaryObject(
  animationInstance: AnimationInstance
): AnimationAuxiliaryObject {
  return {
    animateProperties: [],

    keyframesKeys: [],

    remainingDelayAnimation: toMs(animationInstance.delay),

    initialProgress: animationInstance.progressValue,

    lastStartProgress: 0,

    animationId: animationInstance.animationId,

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

    animationInstance,
    ...propertiesForAnimationAuxiliaryObject(animationInstance),
  } as AnimationAuxiliaryObject;
}
