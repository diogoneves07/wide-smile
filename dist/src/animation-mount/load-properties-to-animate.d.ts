import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
declare type PropertyObject = AnimationAuxiliaryObject['animateProperties'][number];
export default function loadPropertiesToAnimate(animationAuxiliaryObject: AnimationAuxiliaryObject, props: PropertiesToAnimateObjectKeyframes, callbackLoaded: (result: boolean, propertiesToAnimate: PropertyObject[]) => void): void;
export {};
