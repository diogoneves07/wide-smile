import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Defines the direction of the animation iteration.
 */
export default function setAnimationProgress(animationAuxiliaryObject: Pick<AnimationAuxiliaryObject, 'countDriveloop' | 'keyframesKeys' | 'lastStartProgress'> & {
    animation: Pick<AnimationInstance, 'dir' | 'count' | 'drive' | 'dur' | 'max' | 'progressValue'>;
}): Pick<AnimationAuxiliaryObject, 'countDriveloop'> & {
    maxProgress: AnimationInstance['max'];
    progress: AnimationInstance['progressValue'];
};
