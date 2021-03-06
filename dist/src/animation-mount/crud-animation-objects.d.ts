import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
/**
 * A container for animations that saves the dedicated objects to each in pairs (the user animation instance and the built-in animation instance).
 */
declare const ANIMATION_AUXILIARY_OBJECTS: {
    [animationId: string]: AnimationAuxiliaryObject;
};
export declare function getAllAnimationAuxiliaryObjects(): typeof ANIMATION_AUXILIARY_OBJECTS;
export declare function addAnimationAuxiliaryObject(animationAuxiliaryObject: AnimationAuxiliaryObject): void;
export declare function getAnimationAuxiliaryObject(animationId: number): false | AnimationAuxiliaryObject;
export declare function removeAnimationAuxiliaryObject(animationId: number): AnimationAuxiliaryObject | false;
export {};
