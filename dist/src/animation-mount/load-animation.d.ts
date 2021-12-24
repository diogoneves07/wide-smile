import { AnimationInstance } from '../contracts/animation-inter';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
/**
 * Creates an object with the properties of the user's animation instance, and adds control-related properties and the execution of the animation, thus maintaining hidden complexity.
 */
export default function LoadAnimation(animation: AnimationInstance, callbackLoaded: (animationAuxiliaryObjects: AnimationAuxiliaryObject) => void): void;
export declare function startAnimationIfItIsLoaded(animationAuxiliaryObject: AnimationAuxiliaryObject): void;
