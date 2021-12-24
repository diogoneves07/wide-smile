import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
export default function calcNextPropertyValue(propertyObject: AnimationAuxiliaryObject['propertiesToBeAnimate'][number], fromAndTo: [from: number, to: number], currentPercent: number, easingFn: AnimationAuxiliaryObject['easing'], round: number): string;
