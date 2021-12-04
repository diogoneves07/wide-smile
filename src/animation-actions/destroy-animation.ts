import { ANIMATION_STATES } from '../sauce/constants';
import { removeAllAnimationEventListeners } from '../animation-listeners/animations-listeners-handlers';
import { removeAnimationStyle } from '../animation-engine/crud-animations-style';
import { AnimationInstance } from '../contracts/animation-inter';
import { removeAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';

function removeInstance<T>(array: T, animation: AnimationInstance) {
  return (((array as unknown) as unknown[]).filter(
    (i) => i !== animation
  ) as unknown) as T;
}
/**
 * Destroys an animation.
 */
export default function destroyAnimation(animation: AnimationInstance): void {
  const aInstance = animation;
  const performerProperties = aInstance.performer.$hidden;
  const cycleOptions = performerProperties.cycleOptions;

  if (!aInstance.state) return;

  aInstance.state = ANIMATION_STATES[4];

  const animationAuxiliaryObject = removeAnimationAuxiliaryObject(
    aInstance.animationId
  );
  performerProperties.animationInstances = removeInstance(
    performerProperties.animationInstances,
    animation
  );
  performerProperties.independentAnimations = removeInstance(
    performerProperties.independentAnimations,
    animation
  );
  if (cycleOptions) {
    if (cycleOptions.animationInstancesInCycle) {
      cycleOptions.animationInstancesInCycle = removeInstance(
        cycleOptions.animationInstancesInCycle,
        animation
      );
    }

    if (cycleOptions.sequence) {
      const sequence = cycleOptions.sequence;
      const l = sequence.length;

      for (let index = 0; index < l; index += 1) {
        sequence[index] = removeInstance(sequence[index], animation);
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
