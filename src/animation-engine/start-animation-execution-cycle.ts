import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import {
  getAnimationInTheStack,
  useTimeoutForStackMounting,
} from './mount-animations-stack';
import getNewValuesForAnimationIntercalation from './get-new-values-for-animation-intercalation';
import insertAnimationInTheQueue from './insert-animation-in-the-queue';
import timeoutForStackMounting from './timeout-for-stack-mounting';

/* 
  eslint-disable @typescript-eslint/no-use-before-define 
*/

/**
 * Defines the function that will process the stack.
 */
useTimeoutForStackMounting(timeoutForStackMounting);

export default function startAnimationExecutionCycle(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  jumpTimeout = false
): void {
  const a = animationAuxiliaryObject;

  if (getAnimationInTheStack(a.animationId)) {
    return;
  }

  /**
   * Gets the time that the animation took to complete the load.
   */
  const { animationLoadingTime } = a;

  const newIntercalationObject = getNewValuesForAnimationIntercalation(a);
  Object.assign(a, newIntercalationObject.toAuxiliaryObject);

  a.animationLoadingTime = 0;

  a.animation.state = ANIMATION_STATES[1];
  a.animation.progressValue = newIntercalationObject.progress;

  insertAnimationInTheQueue(a, jumpTimeout, animationLoadingTime);
}
