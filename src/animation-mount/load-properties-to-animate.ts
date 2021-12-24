import { hasAnimationInTheStack } from '../animation-engine/mount-animations-stack';
import {
  ANIMATION_STATES,
  TIME_OUT_FOR_SMART_LOADING,
} from '../sauce/constants';
import { getCustomProperty } from '../sauce/custom-properties-for-animations';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import getTimeNow from '../utilities/get-time-now';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
import customForIn from '../utilities/custom-for-in';
import getPropertiesToBeAnimated from './get-properties-to-be-animated';

/* eslint-disable @typescript-eslint/no-use-before-define  */

type PropertyObject = AnimationAuxiliaryObject['propertiesToBeAnimate'][number];

const ANIMATIONS_FOR_LOAD: Parameters<typeof loadPropertiesToAnimate>[] = [];
let IS_BUSY_LOADER = false;
const loadNextAnimation = (a?: typeof ANIMATIONS_FOR_LOAD[number]) => {
  if (a) {
    loadPropertiesToAnimate(...a);
  }
};
export default function loadPropertiesToAnimate(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  props: PropertiesToAnimateObjectKeyframes,
  callbackLoaded: (
    result: boolean,
    propertiesToAnimate: PropertyObject[]
  ) => void
): void {
  const { animation } = animationAuxiliaryObject;
  const targets = animation.targets;
  if (animation.creator.global.asyncLoading) {
    IS_BUSY_LOADER = false;
  }

  /**
   * There's an animation currently loading.
   */
  if (IS_BUSY_LOADER && !animation.skip) {
    ANIMATIONS_FOR_LOAD.push([animationAuxiliaryObject, props, callbackLoaded]);

    return;
  }

  IS_BUSY_LOADER = true;

  const length = targets.length;
  const properties = { ...props };
  const specials = (() => {
    const o: typeof properties = {};
    customForIn(properties, (propertyValue, propertyName) => {
      if (getCustomProperty(propertyName as string, 'special')) {
        o[propertyName] = propertyValue as never;
      }
    });
    return o;
  })();

  let propertiesToBeAnimate: PropertyObject[] = [];

  let count = 0;
  let startTime = getTimeNow();

  let releaseTheExecutionStack = false;

  (function repeat() {
    propertiesToBeAnimate = propertiesToBeAnimate.concat(
      getPropertiesToBeAnimated(targets[count], properties, specials)
    );
    const timePassed = getTimeNow() - startTime;

    count += 1;

    switch (animation.state) {
      case ANIMATION_STATES[2]:
      case ANIMATION_STATES[3]:
      case ANIMATION_STATES[4]:
      case ANIMATION_STATES[7]:
        IS_BUSY_LOADER = false;
        callbackLoaded(false, propertiesToBeAnimate);
        loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        return;
      default:
        if (count < length) {
          if (
            animation.skip ||
            (!releaseTheExecutionStack && !hasAnimationInTheStack()) ||
            timePassed < TIME_OUT_FOR_SMART_LOADING
          ) {
            releaseTheExecutionStack = true;
            repeat();
          } else {
            releaseTheExecutionStack = false;
            startTime = getTimeNow();
            const setTimeoutId = setTimeout(() => {
              clearTimeout(setTimeoutId);
              repeat();
            }, 0);
          }
        } else {
          IS_BUSY_LOADER = false;
          callbackLoaded(true, propertiesToBeAnimate);
          loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        }
        break;
    }
  })();
}
