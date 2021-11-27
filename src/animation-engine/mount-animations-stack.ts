import animationTimeout from './animation-timeout';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { sendToGarbageCollector } from '../sauce/manage-memory-collections';
import { customForIn } from '../utilities/index';
import { BEST_FPS_TIMEOUT } from '../sauce/constants';
import { isEmptyObject } from '../sauce/types';

/**
 * Indicates whether the stack mount is already started.
 */
let STARTED_STACK_MOUNT = false;

/**
 * That's where the animations are queued before they're executed.
 */
let ANIMATIONS_STACK: Record<string, AnimationAuxiliaryObject | null> = {};

const OBSERVERS_OF_THE_STACK_OF_ANIMATIONS: Record<
  string,
  (animationsStack: Record<string, AnimationAuxiliaryObject>) => unknown
> = {};

export function addMountedStackObserver(
  callbackfn: typeof OBSERVERS_OF_THE_STACK_OF_ANIMATIONS[string],
  name: string
): void {
  OBSERVERS_OF_THE_STACK_OF_ANIMATIONS[name] = callbackfn;
}

/**
 * Adds the execution queue  a "callbackfn" (through requestAnimationFrame or setTimeout). When invoked the same calls the function that unmount the stack and completes the cycle.
 */

export function timeoutForStackMounting(): void {
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
    ANIMATIONS_STACK = {};

    customForIn(OBSERVERS_OF_THE_STACK_OF_ANIMATIONS, (observerFn) => {
      observerFn(animationsStack);
    });
  });
}

export function addAnimationToStack(
  animationAuxiliaryObject: AnimationAuxiliaryObject | 'open'
): boolean {
  if (
    animationAuxiliaryObject !== 'open' &&
    (!animationAuxiliaryObject || !animationAuxiliaryObject.animationInstance)
  ) {
    return false;
  }

  if (!STARTED_STACK_MOUNT) {
    /**
     * Waits for animations so that each style is added together.
     */

    STARTED_STACK_MOUNT = true;

    timeoutForStackMounting();
  }
  if (animationAuxiliaryObject !== 'open') {
    ANIMATIONS_STACK[
      animationAuxiliaryObject.animationId
    ] = animationAuxiliaryObject;
  }

  return true;
}

setInterval(() => {
  addAnimationToStack('open');
}, BEST_FPS_TIMEOUT);

addAnimationToStack('open');

export function removeAnimationFromStack(
  animationId: AnimationAuxiliaryObject['animationId']
): void {
  if (ANIMATIONS_STACK[animationId]) {
    ANIMATIONS_STACK[animationId] = null;
  }
}
export function hasAnimationInTheStack(): boolean {
  return !isEmptyObject(ANIMATIONS_STACK);
}
export function getAnimationInTheStack(
  animationId?: number
):
  | AnimationAuxiliaryObject
  | Record<string, AnimationAuxiliaryObject | null>
  | null {
  if (typeof animationId !== 'number') {
    return ANIMATIONS_STACK;
  }
  return ANIMATIONS_STACK[animationId];
}
