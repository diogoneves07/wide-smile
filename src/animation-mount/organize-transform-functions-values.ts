import { WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS } from '../sauce/constants';
import getUnit from '../utilities/get-unit';

export default function organizeTransformFunctionsValues(
  propertyName: keyof typeof WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS,
  propertyValue: string
): string {
  const propertyValues = propertyValue.split(',');

  const transformFnValues = WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[
    propertyName
  ].split(',');

  let unitOfMeasureInUse = '';
  let lastRealValue = '';
  const newPropertyValues = transformFnValues.map((defaultValue, index) => {
    let value = propertyValues[index];
    if (value) {
      lastRealValue = value;
    } else {
      value = lastRealValue || defaultValue;
    }

    unitOfMeasureInUse = value ? getUnit(value) : unitOfMeasureInUse;

    return value;
  });
  return newPropertyValues.join(',').replace(/( {2})/g, ' ');
}
