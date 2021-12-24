import {
  LISTENERS_NAMES,
  propagateAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import getTimeNow from '../utilities/get-time-now';
import toMs from '../utilities/to-ms';
import { applyAnimationsStyleToTargets } from './crud-animations-style';
import manageAnimationsDelay from './manage-animations-delay';
import { addAnimationToStack } from './mount-animations-stack';
import resetAnimationTimeProperties from './reset-animation-time-properties';

/**
 * Delegates the animation to be executed.
 */
export default function insertAnimationInTheQueue(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  jumpTimeout = false,
  animationLoadingTime = 0
): void {
  const a = animationAuxiliaryObject;
  const { animation, remainingDelayAnimation } = a;

  if (!a.animationAlreadyStarted) {
    propagateAnimationEventListener(LISTENERS_NAMES[8], animation);
  }

  const delay = Math.max(toMs(animation.delay) - animationLoadingTime, 0);

  if (delay > 0 && (remainingDelayAnimation || !jumpTimeout)) {
    manageAnimationsDelay(
      a,
      remainingDelayAnimation || delay,
      getTimeNow(),
      () => {
        propagateAnimationEventListener(LISTENERS_NAMES[10], animation);
        addAnimationToStack(a);
      }
    );
  } else {
    resetAnimationTimeProperties(a);

    a.remainingDelayAnimation = 0;

    propagateAnimationEventListener(LISTENERS_NAMES[10], animation);

    if (a.animation.firstRunImmediately && !a.animationAlreadyStarted) {
      a.propertiesToBeAnimate = applyAnimationsStyleToTargets(
        a.propertiesToBeAnimate,
        a
      );
      a.animation.firstRunImmediately = false;
    }
    addAnimationToStack(a);
  }
}
