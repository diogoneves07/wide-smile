import { ListenersEventsName } from './listeners-events-name';
import ValuesToAnimateProperty from './values-to-animate-property';
import AllAnimableProperties from './animable-properties';
import EasingsFunctionsList from './easings-functions-list';
import Keyframes from './key-frames';
import PropertiesToAnimateObject from './properties-to-animate-object';
import { AnimationInstance, AnimationOptions } from './animation-inter';
declare type PerformerFn = OverloadsForAnimationCreation & PerformerFnMethods & {
    $hidden: Required<PerformerFnProperties> & {
        currentAfterIterations?: number;
    };
    /**
     * The function that created the animation instance.
     * @readonly
     */
    readonly creator: AnimationInstance['creator'];
};
export interface OverloadsForAnimationCreation {
    (iterations: number): this;
    (propertyName: AllAnimableProperties, propertyValue: ValuesToAnimateProperty, parametersToAnimate?: AnimationOptions): this;
    (propertyName: AllAnimableProperties, propertyValue: ValuesToAnimateProperty, dur?: AnimationOptions['dur']): this;
    (propertyName: AllAnimableProperties, propertyValue: ValuesToAnimateProperty, autoDestroy?: true): this;
    (propertyName: AllAnimableProperties, propertyValue: ValuesToAnimateProperty[], autoDestroy?: true): this;
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
    /**
     * Creates an independent animation.
     */
    $: OverloadsForAnimationCreation;
    /**
     * Creates an animation that playing after the previous.
     */
    _: OverloadsForAnimationCreation;
    /**
     * Declars the values to be achieved by the animation.
     */
    to: OverloadsForAnimationCreation & {
        (animate: ValuesToAnimateProperty[], parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true): PerformerFn;
    } & {
        (animate: ValuesToAnimateProperty): PerformerFn;
    };
    /**
     * Declars that instantly-created animations started to run after a certain number of interactions.
     */
    after(iteratios: number): PerformerFn;
    /**
     * Declars the creation of a cycle of animations.
     */
    cycle(loopOrDir?: PerformerFnProperties['loop'] | 'normal' | 'alternate', dir?: 'normal' | 'alternate'): PerformerFn;
    /**
     * Loads each animation created by this function and performs them in the form they have been structured.
     */
    ready(): PerformerFn;
    /**
     * Play all animations(created by this) that have not yet been played.
     */
    load(): PerformerFn;
    /**
     * Play all animations(created by this) that have not yet been played.
     */
    play(): PerformerFn;
    /**
     * Pause all animations(created by this).
     */
    pause(): PerformerFn;
    /**
     * Resumes all animations(created by this) that are paused.
     */
    resume(): PerformerFn;
    /**
     * Restart all animations(created by this).
     */
    restart(): PerformerFn;
    /**
     * Cancels all animations(created by this).
     */
    cancel(): PerformerFn;
    /**
     * Destroys all animations(created by this).
     */
    destroy(): boolean;
    /**
     * Advances all the values of all animations(created by this) to your completion moment.
     */
    end(): PerformerFn;
    /**
     * Force the animations(created by this) returns their progress to a certain point and end the iteration.
     */
    go(part: number): PerformerFn;
    /**
     * Force the animations(created by this) returns their progress to a certain point and continues the iteration from it.
     */
    back(part: number): PerformerFn;
    /**
     * Force the animations(created by this) to jump your progress to a certain point.
     */
    jump(part: number): PerformerFn;
    /**
     * Controls the speed of execution of the current iteration of all animations (created by this).
     */
    speed(spd: number): PerformerFn;
    /**
     * Reverts the progress achieved by the current iteration of all animations (created by this).
     */
    revert(endIteration?: boolean): PerformerFn;
    /**
     * Defines a new value for the "dir" property of all animations (created by this).
     */
    dirTo(dir: Parameters<AnimationInstance['dirTo']>['0']): PerformerFn;
    /**
     * Adds the listener to all animations(created by this).
     *
     * @param typeOfListener
     * The name of the listener.
     *
     * @param callbackfn
     * The call-back
     */
    on(this: PerformerFn, eventName: ListenersEventsName, callbackfn: (this: AnimationInstance, eventName: string, animation: AnimationInstance) => unknown): PerformerFn;
    /**
     * Remove the listener from all animations(created by this).
     *
     * @param typeOfListener
     * The name of the listener.
     *
     * @param callbackfnOrIndex
     * The call-back or index
     */
    off(typeOfListener: ListenersEventsName, callbackfnOrIndex: Function | number): PerformerFn;
}
export default PerformerFn;
