import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import getNewAnimationProgress from './get-new-animation-progress';

export default function resetAnimationProgress(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  const animation = animationAuxiliaryObject.animation;
  Object.assign(animationAuxiliaryObject, {
    countDriveLoops: 0,
    animationAlreadyStarted: false,
  });

  Object.assign(animation, {
    state: ANIMATION_STATES[1],
    count: 0,
  });
  const animationProgressObject = getNewAnimationProgress(
    animationAuxiliaryObject
  );

  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: animation.progressValue,
    countDriveLoops: animationProgressObject.countDriveLoops,
  });

  Object.assign(animation, {
    progressValue: animationProgressObject.progress,
    max: animationProgressObject.maxProgress,
  });

  return animationAuxiliaryObject;
}
