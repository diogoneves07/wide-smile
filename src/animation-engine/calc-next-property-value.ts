import { isRgb } from '../based-implementations/colors';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import splitCSSProperties from '../utilities-style/split-css-properties';
import getUnit from '../utilities/get-unit';
import { trimString } from '../utilities/handle-string';

function removeSpaces(a: string[]) {
  return a.filter((v) => v !== ' ');
}
function propertySupportsFloatingValue(value: string) {
  if (isRgb(value)) {
    return false;
  }
  return true;
}
export default function calcNextPropertyValue(
  propertyObject: AnimationAuxiliaryObject['animateProperties'][number],
  fromAndTo: [from: number, to: number],
  currentPercent: number,
  easingFn: AnimationAuxiliaryObject['easing'],
  round: number
): string {
  const startValue = propertyObject.keyframes[fromAndTo[0]] as string;
  const endValue = propertyObject.keyframes[fromAndTo[1]] as string;
  const splitedStartValues: (string | number)[] = removeSpaces(
    splitCSSProperties(startValue)
  );

  const splitedEndValues = removeSpaces(splitCSSProperties(endValue));
  let newValue = '';

  splitedEndValues.forEach((value, index) => {
    const startValueIndex = trimString(splitedStartValues[index] as string);
    let result;

    if (!Number.isNaN(parseFloat(startValueIndex))) {
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
      if (
        !propertySupportsFloatingValue(startValue) ||
        !propertySupportsFloatingValue(endValue)
      ) {
        result = Math.round(result as number);
      }
      result = ` ${result.toString() + unitOfMeasure}`;
    } else {
      result = value;
    }
    newValue += `${result}`;
  });

  return trimString(newValue);
}
