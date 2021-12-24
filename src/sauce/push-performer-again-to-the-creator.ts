import { AnimationInstance } from '../contracts/animation-inter';

export default function pushPerformerAgainToTheCreator(
  animationInstance: AnimationInstance
): void {
  const performer = animationInstance.performer;
  if (performer.$hidden.removedFromTheCreator) {
    animationInstance.creator.performers.push(performer);
    performer.$hidden.removedFromTheCreator = false;
  }
}
