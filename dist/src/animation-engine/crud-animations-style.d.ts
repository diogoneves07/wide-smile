import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
export declare function transformFunctionsToObject(target: HTMLElement): Record<string, string> | false;
export declare function transformFunctionsObjectToString(transformFunctionsObject: Record<string, string>): string;
export declare function applyAnimationsStyleToElement(animateProperties: AnimationAuxiliaryObject['animateProperties'], animationAuxiliaryObject: AnimationAuxiliaryObject): void;
/**
 * Removes the style added by the animation.
 */
export declare function removeAnimationStyle(requiredAnimationProperties: Pick<AnimationAuxiliaryObject, 'animationId' | 'valuesOfThePropertiesBeforeAnimating'> & {
    animationInstance: Pick<AnimationInstance, 'removeChanges' | 'targets'>;
}): void;
