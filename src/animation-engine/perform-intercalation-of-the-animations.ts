import {
  LISTENERS_NAMES,
  propagateAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import customForIn from '../utilities/custom-for-in';
import getTimeNow from '../utilities/get-time-now';
import allAnimationTargetsHaveBeenRemoved from './all-animation-targets-have-been-removed';
import animationIntercalationCompleted from './animation-intercalation-completed';
import { applyAnimationsStyleToTargets } from './crud-animations-style';

/**
 * Calls the functions that traverse the stack and applies the style to the elements, restarts the values of the mount stack, removes the items from the stack, and forwards the animation objects to be audited.
 */
export default function performIntercalationOfTheAnimations(
  animationsStack: Record<string, AnimationAuxiliaryObject>
): void {
  customForIn(
    animationsStack,
    (animationAuxiliaryObject: AnimationAuxiliaryObject) => {
      const aAuxiliaryObject = animationAuxiliaryObject;

      const { animation, propertiesToBeAnimate } = aAuxiliaryObject;
      let { animationAlreadyStarted } = aAuxiliaryObject;

      if (!propertiesToBeAnimate[0]) {
        allAnimationTargetsHaveBeenRemoved(animation);
      }

      if (animation.state === ANIMATION_STATES[1] && propertiesToBeAnimate[0]) {
        aAuxiliaryObject.propertiesToBeAnimate = applyAnimationsStyleToTargets(
          propertiesToBeAnimate,
          aAuxiliaryObject
        );

        if (!animationAlreadyStarted) {
          propagateAnimationEventListener(LISTENERS_NAMES[0], animation);
          animationAlreadyStarted = true;
          aAuxiliaryObject.animationAlreadyStarted = true;
        }

        if (typeof animation.progress === 'function') {
          animation.progress(animation.progressValue);
        }
        propagateAnimationEventListener(LISTENERS_NAMES[9], animation);
      }
    }
  );

  const dateLastIntercalation = getTimeNow();
  customForIn(animationsStack, (a: AnimationAuxiliaryObject) => {
    const animationAuxiliaryObject = a;
    animationAuxiliaryObject.dateLastIntercalation = dateLastIntercalation;
    animationIntercalationCompleted(animationAuxiliaryObject);
  });
}
