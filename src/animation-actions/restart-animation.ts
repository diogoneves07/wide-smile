import { ANIMATION_STATES } from '../sauce/constants';
import LoadAnimation, {
  restartAnimationProperties,
  startAnimation,
} from '../animation-mount/load-animation';
import startAnimationExecutionCycle, {
  resetIterationRelatedProperties,
} from '../animation-engine/animation-execution-cycle';
import { AnimationInstance } from '../contracts/animation-inter';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';

/**
 * Restart animation.
 */
export default function restartAnimation(
  animationInstance: AnimationInstance
): void {
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animationInstance.animationId
  );
  const u = animationInstance;
  if (animationAuxiliaryObject) {
    startAnimationExecutionCycle(
      restartAnimationProperties(
        resetIterationRelatedProperties(animationAuxiliaryObject)
      )
    );
  } else {
    u.state = ANIMATION_STATES[0];
    u.count = 0;

    LoadAnimation(animationInstance, startAnimation);
  }
}
