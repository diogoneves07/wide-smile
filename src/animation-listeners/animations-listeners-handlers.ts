import { AnimationInstance } from '../contracts/animation-inter';
import toCSSKebabCase from '../utilities-style/to-css-kebab-case';
import { toCamelCase, trimString } from '../utilities/handle-string';

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
  '$-end-animation-in-cycle',
  'progressValue'
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
  'progressValue',
];

export function addAnimationEventListener(
  name: string,
  callbackfn: Function,
  animationInstance: AnimationInstance
): void {
  const { animationId } = animationInstance;
  if (!EVENTS_IN_OBSERVATION[animationId]) {
    EVENTS_IN_OBSERVATION[animationId] = {};
  }
  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];
  const eName = trimString(name);
  if (eName) {
    if (animationObjectBuket[eName]) {
      animationObjectBuket[eName].push(callbackfn);
    } else {
      animationObjectBuket[eName] = [callbackfn];
    }
  }
}

export function removeAnimationEventListener(
  name: string,
  callbackfnOrIndex: Function | number,
  animationInstance: AnimationInstance
): void {
  const animationId = animationInstance.animationId;

  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return;
  }

  const animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];

  const eName = trimString(name);
  if (eName && animationObjectBuket[eName]) {
    if (typeof callbackfnOrIndex === 'number') {
      animationObjectBuket[eName].splice(callbackfnOrIndex, 1);
    } else {
      const index = animationObjectBuket[eName].indexOf(callbackfnOrIndex);

      if (index >= 0) {
        animationObjectBuket[eName].splice(index, 1);
      }
    }
  }
}

export function removeAllAnimationEventListeners(animationId: number): void {
  delete EVENTS_IN_OBSERVATION[animationId];
}

export function propagateAnimationEventListener(
  name: string,
  animationInstance: AnimationInstance,
  callbackfn?: (
    callbackfn: Function,
    animationInstance: AnimationInstance
  ) => void
): void {
  let eventName = trimString(name);
  let eventBucket: typeof EVENTS_IN_OBSERVATION[string][string];
  const { animationId } = animationInstance;
  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return;
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

  if (eventBucket) {
    // Copy the array to avoid side effects of the methods.
    eventBucket.slice().forEach((v) => {
      if (callbackfn) {
        callbackfn(v, animationInstance);
      } else {
        v.call(animationInstance.performer, animationInstance.performer);
      }
    });
  }
}

export function updateListenersAnimationId(
  lastAnimationId: number,
  newAnimationId: number
): void {
  const animationObjectBuket = EVENTS_IN_OBSERVATION[lastAnimationId];
  EVENTS_IN_OBSERVATION[newAnimationId] = animationObjectBuket;

  delete EVENTS_IN_OBSERVATION[lastAnimationId];
}
