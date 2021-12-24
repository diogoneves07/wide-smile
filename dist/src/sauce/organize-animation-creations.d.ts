import AnimationInstanceProperties from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import AnimationWS from './animation';
export declare function buildAnimationsForSpecificPerformer(performer: PerformerFn, setProperties?: AnimationInstanceProperties): void;
export declare function getCurrentAnimationSketches(performer: PerformerFn): AnimationInstanceProperties[] | undefined;
export declare const runCallbacksAfterBuildingAnimations: (callbackfn: Function, performer?: PerformerFn | undefined) => void;
export declare function addAnimationObjectToTheConstructionStack(performerFn: PerformerFn, animationOptions: AnimationInstanceProperties, linkedAnimation?: AnimationInstanceProperties | AnimationInstanceProperties | AnimationWS, typeOfLink?: 'afterAnimation' | 'together' | 'afterIterations', amountOfIterations?: number): void;
