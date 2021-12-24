import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
export default function getDirectPropertiesToBeAnimated(targetProperties: Record<string, Record<string, ValuesToAnimateProperty>>, target: object, index: number, length: number): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][];
