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
export default function restartAnimation(animation: AnimationInstance): void {
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );
  const u = animation;
  if (animationAuxiliaryObject) {
    startAnimationExecutionCycle(
      restartAnimationProperties(
        resetIterationRelatedProperties(animationAuxiliaryObject)
      )
    );
  } else {
    u.state = ANIMATION_STATES[0];
    u.count = 0;

    LoadAnimation(animation, startAnimation);
  }
}
