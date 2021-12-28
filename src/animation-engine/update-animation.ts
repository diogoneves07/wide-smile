import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { INTERCALATION_TIME, MAX_KEYFRAME } from '../sauce/constants';
import { toMs, getTimeNow } from '../utilities/index';
import { propertiesForAnimationAuxiliaryObject } from '../animation-mount/create-animation-auxiliary-object';
import getNewAnimationProgress from './get-new-animation-progress';

/**
 * Updates the animation with the new values of the properties.
 */
export default function updateAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  const { animation } = animationAuxiliaryObject;

  let progress = animation.progressValue;
  progress = Math.max(progress, 0);
  progress = Math.min(progress, MAX_KEYFRAME);

  const timeRunningIteration =
    (Math.max(toMs(animation.dur), 1) / 100) * progress;

  Object.assign(animationAuxiliaryObject, {
    startTimeOfTheIteration: getTimeNow() - timeRunningIteration,

    timeRunningIteration,

    iterationInterlacations: {
      timeConsumed: timeRunningIteration,

      completed: Math.floor(timeRunningIteration / INTERCALATION_TIME),
    },
  });

  const animationProgressObject = getNewAnimationProgress(
    animationAuxiliaryObject
  );

  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: progress,
    countDriveLoops: animationAuxiliaryObject.countDriveLoops - 1,
  });

  Object.assign(animation, {
    progress,
    max: animationProgressObject.maxProgress,
  });

  Object.assign(
    animationAuxiliaryObject,
    propertiesForAnimationAuxiliaryObject(animation)
  );

  return animationAuxiliaryObject;
}
