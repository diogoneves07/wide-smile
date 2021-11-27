import AnimationInstanceProperties, { AnimationOptions } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import AnimationWS from './animation';
export declare function useAnimationObjectExpectingSideEffects(animationPerformer: PerformerFn, v?: AnimationOptions): AnimationOptions | undefined;
/**
 * Executes the methods and forwards the animations to the construct.
 */
export declare const runCallbacksAtTheRightTime: (callbackfn: Function) => void;
export declare function addInStackForConstruction(animationProperties: AnimationOptions, performerFn: PerformerFn, animationObject?: AnimationOptions | AnimationInstanceProperties | AnimationWS, typeOfLink?: 'after' | 'together' | 'wait', waitIterations?: number): void;
