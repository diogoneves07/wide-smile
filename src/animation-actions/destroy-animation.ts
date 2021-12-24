import { ANIMATION_STATES } from '../sauce/constants';
import { removeAllAnimationEventListeners } from '../animation-listeners/animations-listeners-handlers';
import { AnimationInstance } from '../contracts/animation-inter';
import {
  getAnimationAuxiliaryObject,
  removeAnimationAuxiliaryObject,
} from '../animation-mount/crud-animation-objects';
import removeAnimationStyle from '../animation-engine/remove-animation-style';
import removeReferenceInCreatorToPerformer from '../sauce/remove-reference-in-creator-to-performer';

function removeInstance<T>(array: T, animation: AnimationInstance) {
  return (((array as unknown) as unknown[]).filter(
    (i) => i !== animation
  ) as unknown) as T;
}
/**
 * Destroys an animation.
 */
export default function destroyAnimation(a: AnimationInstance): void {
  const animation = a;
  const performerProperties = animation.performer.$hidden;
  const cycleOptions = performerProperties.cycleOptions;

  if (!animation.state) return;

  animation.state = ANIMATION_STATES[4];

  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );
  if (animationAuxiliaryObject) {
    removeAnimationStyle(animationAuxiliaryObject);
    removeAnimationAuxiliaryObject(animation.animationId);
  }
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

      cycleOptions.sequence = sequence.filter((i) => i.length > 0);
    }
  }

  removeReferenceInCreatorToPerformer(animation.performer);

  removeAllAnimationEventListeners(animation.animationId);
}
