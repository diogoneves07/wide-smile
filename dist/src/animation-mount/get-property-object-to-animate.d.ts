import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
export declare function recyclePropertyObjectToAnimate(animateProperties: PropertyObject[]): void;
declare type PropertyObject = AnimationAuxiliaryObject['animateProperties'][number];
export default function getPropertyObjectToAnimate(propertiesKeyframes: Record<string, Record<string, string>>, target: object, index: number, originalArrayLength: number, type: PropertyObject['type']): PropertyObject[];
export {};
