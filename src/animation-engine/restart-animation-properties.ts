import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import resetAnimationProgress from './reset-animation-progress';
import resetAnimationTimeProperties from './reset-animation-time-properties';

export default function restartAnimationProperties(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): AnimationAuxiliaryObject {
  animationAuxiliaryObject.propertiesToBeAnimate.forEach((propertyObject) => {
    const o = propertyObject;
    /**
     * Important to reset the property(lastKey).
     */
    o.lastKey = undefined;
  });
  resetAnimationTimeProperties(animationAuxiliaryObject);
  resetAnimationProgress(animationAuxiliaryObject);
  return animationAuxiliaryObject;
}
