import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import getUnit from '../utilities/get-unit';
import { trimString } from '../utilities/handle-string';

function treatSupportsFloatingValue(propertyValues: string[]) {
  const values = propertyValues;
  const hasRGB = values.indexOf('rgb');
  if (hasRGB > -1) {
    let index = hasRGB;
    do {
      const v = Number(trimString(values[index]));
      if (!Number.isNaN(v)) {
        values[index] = Math.round(v) + (getUnit(values[index]) || '');
      }
      index += 1;
    } while (values[index] !== ')');
  }
  return values;
}
export default function calcNextPropertyValue(
  propertyObject: AnimationAuxiliaryObject['animateProperties'][number],
  fromAndTo: [from: number, to: number],
  currentPercent: number,
  easingFn: AnimationAuxiliaryObject['easing'],
  round: number
): string {
  const startValues = propertyObject.keyframes[fromAndTo[0]] as string[];

  const endValues = propertyObject.keyframes[fromAndTo[1]] as string[];

  const newValue: string[] = [];

  endValues.forEach((value, index) => {
    const startValueIndex = startValues[index]
      ? trimString(startValues[index] as string)
      : '0';
    let result;

    if (!Number.isNaN(parseFloat(value))) {
      const unitOfMeasure = getUnit(value) || getUnit(startValueIndex) || '';

      const fromNumber = parseFloat(startValueIndex);
      const toNumber = parseFloat(trimString(value));
      result = easingFn(
        (1 / 100) * currentPercent,
        propertyObject.target,
        propertyObject.index,
        propertyObject.originalArrayLength
      );

      result = fromNumber + result * (toNumber - fromNumber);

      if (round) {
        result = Math.round(result * round) / round;
      }

      result = ` ${result.toString() + unitOfMeasure}`;
    } else {
      result = value;
    }
    newValue.push(result);
  });

  return treatSupportsFloatingValue(newValue).join('');
}
