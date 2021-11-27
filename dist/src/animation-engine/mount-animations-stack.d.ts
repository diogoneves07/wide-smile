import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
declare const OBSERVERS_OF_THE_STACK_OF_ANIMATIONS: Record<string, (animationsStack: Record<string, AnimationAuxiliaryObject>) => unknown>;
export declare function addMountedStackObserver(callbackfn: typeof OBSERVERS_OF_THE_STACK_OF_ANIMATIONS[string], name: string): void;
/**
 * Adds the execution queue  a "callbackfn" (through requestAnimationFrame or setTimeout). When invoked the same calls the function that unmount the stack and completes the cycle.
 */
export declare function timeoutForStackMounting(): void;
export declare function addAnimationToStack(animationAuxiliaryObject: AnimationAuxiliaryObject | 'open'): boolean;
export declare function removeAnimationFromStack(animationId: AnimationAuxiliaryObject['animationId']): void;
export declare function hasAnimationInTheStack(): boolean;
export declare function getAnimationInTheStack(animationId?: number): AnimationAuxiliaryObject | Record<string, AnimationAuxiliaryObject | null> | null;
export {};
