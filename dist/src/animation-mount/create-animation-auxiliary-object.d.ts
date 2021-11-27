import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Sets the value of some properties For `AnimationAuxiliaryObject` from a `AnimationInstance`.
 */
export declare function propertiesForAnimationAuxiliaryObject(animationInstance: AnimationInstance): Pick<AnimationAuxiliaryObject, 'easing' | 'reverseExecution' | 'duration'>;
export default function CreateAnimationAuxiliaryObject(animationInstance: AnimationInstance): AnimationAuxiliaryObject;
