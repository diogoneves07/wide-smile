import { getAllAnimationAuxiliaryObjects } from '../animation-mount/crud-animation-objects';
import { AnimationInstance } from '../contracts/animation-inter';
import { ANIMATION_STATES } from '../sauce/constants';
import customForIn from '../utilities/custom-for-in';

const ANIMATIONS_PAUSED: AnimationInstance[] = [];
export default function handleVisibilityChange(): void {
  if (document.hidden) {
    customForIn(getAllAnimationAuxiliaryObjects(), (c) => {
      const animationInstance = c.animationInstance;
      if (
        animationInstance.state !== ANIMATION_STATES[3] &&
        animationInstance.pauseDocHidden
      ) {
        animationInstance.pause();
        ANIMATIONS_PAUSED.push(animationInstance);
      }
    });
  } else {
    ANIMATIONS_PAUSED.forEach((a) => {
      a.resume();
    });
    ANIMATIONS_PAUSED.length = 0;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
