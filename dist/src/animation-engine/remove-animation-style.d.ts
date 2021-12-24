import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Removes the style added by the animation.
 */
export default function removeAnimationStyle(requiredAnimationProperties: Pick<AnimationAuxiliaryObject, 'animationId' | 'valuesOfThePropertiesBeforeAnimating'> & {
    animation: AnimationInstance;
}): void;
