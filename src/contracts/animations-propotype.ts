import AllAnimableProperties from './animable-properties';
import { ListenersEventsName } from './listeners-events-name';
/* eslint-disable import/no-cycle */
import PerformerFn from './performer-fn';
import { AnimationOptions } from './animation-inter';

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
   * Do the animation return its current progress to a given point and terminates the iteration.
   */
  go(part: number): this;

  /**
   * Do the animation return its current progress to a certain point and continues the iteration from it.
   */
  back(part: number): this;

  /**
   * Do the animation jump its progress to a determined point.
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
  dirTo(
    dir:
      | ('normal' | 0)
      | ('reverse' | 1)
      | ('alternate' | 2)
      | ('alternate-reverse' | 3)
  ): this;

  /**
   * Adds the listener to animation.
   *
   * @param eventName
   * The name of the listener.
   *
   * @param callbackfn
   * The call-back
   */
  on(
    this: PerformerFn,
    eventName: string,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): this;

  on(
    this: PerformerFn,
    eventName: AllAnimableProperties,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): this;

  on(
    item: unknown,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => unknown
  ): this;

  /**
   * Remove animation listener.
   *
   * @param eventName
   * The name of the listener.
   *
   * @param callbackfnUsed
   * The call-back or index
   */
  off(eventName: ListenersEventsName, callbackfn: Function): this;

  off(eventName: string, callbackfn: Function | number): this;

  off(eventName: AllAnimableProperties, callbackfn: Function | number): this;

  /**
   * Removes the property of the animations.
   */
  remove(...names: (AllAnimableProperties | string)[]): this;
  remove(...names: AllAnimableProperties[]): this;
  remove(...names: string[]): this;

  /**
   * Removes the target of the animations.
   */
  removeTarget(targets: AnimationOptions['targets']): this;
}
