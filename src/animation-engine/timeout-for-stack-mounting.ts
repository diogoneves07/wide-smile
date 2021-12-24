import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { BEST_FPS_TIMEOUT } from '../sauce/constants';
import { sendToGarbageCollector } from '../sauce/manage-memory-collections';
import isEmptyObject from '../utilities/is-empty-object';
import customForIn from '../utilities/custom-for-in';
import {
  getCurrentAnimationsStac,
  resetAnimationsStack,
} from './mount-animations-stack';
import performIntercalationOfTheAnimations from './perform-intercalation-of-the-animations';

/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Indicates whether the stack mount is already started.
 */
let STARTED_STACK_MOUNT = false;

/**
 * Adds the execution queue  a "callbackfn" (through requestAnimationFrame or setTimeout). When invoked the same calls the function that unmount the stack and completes the cycle.
 */
export default function timeoutForStackMounting(): void {
  if (STARTED_STACK_MOUNT) {
    return;
  }
  const ANIMATIONS_STACK = getCurrentAnimationsStac();
  /**
   * Waits for animations so that each style is added together.
   */
  STARTED_STACK_MOUNT = true;

  timeoutForStackMounting();
  animationTimeout(() => {
    if (isEmptyObject(ANIMATIONS_STACK)) {
      STARTED_STACK_MOUNT = false;
      return;
    }

    const animationsStack: Record<string, AnimationAuxiliaryObject> = {};

    customForIn(ANIMATIONS_STACK, (propertyValue, propertyName) => {
      if (propertyValue) {
        animationsStack[propertyName] = propertyValue;
      }
    });

    sendToGarbageCollector(animationsStack, ANIMATIONS_STACK);

    /*
     * Restarts the values of the mount stack.
     */
    STARTED_STACK_MOUNT = false;
    resetAnimationsStack();
    performIntercalationOfTheAnimations(animationsStack);
  });
}

setInterval(() => {
  timeoutForStackMounting();
}, BEST_FPS_TIMEOUT);

timeoutForStackMounting();

const hasRAf = typeof window.requestAnimationFrame === 'function';
function clearAnimationTimeout(id: number): void {
  if (hasRAf) {
    return window.cancelAnimationFrame(id);
  }
  return window.clearTimeout(id);
}

function animationTimeout(
  callback: () => void,
  timeout?: number | undefined
): number {
  if (hasRAf) {
    const requestAnimationFrameId = window.requestAnimationFrame(() => {
      callback();
      clearAnimationTimeout(requestAnimationFrameId);
    });
    return requestAnimationFrameId;
  }
  return (setTimeout(() => {
    callback();
  }, timeout || 0) as unknown) as number;
}
