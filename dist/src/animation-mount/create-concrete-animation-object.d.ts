import ConcreteAnimationObject from '../contracts/concrete-animation-object';
import { AnimationInstance } from '../contracts/animation-instance-properties';
/**
 * Sets the value of some properties For `ConcreteAnimationObject` from a `AnimationInstance`.
 */
export declare function propertiesForConcreteAnimationObject(animationInstance: AnimationInstance): Pick<ConcreteAnimationObject, 'easing' | 'reverseExecution' | 'duration'>;
export default function CreateConcreteAnimationObject(animationInstance: AnimationInstance): ConcreteAnimationObject;
