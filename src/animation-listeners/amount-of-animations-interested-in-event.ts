import { AnimationInstance } from '../contracts/animation-inter';

export default function amountOfAnimationsInterestedInEvent(
  animationInstances: AnimationInstance[]
): number {
  let countAnimationsInterested = 0;
  animationInstances.forEach((a) => {
    switch (a.state) {
      case 'canceled':
      case 'destroyed':
        break;

      default:
        countAnimationsInterested += 1;
        break;
    }
  });
  return countAnimationsInterested;
}
