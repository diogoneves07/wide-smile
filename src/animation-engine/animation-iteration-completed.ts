import {
  LISTENERS_NAMES,
  propagateAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import animationCompleted from './animation-completed';
import getNewValuesForAnimationIntercalation from './get-new-values-for-animation-intercalation';
import insertAnimationInTheQueue from './insert-animation-in-the-queue';
import newAnimationIntercalation from './new-animation-intercalation';
import resetAnimationTimeProperties from './reset-animation-time-properties';
import getNewAnimationProgress from './get-new-animation-progress';

export default function animationIterationCompleted(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const a = animationAuxiliaryObject;
  const { animation } = a;
  let { backRunning } = a;
  let maxProgress = animation.max;

  const amountOfIterations = animation.loop;
  let iterationsCompleted = animation.count;

  let backRunningStopped = -1;

  a.propertiesToBeAnimate.forEach((obj) => {
    const o = obj;
    o.lastKey = undefined;
  });
  /**
   * Checks that the completion of the iteration was not an animation return action(methods: `go` and `back`).
   */
  if (!backRunning) {
    iterationsCompleted += 1;
  }
  animation.count = iterationsCompleted;

  if (
    amountOfIterations > iterationsCompleted ||
    amountOfIterations === Infinity ||
    amountOfIterations === true
  ) {
    if (backRunning) {
      backRunningStopped = animation.progressValue;
      backRunning = false;
      propagateAnimationEventListener(LISTENERS_NAMES[7], animation);
    }

    const animationProgressObject = getNewAnimationProgress(a);

    a.countDriveLoops = animationProgressObject.countDriveLoops;
    a.lastStartProgress = animationProgressObject.progress;

    maxProgress = animationProgressObject.maxProgress;

    propagateAnimationEventListener(LISTENERS_NAMES[7], animation);
    propagateAnimationEventListener(LISTENERS_NAMES[1], animation);

    resetAnimationTimeProperties(a);

    a.backRunning = backRunning;

    animation.max = maxProgress;
    animation.progressValue = animationProgressObject.progress;

    if (backRunningStopped > -1) {
      /**
       * Maintain the value of the last progress.
       */
      animation.progressValue = backRunningStopped;

      newAnimationIntercalation(a);
    } else {
      const newIntercalationObject = getNewValuesForAnimationIntercalation(a);

      Object.assign(a, newIntercalationObject.toAuxiliaryObject);
      animation.progressValue = newIntercalationObject.progress;
      insertAnimationInTheQueue(a);
    }
  } else {
    propagateAnimationEventListener(LISTENERS_NAMES[1], animation);
    animationCompleted(a);
  }
}
