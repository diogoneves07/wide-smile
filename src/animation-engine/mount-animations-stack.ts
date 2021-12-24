import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import isEmptyObject from '../utilities/is-empty-object';

/**
 * That's where the animations are queued before they're executed.
 */
let ANIMATIONS_STACK: Record<string, AnimationAuxiliaryObject | null> = {};
let timeoutForStackMounting: Function;

export function useTimeoutForStackMounting(callback: Function): void {
  timeoutForStackMounting = callback;
}
export function getCurrentAnimationsStac(): typeof ANIMATIONS_STACK {
  return ANIMATIONS_STACK;
}
export function resetAnimationsStack(): void {
  ANIMATIONS_STACK = {};
}

export function addAnimationToStack(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): boolean {
  if (!animationAuxiliaryObject || !animationAuxiliaryObject.animation) {
    return false;
  }

  ANIMATIONS_STACK[
    animationAuxiliaryObject.animationId
  ] = animationAuxiliaryObject;
  timeoutForStackMounting();
  return true;
}

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
