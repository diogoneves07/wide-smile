import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
export declare function recyclePropertyObjectsToAnimate(propertiesToBeAnimate: PropertyObject[]): void;
declare type PropertyObject = AnimationAuxiliaryObject['propertiesToBeAnimate'][number];
export default function getPropertyObjectToAnimate(propertiesKeyframes: Record<string, Record<string, string>>, target: object, index: number, originalArrayLength: number, type: PropertyObject['type']): PropertyObject[];
export {};
