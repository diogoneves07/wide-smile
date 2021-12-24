import parserStringStagger from '../animation-mount/parser-string-stagger';
import stagger from '../based-implementations/stagger';
import AnimationInstanceProperties from '../contracts/animation-inter';
import FunctionForPropertyValueInKeyframe from '../contracts/function-for-property-value-in-keyframe';

export default function createAnimationObjectsFromStaggers(
  animationOptions: AnimationInstanceProperties
): false | AnimationInstanceProperties[] {
  const animationPropertiesObjects: AnimationInstanceProperties[] = [];
  if (animationOptions.targets) {
    animationOptions.targets.forEach((targetObject) => {
      const { target, index, originalArrayLength } = targetObject;
      const newAnimationProperties: AnimationInstanceProperties = {};
      let checkCreateNewObject = false;

      ['delay', 'drive', 'endDelay', 'dur', 'loop'].forEach((propertyName) => {
        let fn: string | FunctionForPropertyValueInKeyframe =
          animationOptions[propertyName as never];

        if (typeof fn === 'string') {
          const c = parserStringStagger(fn);
          if (typeof c === 'object') {
            fn = stagger(c);
          }
        }
        if (typeof fn === 'function') {
          newAnimationProperties[propertyName as never] = fn(
            target,
            index,
            originalArrayLength
          ) as never;
          checkCreateNewObject = true;
        }
      });

      if (checkCreateNewObject) {
        animationPropertiesObjects.push({
          ...animationOptions,
          ...newAnimationProperties,
          targets: [targetObject],
        });
      }
    });
  }
  if (!animationPropertiesObjects[0]) {
    return false;
  }

  return animationPropertiesObjects;
}
