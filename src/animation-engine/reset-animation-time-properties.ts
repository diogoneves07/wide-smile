import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';

export default function resetAnimationTimeProperties(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  const a = animationAuxiliaryObject;
  a.iterationInterlacations = {
    timeConsumed: 0,
    completed: 0,
  };
  a.startTimeOfTheIteration = 0;
  a.timeRunningIteration = 0;
  return a;
}
