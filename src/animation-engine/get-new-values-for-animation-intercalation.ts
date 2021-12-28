import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
import { MAX_KEYFRAME } from '../sauce/constants';
import getTimeNow from '../utilities/get-time-now';
import toMs from '../utilities/to-ms';

export default function getNewValuesForAnimationIntercalation(
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

  iterationInterlacations.timeConsumed += durationOfTheInterlacation;

  const averageDurationForIntercalation =
    iterationInterlacations.completed > 0
      ? iterationInterlacations.timeConsumed / iterationInterlacations.completed
      : 0;

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
