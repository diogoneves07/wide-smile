import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Defines the direction of the animation iteration.
 */
export default function setAnimationProgress(animationAuxiliaryObject: Pick<AnimationAuxiliaryObject, 'countDriveloop' | 'progress' | 'keyframesKeys' | 'lastStartProgress'> & {
    animationInstance: Pick<AnimationInstance, 'dir' | 'count' | 'drive' | 'dur' | 'max'>;
}): Pick<AnimationAuxiliaryObject, 'countDriveloop' | 'progress'> & {
    maxProgress: AnimationInstance['max'];
};
