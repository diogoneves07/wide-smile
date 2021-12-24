import { ListenersEventsName } from './listeners-events-name';
import ValuesToAnimateProperty from './values-to-animate-property';
import AllAnimableProperties from './animable-properties';
import EasingsFunctionsList from './easings-functions-list';
import Keyframes from './key-frames';
import PropertiesToAnimateObject from './properties-to-animate-object';

/* eslint-disable import/no-cycle */
import { AnimationInstance, AnimationOptions } from './animation-inter';
import CurrentPropertyValue from './current-property-value';

/**
 * Structure, execute, and control animations.
 */

type PerformerFn = OverloadsForAnimationCreation &
  PerformerFnMethods & {
    $hidden: Required<PerformerFnProperties> & {
      ignorePerformer?: boolean;

      currentAfterIterations?: number;
      eventsCallbacks?: {
        [key: string]: [callbackPassed: Function, callbackEvent: Function][];
      };
    };

    /**
     * The function that created the animation instance.
     * @readonly
     */
    readonly creator: AnimationInstance['creator'];

    /**
     * @readonly
     */
    readonly id: number;
  };

export interface OverloadsForAnimationCreation {
  (
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty,
    parametersToAnimate?: AnimationOptions
  ): PerformerFn;

  (
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty,
    dur?: AnimationOptions['dur']
  ): PerformerFn;

  (
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty,
    autoDestroy?: true
  ): PerformerFn;

  (
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty[],
    autoDestroy?: true
  ): PerformerFn;

  (
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty[],
    parametersToAnimate?: AnimationOptions
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty[],
    parametersToAnimate?: AnimationOptions
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty[],
    autoDestroy?: true
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty,
    parametersToAnimate?: AnimationOptions
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty,
    dur?: AnimationOptions['dur']
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty,
    autoDestroy?: true
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty[],
    parametersToAnimate?: EasingsFunctionsList | AnimationOptions['dir']
  ): PerformerFn;

  (
    propertyName: string,
    propertyValue: ValuesToAnimateProperty,
    dirOrEasing?: EasingsFunctionsList | AnimationOptions['dir']
  ): PerformerFn;

  (
    animate: PropertiesToAnimateObject,
    parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions
  ): PerformerFn;

  (
    animate: ValuesToAnimateProperty[],
    parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions
  ): PerformerFn;

  (
    animate: Keyframes,
    parametersToAnimateOrDurOrAutoDestroy?:
      | AnimationOptions
      | AnimationOptions['dur']
      | true
      | EasingsFunctionsList
      | AnimationOptions['dir']
  ): PerformerFn;
}

export interface PerformerFnProperties extends AnimationOptions {
  animationInstances: AnimationInstance[];

  independentAnimations: AnimationInstance[];

  lastInstanceAdded?: AnimationOptions;

  orderOfThePropertiesUsed: string[];

  cycleOptions?: {
    loop: PerformerFnProperties['loop'];

    dir?: 'normal' | 'alternate';

    sequence?: AnimationInstance[][];

    sequenceRunning?: AnimationInstance[][];

    animationInstancesInCycle?: AnimationInstance[];

    loopDirection: 'normal' | 'reverse';

    countCompletedAnimations: number;

    numberOfAnimationsToComplete: number;

    countLoops: number;
  };

  removedFromTheCreator?: boolean;
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
    (
      animate: ValuesToAnimateProperty[],
      parametersToAnimateOrDurOrAutoDestroy?:
        | AnimationOptions
        | AnimationOptions['dur']
        | true
    ): PerformerFn;
  } & {
    (animate: ValuesToAnimateProperty): PerformerFn;
  };

  /**
   * Declars that instantly-created animations started to run after a certain number of interactions.
   */
  after(amountIterations?: number): PerformerFn;

  /**
   * Declars the creation of a cycle of animations.
   */
  cycle(
    loopOrDir?: PerformerFnProperties['loop'] | 'normal' | 'alternate',
    dir?: 'normal' | 'alternate'
  ): PerformerFn;

  /**
   * Loads each animation created by this function and performs them in the form they have been structured.
   */
  ready(): PerformerFn;

  /**
   * Sends the animations to the loading queue with high priority.
   */
  now(): PerformerFn;

  /**
   * Sets the value for the property immediately.
   */
  set(properties: PropertiesToAnimateObject): PerformerFn;

  set(
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty
  ): PerformerFn;

  set(
    propertyName: string,
    propertyValue: ValuesToAnimateProperty
  ): PerformerFn;

  set(
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty[]
  ): PerformerFn;

  set(
    propertyName: string,
    propertyValue: ValuesToAnimateProperty[]
  ): PerformerFn;

  /**
   * Gets the current value of the property.
   */
  get(propertyName: AllAnimableProperties): CurrentPropertyValue | undefined;

  get(propertyName: string): CurrentPropertyValue | undefined;

  /**
   * Load all animations(created by this) that have not yet been loaded.
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
  destroy(removeChanges?: true): PerformerFn;

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
  ): PerformerFn;

  on(
    this: PerformerFn,
    eventName: AllAnimableProperties,
    callbackfn: (
      this: PerformerFn,
      item: unknown,

      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): PerformerFn;

  on(
    this: PerformerFn,
    item: unknown,

    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => unknown
  ): PerformerFn;

  /**
   * Remove the listener from all animations(created by this).
   *
   * @param eventName
   * The name of the listener.
   *
   * @param callbackfn
   * The call-back or index
   */
  off(eventName: ListenersEventsName, callbackfn: Function): PerformerFn;

  off(eventName: string, callbackfn: Function | number): PerformerFn;

  off(
    eventName: AllAnimableProperties,
    callbackfn: Function | number
  ): PerformerFn;

  /**
   * Removes the property of the animations.
   */
  remove(...names: AllAnimableProperties[]): PerformerFn;
  remove(...names: string[]): PerformerFn;

  /**
   * Removes the target of the animations.
   */
  removeTarget(targets: AnimationOptions['targets']): PerformerFn;
}

export default PerformerFn;
