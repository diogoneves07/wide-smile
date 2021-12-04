import {
  addAnimationEventListener,
  LISTENERS_NAMES,
} from '../animation-listeners/animations-listeners-handlers';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';

import { ANIMATION_STATES, MAX_KEYFRAME } from './constants';
import iterationControlMethods from './iteration-control-methods';

function revertAnimationProgress(animation: AnimationInstance) {
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );

  if (animationAuxiliaryObject) {
    const lastStartProgress = animationAuxiliaryObject.lastStartProgress || 0;
    iterationControlMethods(
      animationAuxiliaryObject.duration,
      undefined,
      (1 / MAX_KEYFRAME) * lastStartProgress,
      animation,
      true // apply delay
    );
  }
}
function runAnimation(animation: AnimationInstance) {
  if (animation.state === ANIMATION_STATES[0]) {
    animation.play();
  } else if (animation.state === ANIMATION_STATES[2]) {
    revertAnimationProgress(animation);
  }
}
function runAfter(
  animation: AnimationInstance,
  otherAnimationInstance: AnimationInstance
) {
  animation.on('end', function f() {
    runAnimation(otherAnimationInstance);
    animation.off('end', f);
  });
}

export function repeatCycleExecution(
  cycleOptions: PerformerFn['$hidden']['cycleOptions']
): void {
  const cycle = cycleOptions;

  cycle.countCompleteAnimations += 1;

  if (
    cycle.animationInstancesInCycle &&
    cycle.countCompleteAnimations >= cycle.numberOfAnimationsToComplete &&
    (cycle.loop === true || cycle.countLoops < (cycle.loop as number))
  ) {
    cycle.loopDirection =
      cycle.loopDirection === 'normal' ? 'reverse' : 'normal';

    if (cycle.sequence) {
      const sequence =
        cycle.loopDirection === 'normal'
          ? cycle.sequence
          : cycle.sequence.slice().reverse();

      let runAfterThis: AnimationInstance;

      cycle.numberOfAnimationsToComplete = 0;

      sequence.forEach((bucket, index) => {
        if (index === 0) {
          bucket.forEach((i) => {
            if (!i.autoDestroy) {
              runAfterThis = i;
              cycle.numberOfAnimationsToComplete += 1;

              runAnimation(i);
            }
          });
        } else if (!runAfterThis) {
          bucket.forEach((i) => {
            if (!i.autoDestroy) {
              runAnimation(i);
            }
          });
        } else {
          let rAfterThis = runAfterThis;
          bucket.forEach((i) => {
            if (!i.autoDestroy) {
              rAfterThis = i;
              cycle.numberOfAnimationsToComplete += 1;
              runAfter(runAfterThis, i);
            }
          });
          runAfterThis = rAfterThis;
        }
      });
    }
    cycle.countCompleteAnimations = 0;
    cycle.countLoops += 1;
  }
}

export function organizeCycleSequence(
  animationPerformer: PerformerFn,
  animation: AnimationInstance,
  instanceToLink?: AnimationInstance,
  typeOfLink?: 'afterAnimation' | 'together'
): void {
  const cycleOptions = animationPerformer.$hidden.cycleOptions;
  if (cycleOptions && animation.isInCycle) {
    if (!cycleOptions.animationInstancesInCycle) {
      cycleOptions.animationInstancesInCycle = [];
    }
    cycleOptions.numberOfAnimationsToComplete += 1;
    cycleOptions.animationInstancesInCycle.unshift(animation);

    addAnimationEventListener(
      LISTENERS_NAMES[11],
      () => repeatCycleExecution(cycleOptions),
      animation
    );

    if (!cycleOptions.sequence) {
      cycleOptions.sequence = [];
    }
    const length = cycleOptions.sequence.length;

    if (instanceToLink && typeOfLink) {
      for (let index = 0; index < length; index += 1) {
        const bucket = cycleOptions.sequence[index];
        if (typeOfLink === 'together') {
          if (bucket.indexOf(instanceToLink) > -1) {
            bucket.push(animation);
            break;
          }
        } else if (
          typeOfLink === 'afterAnimation' &&
          bucket.indexOf(instanceToLink) > -1
        ) {
          cycleOptions.sequence.splice(index, 0, [animation]);
          break;
        }
      }
    } else {
      cycleOptions.sequence.push([animation]);
    }
  }
}
