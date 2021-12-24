import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
/**
 * That's where the animations are queued before they're executed.
 */
declare let ANIMATIONS_STACK: Record<string, AnimationAuxiliaryObject | null>;
export declare function useTimeoutForStackMounting(callback: Function): void;
export declare function getCurrentAnimationsStac(): typeof ANIMATIONS_STACK;
export declare function resetAnimationsStack(): void;
export declare function addAnimationToStack(animationAuxiliaryObject: AnimationAuxiliaryObject): boolean;
export declare function removeAnimationFromStack(animationId: AnimationAuxiliaryObject['animationId']): void;
export declare function hasAnimationInTheStack(): boolean;
export declare function getAnimationInTheStack(animationId?: number): AnimationAuxiliaryObject | Record<string, AnimationAuxiliaryObject | null> | null;
export {};
