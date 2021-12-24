import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
export default function getCSSPropertiesToBeAnimated(CSSProperties: Record<string, Record<string, ValuesToAnimateProperty>>, target: HTMLElement, index: number, length: number): AnimationAuxiliaryObject['propertiesToBeAnimate'][number][];
