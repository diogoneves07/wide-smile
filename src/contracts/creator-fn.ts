import CreateObserverPropertyCallbackfn from './create-observer-property-callbackfn';
import CreateSpecialPropertyCallbackfn from './create-special-property-callbackfn';
import EasingFunction from './easing-function';

/* eslint-disable import/no-cycle */
import AnimationsPropotype from './animations-propotype';
import PerformerFn from './performer-fn';
import {
  AnimationOptions,
  AnimationInstance,
  UserAnimationOptions,
} from './animation-inter';

import EasingsFunctionsList from './easings-functions-list';
import AllAnimableProperties from './animable-properties';
import { ListenersEventsName } from './listeners-events-name';
import PropertiesToAnimateObject from './properties-to-animate-object';
import ValuesToAnimateProperty from './values-to-animate-property';
import CurrentPropertyValue from './current-property-value';

export interface CreatorFnMethods {
  /**
   * Play all animations(created by this) that have not yet been played.
   */
  play(): this;

  /**
   * Load all animations(created by this) that have not yet been loaded.
   */
  load(): this;

  /**
   * Loads each animation created by the **Performer* functions(created by this) and performs them in the form they have been structured.
   */
  ready(): this;

  /**
   * Pause all animations(created by this).
   */
  pause(): this;

  /**
   * Resumes all animations(created by this) that are paused.
   */
  resume(): this;

  /**
   * Restart all animations(created by this).
   */
  restart(): this;

  /**
   * Advances all the values of all animations(created by this) to your completion moment.
   */
  end(): this;

  /**
   * Force the animations(created by this) returns their progress to a certain point and end the iteration.
   */
  go(part: number): this;

  /**
   * Force the animations(created by this) returns their progress to a certain point and continues the iteration from it.
   */
  back(part: number): this;

  /**
   * Force the animations(created by this) to jump your progress to a certain point.
   */
  jump(part: number): this;

  /**
   * Reverts the progress achieved by the current iteration of all animations (created by this).
   */
  revert(endIteration?: boolean): this;

  /**
   * Controls the speed of execution of the current iteration of all animations (created by this).
   */
  speed(spd: number): this;

  /**
   * Defines a new value for the "dir" property of all animations (created by this).
   */
  dirTo(dir: Parameters<AnimationsPropotype['dirTo']>['0']): this;

  /**
   * Cancels all animations(created by this).
   */
  cancel(): this;

  /**
   * Destroys all animations(created by this).
   */
  destroy(): this;

  /**
   * Adds the listener to  all animations(created by this).
   *
   * @param eventName
   * The name of the listener.
   *
   * @param callbackfn
   * The call-back
   */
  on(
    eventName: ListenersEventsName,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): this;

  on(
    eventName: string,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): this;

  on(
    eventName: AllAnimableProperties,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => true | void | undefined | false
  ): this;

  /**
   * Remove the listener from all animations(created by this).
   *
   * @param eventName
   * The name of the listener.
   *
   * @param callbackfnUsed
   * The call-back or index
   */
  off(eventName: ListenersEventsName, callbackfn: Function | number): this;

  off(eventName: string, callbackfn: Function | number): this;

  off(eventName: AllAnimableProperties, callbackfn: Function | number): this;

  /**
   * Sends the animations to the loading queue with high priority.
   */
  now(): this;

  /**
   * Sets the value for the property immediately.
   */
  set(properties: PropertiesToAnimateObject): this;

  set(
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty
  ): this;

  set(propertyName: string, propertyValue: ValuesToAnimateProperty): this;

  set(
    propertyName: AllAnimableProperties,
    propertyValue: ValuesToAnimateProperty[]
  ): this;

  set(propertyName: string, propertyValue: ValuesToAnimateProperty[]): this;

  /**
   * Removes the property of the animations.
   */
  remove(...names: AllAnimableProperties[]): this;
  remove(...names: string[]): this;

  /**
   * Removes the target of the animations.
   */
  removeTarget(targets: AnimationOptions['targets']): this;

  /**
   * Gets the current value of the property.
   */
  get(propertyName: AllAnimableProperties): CurrentPropertyValue[];

  get(propertyName: string): CurrentPropertyValue[];
}

export interface CreatorFnProperties {
  /**
   * The default values of the properties of the animation objects.
   */
  dfs: AnimationOptions;

  performers: PerformerFn[];

  /**
   * An object shared by all instances of the function( CreatorFn ).
   */
  global: {
    asyncLoading: boolean;

    /**
     * Create a new instance of the function( CreatorFn ).
     */
    'new'(): CreatorFn;

    /**
     * The current version of the library.
     */
    readonly version: string;

    /**
     * All the special properties created.
     */
    readonly specials: Record<string, CreateSpecialPropertyCallbackfn>;

    /**
     * All the observers properties created.
     */
    readonly observeds: Record<string, CreateObserverPropertyCallbackfn>;

    /**
     * All the instances of the functions( CreatorFn ) created.
     */
    readonly all: PerformerFn['creator'][];

    newEasing(name: string, callback: EasingFunction): CreatorFn['global'];

    /**
     * Create or replace a special property.
     *
     * @param property
     * The name of the property.
     *
     * @param callbackfn
     * The function responsible for the property.
     */
    newSpecialProperty(
      property: string,
      callbackfn?: CreateSpecialPropertyCallbackfn
    ): CreatorFn['global'];

    /**
     * Create or replace a special properties.
     *
     * @param properties
     * An object containing the name of the new properties pointing to the function responsible for the property.
     */
    newSpecialProperty(
      properties: Record<string, CreateSpecialPropertyCallbackfn>
    ): CreatorFn['global'];

    /**
     * Removes special properties.
     */
    deleteSpecialProperty(...propertiesNames: string[]): CreatorFn['global'];

    /**
     * Create or replace a observer property.
     *
     * @param property
     * The name of the property.
     *
     * @param callbackfn
     * The function responsible for the property.
     */
    newObservedProperty(
      property: string,
      callbackfn?: CreateObserverPropertyCallbackfn
    ): CreatorFn['global'];

    /**
     * Create or replace a observers properties.
     *
     * @param properties
     * An object containing the name of the new properties pointing to the function responsible for the property.
     */
    newObservedProperty(
      properties: Record<string, CreateObserverPropertyCallbackfn>
    ): CreatorFn['global'];

    /**
     * Removes observer properties.
     */
    deleteObservedProperty(...propertiesNames: string[]): CreatorFn['global'];
  };
}

/**
 * Create and control the Performer functions.
 */
type CreatorFn = CreatorFnProperties &
  CreatorFnMethods & {
    (): CreatorFn['global'];

    (
      performerProperties: UserAnimationOptions | object | string,
      ...props: (
        | EasingsFunctionsList
        | AnimationInstance['dir']
        | number
        | boolean
        | UserAnimationOptions
      )[]
    ): PerformerFn;
  };
export default CreatorFn;
