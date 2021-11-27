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
    const animationInstance = animationAuxiliaryObject.animationInstance;

    removeAnimationFromStack(animationAuxiliaryObject.animationId);

    animationAuxiliaryObject.lastStartProgress =
      animationInstance.progressValue;

    animationInstance.max = newProgress;

    if (animationInstance.loop === animationInstance.count) {
      animationInstance.count -= 1;
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
