import AllAnimableProperties from '../contracts/animable-properties';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { AnimationInstance } from '../contracts/animation-inter';
import CurrentPropertyValue from '../contracts/current-property-value';
import toCSSKebabCase from '../utilities-style/to-css-kebab-case';
import customForIn from '../utilities/custom-for-in';
import { toCamelCase, trimString } from '../utilities/handle-string';
import toMs from '../utilities/to-ms';

const EVENTS_IN_OBSERVATION: Record<string, Record<string, Function[]>> = {};

export const LISTENERS_NAMES: [
  'start',
  'loopEnd',
  'end',
  'load',
  'cancel',
  'destroy',
  'play',
  '$-iteration-control-methods',
  'ready',
  'change',
  'loopStart',
  '$-end-animation-in-cycle'
] = [
  'start',
  'loopEnd',
  'end',
  'load',
  'cancel',
  'destroy',
  'play',
  '$-iteration-control-methods',
  'ready',
  'change',
  'loopStart',
  '$-end-animation-in-cycle',
];

export function addAnimationEventListener(
  name: string | AllAnimableProperties,
  callback: Function,
  animation: AnimationInstance
): void {
  const { animationId } = animation;
  if (!EVENTS_IN_OBSERVATION[animationId]) {
    EVENTS_IN_OBSERVATION[animationId] = {};
  }

  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];
  const eName = trimString(name.toString());
  if (eName) {
    if (animationObjectBuket[eName]) {
      animationObjectBuket[eName].push(callback);
    } else {
      animationObjectBuket[eName] = [callback];
    }
  }
}

export function removeAnimationEventListener(
  name: typeof LISTENERS_NAMES[number] | AllAnimableProperties | string,
  callbackfnUsed: Function,
  animation: AnimationInstance
): void {
  const animationId = animation.animationId;
  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return;
  }

  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];

  const eName = trimString(name.toString());
  if (eName && animationObjectBuket[eName]) {
    const index = animationObjectBuket[eName].indexOf(callbackfnUsed);
    if (index >= 0) {
      animationObjectBuket[eName].splice(index, 1);
    }
  }
}

export function removeAllAnimationEventListeners(animationId: number): void {
  delete EVENTS_IN_OBSERVATION[animationId];
}

function getBucket(name: string, animationId: number) {
  let eventName = trimString(name);
  let eventBucket: typeof EVENTS_IN_OBSERVATION[string][string];

  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return false;
  }
  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];

  if (animationObjectBuket[eventName]) {
    eventBucket = animationObjectBuket[eventName];
  } else if (animationObjectBuket[toCamelCase(eventName)]) {
    eventName = toCamelCase(eventName);
    eventBucket = animationObjectBuket[eventName];
  } else {
    eventName = toCSSKebabCase(eventName);
    eventBucket = animationObjectBuket[eventName];
  }

  return { eventBucket, eventName };
}
export function propagateAnimationPropertyEventListener(
  name: string,
  animation: AnimationInstance,
  propertyObject: AnimationAuxiliaryObject['propertiesToBeAnimate'][number]
): boolean {
  const bucket = getBucket(name, animation.animationId);
  let allowedToApplyStyle: boolean | undefined;

  if (bucket && bucket.eventBucket) {
    const eventBucket = bucket.eventBucket;

    // Copy the array to avoid side effects of the methods.
    eventBucket.slice().forEach((eventCallback) => {
      allowedToApplyStyle = eventCallback.call(
        animation.performer,
        {
          propertyName: propertyObject.propertyName,
          value: propertyObject.newPropertyValue,
          target: propertyObject.target,
        } as CurrentPropertyValue,
        animation.performer
      ) as boolean | undefined;
    });
  }
  if (allowedToApplyStyle !== false) {
    allowedToApplyStyle = true;
  }
  return allowedToApplyStyle;
}

export function propagateAnimationExecutionTimeEventListener(
  animationExecutionTime: number,
  animation: AnimationInstance
): void {
  const animationId = animation.animationId;
  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return;
  }
  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];
  customForIn(animationObjectBuket, (eventBucket, eventName) => {
    const check = parseFloat(eventName);
    if (!Number.isNaN(check)) {
      if (animationExecutionTime >= toMs(check)) {
        eventBucket.slice().forEach((eventCallback) => {
          eventCallback.call(
            animation.performer,
            eventName,
            animation.performer
          );
          removeAnimationEventListener(eventName, eventCallback, animation);
        });
      }
    }
  });
}
export function propagateAnimationEventListener(
  name: typeof LISTENERS_NAMES[number] | number,
  animation: AnimationInstance,
  useSpecialCallback?: (
    eventCallback: Function,
    animation: AnimationInstance
  ) => unknown
): void {
  const bucket = getBucket(name.toString(), animation.animationId);

  if (bucket && bucket.eventBucket) {
    const { eventBucket, eventName } = bucket;

    // Copy the array to avoid side effects of the methods.
    eventBucket.slice().forEach((eventCallback) => {
      if (useSpecialCallback) {
        useSpecialCallback(eventCallback, animation);
      } else {
        eventCallback.call(animation.performer, eventName, animation.performer);
      }
    });
  }
}
