import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import { releasesGarbageFromAnimations } from '../sauce/manage-memory-collections';
import getTimeNow from '../utilities/get-time-now';
import toMs from '../utilities/to-ms';
import animationIterationCompleted from './animation-iteration-completed';
import manageAnimationsDelay from './manage-animations-delay';
import newAnimationIntercalation from './new-animation-intercalation';
/**
 * Checks whether the animation iteration has been completed or there should be more intercalations.
 */
export default function animationIntercalationCompleted(
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
        manageAnimationsDelay(
          aAuxiliaryObject,
          endDelay,
          getTimeNow(),
          animationIterationCompleted
        );
      } else {
        animationIterationCompleted(aAuxiliaryObject);
      }
    } else {
      newAnimationIntercalation(aAuxiliaryObject);
    }
  }
}
