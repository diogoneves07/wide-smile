import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import {
  getCurrentAnimationSketches,
  runCallbacksAfterBuildingAnimations,
} from './organize-animation-creations';

export default function applyCallbackForFutureAnimations(
  performer: PerformerFn,
  callback: (animation: AnimationInstance) => void
): void {
  const animationSketches = getCurrentAnimationSketches(performer);
  if (animationSketches) {
    runCallbacksAfterBuildingAnimations(() => {
      performer.$hidden.animationInstances.forEach((animation) => {
        if (
          animation.originalAnimationOptions &&
          animationSketches.indexOf(animation.originalAnimationOptions) > -1
        ) {
          callback(animation);
        }
      });
    }, performer);
  }
}
