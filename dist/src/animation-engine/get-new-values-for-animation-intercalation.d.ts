import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
export default function getNewValuesForAnimationIntercalation(requiredAnimationProperties: Pick<AnimationAuxiliaryObject, 'iterationInterlacations' | 'startTimeOfTheIteration' | 'reverseExecution' | 'timeRunningIteration'> & {
    animation: Pick<AnimationInstance, 'dur' | 'delay' | 'progressValue' | 'max'>;
}): {
    toAuxiliaryObject: Pick<AnimationAuxiliaryObject, 'iterationInterlacations' | 'startTimeOfTheIteration' | 'reverseExecution' | 'timeRunningIteration'>;
    progress: number;
};
