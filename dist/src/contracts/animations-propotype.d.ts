import { ListenersEventsName } from './listeners-events-name';
export default interface AnimationsPropotype {
    /**
     * Load the animation.
     */
    load(): this;
    /**
     * Play the animation.
     */
    play(): this;
    /**
     * Pause the animation.
     */
    pause(): this;
    /**
     * Resumes the animation that was paused.
     */
    resume(): this;
    /**
     * Restart animation.
     */
    restart(): this;
    /**
     * Cancel this animation.
     */
    cancel(): this;
    /**
     * Destroy this animation.
     */
    destroy(removeChanges?: true): boolean;
    /**
     * Advances all animation values to your completion moment.
     */
    end(): this;
    /**
     * Makes the animation return its current progress to a given point and terminates the iteration.
     */
    go(part: number): this;
    /**
     * Makes the animation return its current progress to a certain point and continues the iteration from it.
     */
    back(part: number): this;
    /**
     * Makes the animation jump its progress to a determined point.
     */
    jump(part: number): this;
    /**
     * Controls the speed of execution of the current iteration.
     */
    speed(multiply: number): this;
    /**
     * Reverts the progress achieved by the current iteration.
     */
    revert(endIteration?: boolean): this;
    /**
     * Defines a new value for the "dir" property.
     */
    dirTo(dir: ('normal' | 0) | ('reverse' | 1) | ('alternate' | 2) | ('alternate-reverse' | 3)): this;
    /**
     * Adds the listener to animation.
     *
     * @param typeOfListener
     * The name of the listener.
     *
     * @param callbackfn
     * The call-back
     */
    on(typeOfListener: ListenersEventsName, callbackfn: (this: this, typeOfListener: string, animation: this) => unknown): this;
    /**
     * Remove animation listener.
     *
     * @param typeOfListener
     * The name of the listener.
     *
     * @param callbackfnOrIndex
     * The call-back or index
     */
    off(typeOfListener: ListenersEventsName, callbackfnOrIndex: Function | number): this;
}
