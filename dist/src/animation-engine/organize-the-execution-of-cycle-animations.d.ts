import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
export declare function checkAmountOfAnimationsCompletedInCycle(cycleOptions: PerformerFn['$hidden']['cycleOptions']): void;
export default function organizeTheExecutionOfCycleAnimations(animationPerformer: PerformerFn, animation: AnimationInstance, instanceToLink?: AnimationInstance, typeOfLink?: 'afterAnimation' | 'together'): void;
