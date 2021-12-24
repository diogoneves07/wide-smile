import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { ANIMATION_STATES } from '../sauce/constants';
import getTimeNow from '../utilities/get-time-now';
import resetAnimationTimeProperties from './reset-animation-time-properties';

let ANIMATIONS_DELAY: {
  animationAuxiliaryObject: AnimationAuxiliaryObject;
  delay: number;
  startTime: number;
  callbackDelayCompleted: (a: AnimationAuxiliaryObject) => void;
}[] = [];

let timeoutId: number | NodeJS.Timeout | undefined;

function processAnimationsDelays() {
  timeoutId = setInterval(() => {
    if (ANIMATIONS_DELAY.length === 0) {
      clearInterval(timeoutId as number);
      timeoutId = undefined;
      return;
    }
    ANIMATIONS_DELAY = ANIMATIONS_DELAY.filter((values) => {
      const v = values;
      const c = getTimeNow() - v.startTime;
      const state = v.animationAuxiliaryObject.animation.state;
      if (state === ANIMATION_STATES[1]) {
        if (c >= v.delay) {
          v.animationAuxiliaryObject.remainingDelayAnimation = v.delay - c;
          resetAnimationTimeProperties(v.animationAuxiliaryObject);
          v.animationAuxiliaryObject.remainingDelayAnimation = 0;

          v.callbackDelayCompleted(v.animationAuxiliaryObject);
          return false;
        }
      }

      if (state === ANIMATION_STATES[7] || state === ANIMATION_STATES[4]) {
        return false;
      }

      return true;
    });
  }, 0);
}

export default function manageAnimationsDelay(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  delay: number,
  startTime: number,
  callbackDelayCompleted: (a: AnimationAuxiliaryObject) => void
): void {
  ANIMATIONS_DELAY.push({
    animationAuxiliaryObject,
    delay,
    startTime,
    callbackDelayCompleted,
  });
  if (!timeoutId) {
    processAnimationsDelays();
  }
}
