import { ANIMATION_STATES } from '../sauce/constants';
import startAnimationExecutionCycle from '../animation-engine/animation-execution-cycle';
import { AnimationInstance } from '../contracts/animation-inter';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';

/**
 * Resumes the animation that was paused.
 */
export default function resumeAnimation(
  requiredAnimationProperties: Pick<AnimationInstance, 'state' | 'animationId'>
): void {
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    requiredAnimationProperties.animationId
  );
  if (animationAuxiliaryObject) {
    const u = animationAuxiliaryObject.animationInstance;

    if (
      animationAuxiliaryObject.animationInstance.state === ANIMATION_STATES[3]
    ) {
      u.state = ANIMATION_STATES[1];

      startAnimationExecutionCycle(animationAuxiliaryObject, true);
    }
  }
}
