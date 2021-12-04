import { removeAnimationFromStack } from '../animation-engine/mount-animations-stack';
import startAnimationExecutionCycle, {
  resetIterationRelatedProperties,
} from '../animation-engine/animation-execution-cycle';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';

export default function progressAnimationGoTo(
  animationId: number,
  newProgress: number,
  applyDelay?: boolean
): void {
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(animationId);
  if (animationAuxiliaryObject) {
    const animation = animationAuxiliaryObject.animation;

    removeAnimationFromStack(animationAuxiliaryObject.animationId);

    animationAuxiliaryObject.lastStartProgress = animation.progressValue;

    animation.max = newProgress;

    if (animation.loop === animation.count) {
      animation.count -= 1;
    }
    if (applyDelay) {
      startAnimationExecutionCycle(
        resetIterationRelatedProperties(animationAuxiliaryObject)
      );
    } else {
      startAnimationExecutionCycle(
        resetIterationRelatedProperties(animationAuxiliaryObject),
        true
      );
    }
  }
}
