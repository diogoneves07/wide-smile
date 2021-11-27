import { ListenersEventsName } from './listeners-events-name';
import ValuesToAnimateProperty from './values-to-animate-property';
import AnimableProperties from './animable-properties';
import EasingsFunctionsList from './easings-functions-list';
import Keyframes from './key-frames';
import PropertiesToAnimateObject from './properties-to-animate-object';
import { AnimationInstance, AnimationOptions } from './animation-inter';
declare type PerformerFn = OverloadsForAnimationCreation & PerformerFnMethods & {
    $hidden: Required<PerformerFnProperties> & {
        currentWait?: number;
    };
    /**
     * The function that created the animation instance.
     * @readonly
     */
    readonly creator: AnimationInstance['creator'];
};
export interface OverloadsForAnimationCreation {
    (iterations: number): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, parametersToAnimate?: AnimationOptions): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, dur?: AnimationOptions['dur']): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, autoDestroy?: true): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty[], autoDestroy?: true): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty[], parametersToAnimate?: AnimationOptions): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, parametersToAnimate?: AnimationOptions): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, dur?: AnimationOptions['dur']): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, autoDestroy?: true): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty[], parametersToAnimate?: EasingsFunctionsList | AnimationOptions['dir']): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, dirOrEasing?: EasingsFunctionsList | AnimationOptions['dir']): this;
    (animate: PropertiesToAnimateObject, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions): this;
    (animate: ValuesToAnimateProperty[], parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions): this;
    (animate: Keyframes, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true | EasingsFunctionsList | AnimationOptions['dir']): this;
}
export interface PerformerFnProperties extends AnimationOptions {
    animationInstances: AnimationInstance[];
    independentAnimations: AnimationInstance[];
    lastInstanceAdded?: AnimationOptions;
    index?: number;
    propertiesUsed: string[];
    cycleOptions?: {
        loop: PerformerFnProperties['loop'];
        dir?: 'normal' | 'alternate';
        sequence?: AnimationInstance[][];
        animationInstancesInCycle?: AnimationInstance[];
        loopDirection: 'normal' | 'reverse';
        countCompleteAnimations: number;
        numberOfAnimationsToComplete: number;
        countLoops: number;
    };
}
export interface PerformerFnMethods {
    $: OverloadsForAnimationCreation;
    _: OverloadsForAnimationCreation;
    to: OverloadsForAnimationCreation & {
        (animate: ValuesToAnimateProperty[], parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true): PerformerFn;
    } & {
        (animate: ValuesToAnimateProperty): PerformerFn;
    };
    wait(iteratios: number): PerformerFn;
    cycle(loopOrDir?: PerformerFnProperties['loop'] | 'normal' | 'alternate', dir?: 'normal' | 'alternate'): PerformerFn;
    ready(): PerformerFn;
    load(): PerformerFn;
    play(): PerformerFn;
    pause(): PerformerFn;
    resume(): PerformerFn;
    restart(): PerformerFn;
    go(part: number): PerformerFn;
    back(part: number): PerformerFn;
    jump(part: number): PerformerFn;
    speed(spd: number): PerformerFn;
    revert(endIteration?: boolean): PerformerFn;
    dirTo(dir: Parameters<AnimationInstance['dirTo']>['0']): PerformerFn;
    cancel(): PerformerFn;
    destroy(): boolean;
    end(): PerformerFn;
    on(this: PerformerFn, eventName: ListenersEventsName, callbackfn: (this: AnimationInstance, eventName: string, animationInstance: AnimationInstance) => unknown): PerformerFn;
    off(typeOfListener: ListenersEventsName, callbackfnOrIndex: Function | number): PerformerFn;
}
export default PerformerFn;
