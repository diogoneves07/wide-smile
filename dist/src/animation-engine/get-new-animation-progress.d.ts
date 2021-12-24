import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
export default function getNewAnimationProgress(animationAuxiliaryObject: Pick<AnimationAuxiliaryObject, 'countDriveLoops' | 'keyframesKeys' | 'lastStartProgress'> & {
    animation: Pick<AnimationInstance, 'dir' | 'count' | 'drive' | 'dur' | 'max' | 'progressValue'>;
}): Pick<AnimationAuxiliaryObject, 'countDriveLoops'> & {
    maxProgress: AnimationInstance['max'];
    progress: AnimationInstance['progressValue'];
};
