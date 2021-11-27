import { ANIMATION_STATES } from '../sauce/constants';
import { removeAllAnimationEventListeners } from '../animation-listeners/animations-listeners-handlers';
import { removeAnimationStyle } from '../animation-engine/crud-animations-style';
import { AnimationInstance } from '../contracts/animation-inter';
import { removeAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';

function removeInstance<T>(array: T, animationInstance: AnimationInstance) {
  return (((array as unknown) as unknown[]).filter(
    (i) => i !== animationInstance
  ) as unknown) as T;
}
/**
 * Destroys an animation.
 */
export default function destroyAnimation(
  animationInstance: AnimationInstance
): void {
  const aInstance = animationInstance;
  const performerProperties = aInstance.performer.$hidden;
  const cycleOptions = performerProperties.cycleOptions;

  if (!aInstance.state) return;

  aInstance.state = ANIMATION_STATES[4];

  const animationAuxiliaryObject = removeAnimationAuxiliaryObject(
    aInstance.animationId
  );
  performerProperties.animationInstances = removeInstance(
    performerProperties.animationInstances,
    animationInstance
  );
  performerProperties.independentAnimations = removeInstance(
    performerProperties.independentAnimations,
    animationInstance
  );
  if (cycleOptions) {
    if (cycleOptions.animationInstancesInCycle) {
      cycleOptions.animationInstancesInCycle = removeInstance(
        cycleOptions.animationInstancesInCycle,
        animationInstance
      );
    }

    if (cycleOptions.sequence) {
      const sequence = cycleOptions.sequence;
      const l = sequence.length;

      for (let index = 0; index < l; index += 1) {
        sequence[index] = removeInstance(sequence[index], animationInstance);
      }

      cycleOptions.sequence = sequence.filter((a) => a.length > 0);
    }
  }

  if (animationAuxiliaryObject) {
    removeAllAnimationEventListeners(aInstance.animationId);

    if (aInstance.removeChanges) {
      removeAnimationStyle(animationAuxiliaryObject);
    }
  }
}
