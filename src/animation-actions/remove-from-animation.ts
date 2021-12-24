import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import getElementsInTheDOM from '../animation-mount/get-elements-in-the-dom';
import { recyclePropertyObjectToAnimate } from '../animation-mount/property-object-to-animate';
import {
  AnimationInstance,
  UserAnimationOptions,
} from '../contracts/animation-inter';
import { toCamelCase } from '../utilities/handle-string';

function remove(item: string | number | object, animation: AnimationInstance) {
  const prop = typeof item === 'object' ? 'target' : 'propertyName';
  const animationAuxiliaryObject = getAnimationAuxiliaryObject(
    animation.animationId
  );

  if (animationAuxiliaryObject) {
    animationAuxiliaryObject.propertiesToBeAnimate = animationAuxiliaryObject.propertiesToBeAnimate.filter(
      (propertyObject) => {
        const check = propertyObject[prop] !== item;
        if (!check) {
          recyclePropertyObjectToAnimate(propertyObject);
        }
        return check;
      }
    );
  }
}
export function removePropertyFromAnimation(
  names: (string | number)[],
  animation: AnimationInstance
): void {
  names.forEach((name) => {
    const propertyName = toCamelCase(name.toString());
    remove(propertyName, animation);
  });
}

export function removeTargetFromAnimation(
  targets: UserAnimationOptions['targets'],
  animation: AnimationInstance
): void {
  getElementsInTheDOM(targets).forEach((o) => {
    remove(o, animation);
  });
}
