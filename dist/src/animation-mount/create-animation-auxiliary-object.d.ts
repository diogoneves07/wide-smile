import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Sets the value of some properties For `AnimationAuxiliaryObject` from a `AnimationInstance`.
 */
export declare function propertiesForAnimationAuxiliaryObject(animation: AnimationInstance): Pick<AnimationAuxiliaryObject, 'easing' | 'reverseExecution' | 'duration'>;
export default function CreateAnimationAuxiliaryObject(animation: AnimationInstance): AnimationAuxiliaryObject;
