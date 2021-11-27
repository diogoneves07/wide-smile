import { AnimationInstance } from './animation-instance-properties';
import EasingFunction from './easing-function';
export default interface ConcreteAnimationObject {
    startTimeOfTheIteration: number;
    initialProgress: number;
    animateProperties: {
        target: HTMLElement | object;
        index: number;
        originalArrayLength: number;
        keyframes: Record<string, unknown>;
        keyframesKeys: number[];
        propertyName: string;
        newPropertyValue?: string;
        lastKey?: number;
        type: 'attr' | 'css' | 'direct' | 'transform' | 'observed';
    }[];
    keyframesKeys: number[];
    reverseExecution: boolean;
    timeRunningIteration: number;
    backRunning: boolean;
    countDriveloop: number;
    dataLoadingState: 'loading' | 'load' | 'reload' | 'stoped';
    easing: EasingFunction;
    progress: AnimationInstance['progress'];
    maxProgress: number;
    startProgress: number;
    animationId: AnimationInstance['animationId'];
    animationAlreadyStarted: boolean;
    iterationInterlacations: {
        timeConsumed: number;
        completed: number;
        leftovers: number;
    };
    animationLoadingTime: number;
    remainingDelayAnimation: number;
    animationInstance: AnimationInstance;
    valuesOfThePropertiesBeforeAnimating: {
        direct: Record<string, string>;
        style: Record<string, string>;
        attr: Record<string, string | null>;
        transfromFns: Record<string, string>;
    }[];
    duration: AnimationInstance['dur'];
}
