import { AnimationInstance } from '../contracts/animation-inter';

export default function allAnimationTargetsHaveBeenRemoved(
  animation: AnimationInstance
): void {
  animation.destroy();
}
