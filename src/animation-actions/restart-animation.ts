import { ANIMATION_STATES } from '../sauce/constants';
import LoadAnimation, {
  startAnimationIfItIsLoaded,
} from '../animation-mount/load-animation';
import startAnimationExecutionCycle from '../animation-engine/start-animation-execution-cycle';
import { AnimationInstance } from '../contracts/animation-inter';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import restartAnimationProperties from '../animation-engine/restart-animation-properties';

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
      restartAnimationProperties(animationAuxiliaryObject)
    );
  } else {
    u.state = ANIMATION_STATES[0];
    u.count = 0;

    LoadAnimation(animation, startAnimationIfItIsLoaded);
  }
}
