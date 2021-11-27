import FunctionForPropertyValueInKeyframe from './function-for-property-value-in-keyframe';
import TargetsAnimationProperty from './Targets-animation-property';
import AllNormalObject from './all-normal-objects';
import EasingFunction from './easing-function';
import EasingsFunctionsList from './easings-functions-list';
declare type DriveAnimationProperty = number | 'normal' | 'random-keys' | 'random-offset' | 'fluid-random-keys' | 'fluid-random-offset';
export interface UserAnimationOptions {
    /**
     * The targets that will suffer with the execution of the animation.
     */
    targets?: HTMLElement | string | (HTMLElement | AllNormalObject | string)[] | AllNormalObject;
    /**
     * Defines how the animation should play.
     *
     * The default value is "normal".
     */
    dir?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    /**
     * Defines the number of times an animation cycle is played.
     *
     * The default value is 1.
     */
    loop?: number | true;
    /**
     * Defines the time that an animation takes to end one cycle.
     *
     * The default value is 1.
     */
    dur?: number;
    /**
     * Describes how the animation will progress over one cycle of its duration.
     *
     * The default value is "linear".
     */
    easing?: EasingsFunctionsList | EasingFunction;
    /**
     * Gets or defines the animation's progress.
     *
     * The default value is undefined. And throughout the animation is changed in real time.
     */
    /**
     * Defines a interval at the beginning of each animation cycle, and only after that interval the animation begins to run the next cycle.
     *
     * The default value is 0.
     */
    delay?: number;
    /**
     * Defines a intervalo out at the end of each animation cycle, and only after that interval the animation begins to run the next cycle.
     *
     * The default value is 0.
     */
    endDelay?: number;
    /**
     * The amount of cycles that animation has already completed.
     *
     * The default value is 0.
     * @readonly
     */
    /**
     * Control how far the animation cycles should go.
     */
    drive?: DriveAnimationProperty[] | (number[] | DriveAnimationProperty)[] | DriveAnimationProperty | string | ((target: HTMLElement | AllNormalObject, index: number, length: number) => DriveAnimationProperty);
    /**
     * Defines whether animation should be destroyed when it is completed.
     *
     * The default value is false.
     */
    autoDestroy?: boolean;
    autoPlay?: boolean;
    pauseDocHidden?: boolean;
    round?: number;
}
declare type AnimationOptions = Omit<UserAnimationOptions, 'loop' | 'dur' | 'delay' | 'endDelay' | 'targets'> & {
    targets?: TargetsAnimationProperty;
    loop?: UserAnimationOptions['loop'] | FunctionForPropertyValueInKeyframe | string;
    dur?: UserAnimationOptions['dur'] | FunctionForPropertyValueInKeyframe | string;
    delay?: UserAnimationOptions['delay'] | FunctionForPropertyValueInKeyframe | string;
    endDelay?: UserAnimationOptions['endDelay'] | FunctionForPropertyValueInKeyframe | string;
};
export default AnimationOptions;
