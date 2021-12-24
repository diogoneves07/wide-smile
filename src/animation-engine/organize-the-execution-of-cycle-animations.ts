import {
  addAnimationEventListener,
  LISTENERS_NAMES,
} from '../animation-listeners/animations-listeners-handlers';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';

import { ANIMATION_STATES, MAX_KEYFRAME } from '../sauce/constants';
import iterationControlMethods from '../sauce/iteration-control-methods';

/* 
  eslint-disable @typescript-eslint/no-loop-func
*/

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
function runAnimation(
  animation: AnimationInstance,
  direction: PerformerFn['$hidden']['cycleOptions']['dir']
) {
  if (animation.state === ANIMATION_STATES[0]) {
    animation.play();
  } else if (direction === 'normal') {
    animation.restart();
  } else if (animation.state === ANIMATION_STATES[2]) {
    revertAnimationProgress(animation);
  }
}

function repeatCycleExecution(
  cycleOptions: PerformerFn['$hidden']['cycleOptions']
) {
  const cycle = cycleOptions;
  const direction = cycleOptions.dir;

  if (
    !cycle.sequenceRunning ||
    (cycle.sequenceRunning && !cycle.sequenceRunning[0])
  ) {
    cycle.loopDirection =
      cycle.loopDirection === 'normal' ? 'reverse' : 'normal';

    cycle.countCompletedAnimations = 0;

    cycle.countLoops += 1;
  }

  if (cycle.loop !== true && cycle.countLoops >= (cycle.loop as number)) {
    return;
  }

  let sequenceRunning = cycle.sequenceRunning;
  if (cycle.sequence && (!sequenceRunning || !sequenceRunning[0])) {
    sequenceRunning =
      cycle.dir === 'normal' || cycle.loopDirection === 'normal'
        ? cycle.sequence.slice()
        : cycle.sequence.slice().reverse();

    cycle.numberOfAnimationsToComplete = 0;
  }
  if (sequenceRunning && sequenceRunning[0]) {
    const length = sequenceRunning.length;
    const a = sequenceRunning.slice();
    let find = false;
    let index = 0;
    for (; index < length; index += 1) {
      const bucket = a[index];

      bucket.forEach((i) => {
        if (!i.autoDestroy) {
          find = true;
          cycle.numberOfAnimationsToComplete += 1;

          runAnimation(i, direction);
        }
      });

      sequenceRunning.splice(0, index + 1);

      if (find) {
        break;
      }
    }

    cycle.sequenceRunning = sequenceRunning;
  }
}

export function checkAmountOfAnimationsCompletedInCycle(
  cycleOptions: PerformerFn['$hidden']['cycleOptions']
): void {
  const cycle = cycleOptions;

  cycle.countCompletedAnimations += 1;
  if (
    cycle.animationInstancesInCycle &&
    cycle.countCompletedAnimations >= cycle.numberOfAnimationsToComplete
  ) {
    repeatCycleExecution(cycle);
  }
}

export default function organizeTheExecutionOfCycleAnimations(
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
      () => checkAmountOfAnimationsCompletedInCycle(cycleOptions),
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
