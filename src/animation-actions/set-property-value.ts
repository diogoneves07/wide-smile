import { applyAnimationsStyleToTargets } from '../animation-engine/crud-animations-style';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import AllAnimableProperties from '../contracts/animable-properties';
import AnimationInstanceProperties from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';

export default function setPropertyValue(
  performer: PerformerFn,
  properties: AllAnimableProperties | string | PropertiesToAnimateObject,
  propertyValue?: ValuesToAnimateProperty | ValuesToAnimateProperty[]
): void {
  const targets = performer.$hidden.targets;

  const newPerformer = performer.creator(targets);

  newPerformer.$hidden.ignorePerformer = true;

  newPerformer.$hidden.orderOfThePropertiesUsed = performer.$hidden.orderOfThePropertiesUsed.slice();

  const animationOptions: AnimationInstanceProperties = {
    skip: true,
    autoPlay: false,
    dur: 0,
  };

  if (typeof properties === 'string' && propertyValue) {
    newPerformer.$(
      properties,
      propertyValue as ValuesToAnimateProperty,
      animationOptions
    );
  } else if (typeof properties === 'object') {
    newPerformer.$(properties, animationOptions);
  }
  newPerformer
    .on('load', () => {
      const animation = newPerformer.$hidden.animationInstances[0];
      const animationAuxiliaryObject = getAnimationAuxiliaryObject(
        animation.animationId
      );
      if (animationAuxiliaryObject) {
        animation.progressValue = 100;
        animation.max = 100;

        applyAnimationsStyleToTargets(
          animationAuxiliaryObject.propertiesToBeAnimate,
          animationAuxiliaryObject
        );

        newPerformer.destroy();
      }
    })
    .load();
}
