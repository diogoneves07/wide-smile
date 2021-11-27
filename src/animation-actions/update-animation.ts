import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { INTERCALATION_TIME, MAX_KEYFRAME } from '../sauce/constants';
import { toMs, getTimeNow } from '../utilities/index';
import { propertiesForAnimationAuxiliaryObject } from '../animation-mount/create-animation-auxiliary-object';
import setAnimationProgress from '../animation-engine/set-animation-progress';

/**
 * Updates the animation with the new values of the properties.
 */
export default function updateAnimation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  const { animationInstance } = animationAuxiliaryObject;

  let progress = animationInstance.progressValue;
  progress = Math.max(progress, 0);
  progress = Math.min(progress, MAX_KEYFRAME);

  const timeRunningIteration =
    (Math.max(toMs(animationInstance.dur), 1) / 100) * progress;

  Object.assign(animationAuxiliaryObject, {
    startTimeOfTheIteration: getTimeNow() - timeRunningIteration,

    timeRunningIteration,

    iterationInterlacations: {
      timeConsumed: timeRunningIteration,

      completed: Math.floor(timeRunningIteration / INTERCALATION_TIME),

      leftovers: 0,
    },
  });

  const animationProgressObject = setAnimationProgress(
    animationAuxiliaryObject
  );

  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: progress,
    countDriveloop: animationAuxiliaryObject.countDriveloop - 1,
  });

  Object.assign(animationInstance, {
    progress,
    max: animationProgressObject.maxProgress,
  });

  Object.assign(
    animationAuxiliaryObject,
    propertiesForAnimationAuxiliaryObject(animationInstance)
  );

  return animationAuxiliaryObject;
}
