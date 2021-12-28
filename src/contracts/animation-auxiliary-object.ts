import { AnimationInstance } from './animation-inter';
import EasingFunction from './easing-function';

export default interface AnimationAuxiliaryObject {
  startTimeOfTheIteration: number;

  initialProgress: number;

  propertiesToBeAnimate: {
    target: HTMLElement | object;
    index: number;
    originalArrayLength: number;
    keyframes: Record<string, unknown>;
    keyframesKeys: number[];
    propertyName: string;
    newPropertyValue?: unknown;
    lastKey?: number;
    type: 'attr' | 'css' | 'direct' | 'transform' | 'observed';
  }[];

  keyframesKeys: number[];

  reverseExecution: boolean;

  timeRunningIteration: number;

  backRunning: boolean;

  countDriveLoops: number;

  dataLoadingState: 'loading' | 'load' | 'reload' | 'stoped';

  easing: EasingFunction;

  lastStartProgress: number;

  animationId: AnimationInstance['animationId'];

  animationAlreadyStarted: boolean;

  iterationInterlacations: {
    timeConsumed: number;
    completed: number;
  };

  animationLoadingTime: number;

  remainingDelayAnimation: number;

  animation: AnimationInstance;

  valuesOfThePropertiesBeforeAnimating: {
    direct: Record<string, string>;
    style: Record<string, string>;
    attr: Record<string, string | null>;
    transfromFns: Record<string, string>;
  }[];

  duration: AnimationInstance['dur'];

  dateLastIntercalation: number;
}
