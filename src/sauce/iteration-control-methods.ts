import progressAnimationGoTo from '../animation-actions/progress-animation-go-to';
import {
  addAnimationEventListener,
  LISTENERS_NAMES,
  removeAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import { AnimationInstance } from '../contracts/animation-inter';
import { MAX_KEYFRAME } from './constants';

export default function iterationControlMethods(
  realDuration: number,
  newDuration: number | undefined,
  part: number,
  animationInstance: AnimationInstance,
  applyDelay?: boolean
): void {
  const aInstance = animationInstance;
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    aInstance.animationId
  );

  const toProgress = (MAX_KEYFRAME / 1) * Math.min(Math.max(part, 0), 1);

  if (animationAuxiliaryObject) {
    let dur = newDuration as number;
    const checkDur = typeof dur === 'number';
    const offset = Math.abs(aInstance.progressValue - toProgress);

    if (checkDur && dur > 0) {
      const c = 100 / offset;
      dur *= c + (c / 100) * (100 / (100 - offset) - 1);
    }

    addAnimationEventListener(
      LISTENERS_NAMES[7],
      function a(this: AnimationInstance) {
        if (dur === animationInstance.dur) {
          aInstance.dur = realDuration;
        }
        removeAnimationEventListener(LISTENERS_NAMES[7], a, animationInstance);
      },
      animationInstance
    );

    if (checkDur && dur <= 0) {
      aInstance.jump(toProgress);
    } else {
      if (checkDur) {
        aInstance.dur = dur;
      }
      progressAnimationGoTo(aInstance.animationId, toProgress, applyDelay);
    }
  }
}
