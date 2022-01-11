import {
  LISTENERS_NAMES,
  propagateAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import removeAnimationStyle from './remove-animation-style';

export default function animationCompleted(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const aAuxiliaryObject = animationAuxiliaryObject;
  const { animation } = animationAuxiliaryObject;
  animation.state = ANIMATION_STATES[2];
  propagateAnimationEventListener(LISTENERS_NAMES[7], animation);

  propagateAnimationEventListener(LISTENERS_NAMES[2], animation);

  if (animation.isInCycle) {
    propagateAnimationEventListener(LISTENERS_NAMES[11], animation);
  }

  if (animation.autoDestroy) {
    animation.destroy();
  } else if (animation.reset) {
    const removeChanges = animation.removeChanges;
    animation.removeChanges = true;

    removeAnimationStyle(aAuxiliaryObject);

    animation.removeChanges = removeChanges;
  }
}
