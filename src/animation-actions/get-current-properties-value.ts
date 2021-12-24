import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import AllAnimableProperties from '../contracts/animable-properties';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import CurrentPropertyValue from '../contracts/current-property-value';
import PerformerFn from '../contracts/performer-fn';
import getPropertyName from '../sauce/get-property-name';
import { toCamelCase } from '../utilities/handle-string';

type TreatCurrentPropertyValue = CurrentPropertyValue & {
  dateLastIntercalation: AnimationAuxiliaryObject['dateLastIntercalation'];
};

function concatProperties(
  currentPropertiesValue: TreatCurrentPropertyValue[],
  newProperties: TreatCurrentPropertyValue[]
) {
  newProperties.forEach((newPropertyObject) => {
    const index = currentPropertiesValue.findIndex(
      (p) =>
        newPropertyObject.propertyName === p.propertyName &&
        newPropertyObject.target === p.target
    );
    if (index > -1) {
      if (
        newPropertyObject.dateLastIntercalation >
        currentPropertiesValue[index].dateLastIntercalation
      ) {
        currentPropertiesValue.splice(index, 1);
        currentPropertiesValue.push(newPropertyObject);
      }
    } else {
      currentPropertiesValue.push(newPropertyObject);
    }
  });
  return currentPropertiesValue;
}
export default function getCurrentPropertiesValue(
  performer: PerformerFn,
  name: AllAnimableProperties | string
): CurrentPropertyValue | undefined {
  const propertyName = getPropertyName(performer, toCamelCase(name.toString()));

  const animationInstances = performer.$hidden.animationInstances
    .slice()
    .reverse();

  const length = animationInstances.length;

  let currentPropertiesValue: TreatCurrentPropertyValue[] = [];
  for (let index = 0; index < length; index += 1) {
    const animation = animationInstances[index];
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      animation.animationId
    );
    if (animationAuxiliaryObject) {
      const propertyObjects: TreatCurrentPropertyValue[] = animationAuxiliaryObject.propertiesToBeAnimate
        .filter((propertyObject) => {
          return propertyObject.propertyName === propertyName;
        })
        .map((o) => {
          return {
            target: o.target,
            value: o.newPropertyValue,
            propertyName,
            dateLastIntercalation:
              animationAuxiliaryObject.dateLastIntercalation,
          };
        });

      if (propertyObjects[0]) {
        currentPropertiesValue = concatProperties(
          currentPropertiesValue,
          propertyObjects
        );
      }
    }
  }

  if (currentPropertiesValue[0]) {
    return {
      target: currentPropertiesValue[0].target,
      value: currentPropertiesValue[0].value,
      propertyName: currentPropertiesValue[0].propertyName,
    };
  }

  return undefined;
}
