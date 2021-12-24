import AnimationInstanceProperties from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
export declare function resetArrayOfLastAddedAnimationObjects(): void;
export declare function removeLastAnimationObjectAddedToPerformer(animationPerformer: PerformerFn): void;
export declare function addLastAnimationObjectAddedToPerformer(animationPerformer: PerformerFn, animationObject: AnimationInstanceProperties): void;
export declare function getLastAnimationObjectAddedToPerformer(animationPerformer: PerformerFn): AnimationInstanceProperties | undefined;
