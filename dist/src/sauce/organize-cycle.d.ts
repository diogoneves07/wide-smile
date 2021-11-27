import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
export declare function repeatCycleExecution(cycleOptions: PerformerFn['$hidden']['cycleOptions']): void;
export declare function organizeCycleSequence(animationPerformer: PerformerFn, animationInstance: AnimationInstance, instanceToLink?: AnimationInstance, typeOfLink?: 'after' | 'together'): void;
