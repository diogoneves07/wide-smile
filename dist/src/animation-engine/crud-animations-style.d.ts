import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
export declare function transformFunctionsToObject(target: HTMLElement): Record<string, string> | false;
export declare function transformFunctionsObjectToString(transformFunctionsObject: Record<string, string>): string;
export declare function applyAnimationsStyleToTargets(propertiesToBeAnimate: AnimationAuxiliaryObject['propertiesToBeAnimate'], animationAuxiliaryObject: AnimationAuxiliaryObject): AnimationAuxiliaryObject['propertiesToBeAnimate'];
