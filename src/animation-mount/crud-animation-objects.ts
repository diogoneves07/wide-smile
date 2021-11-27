import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { sendToGarbageCollector } from '../sauce/manage-memory-collections';

/**
 * A container for animations that saves the dedicated objects to each in pairs (the user animation instance and the built-in animation instance).
 */

const ANIMATION_AUXILIARY_OBJECTS: {
  [animationId: string]: AnimationAuxiliaryObject;
} = {};

export function getAllAnimationAuxiliaryObjects(): typeof ANIMATION_AUXILIARY_OBJECTS {
  return ANIMATION_AUXILIARY_OBJECTS;
}
export function addAnimationAuxiliaryObject(
  animationAuxiliaryObject: AnimationAuxiliaryObject
): void {
  ANIMATION_AUXILIARY_OBJECTS[
    animationAuxiliaryObject.animationId
  ] = animationAuxiliaryObject;
}
export function getAnimationAuxiliaryObject(
  animationId: number
): false | AnimationAuxiliaryObject {
  return ANIMATION_AUXILIARY_OBJECTS[animationId] || false;
}

export function removeAnimationAuxiliaryObject(
  animationId: number
): AnimationAuxiliaryObject | false {
  const animationAuxiliaryObject = ANIMATION_AUXILIARY_OBJECTS[animationId];
  if (animationAuxiliaryObject) {
    delete ANIMATION_AUXILIARY_OBJECTS[animationId];
    sendToGarbageCollector(animationAuxiliaryObject);
    return animationAuxiliaryObject;
  }
  return false;
}
