import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import getNewValuesForAnimationIntercalation from './get-new-values-for-animation-intercalation';
import insertAnimationInTheQueue from './insert-animation-in-the-queue';
import { addAnimationToStack } from './mount-animations-stack';

export default function newAnimationIntercalation(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  const aAuxiliaryObject = animationAuxiliaryObject;
  if (aAuxiliaryObject.remainingDelayAnimation > 0) {
    insertAnimationInTheQueue(aAuxiliaryObject);
    return;
  }
  const newIntercalationObject = getNewValuesForAnimationIntercalation(
    aAuxiliaryObject
  );

  Object.assign(aAuxiliaryObject, newIntercalationObject.toAuxiliaryObject);

  aAuxiliaryObject.animation.progressValue = newIntercalationObject.progress;

  addAnimationToStack(aAuxiliaryObject);
}
