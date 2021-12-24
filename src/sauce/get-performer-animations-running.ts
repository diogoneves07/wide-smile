import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import { ANIMATION_STATES } from './constants';

export default function getAnimationsRunning(
  performerFn: PerformerFn
): AnimationInstance[] {
  const $hidden = performerFn.$hidden;
  const animations = $hidden.animationInstances;
  if ($hidden.cycleOptions) {
    return [
      ...($hidden.cycleOptions
        .animationInstancesInCycle as AnimationInstance[]).filter(
        (a) => a.state === ANIMATION_STATES[1]
      ),
      ...animations.filter((a) => !a.isInCycle),
    ];
  }
  return animations;
}
