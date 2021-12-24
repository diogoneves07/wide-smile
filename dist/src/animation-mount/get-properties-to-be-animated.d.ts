import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
import TargetsAnimationProperty from '../contracts/targets-animation-property';
export default function getPropertiesToBeAnimated(targetObject: TargetsAnimationProperty[number], props: PropertiesToAnimateObjectKeyframes, specials: PropertiesToAnimateObjectKeyframes): AnimationAuxiliaryObject['propertiesToBeAnimate'];
