import EasingsFunctionsList from '../contracts/easings-functions-list';

import { trimString } from '../utilities/handle-string';
import stagger from '../based-implementations/stagger';
import FunctionForPropertyValueInKeyframe from '../contracts/function-for-property-value-in-keyframe';
import { StaggerParams } from '../contracts/stagger-params';

function stringToArray(v: string) {
  return v.split(',').map((n) => parseFloat(trimString(n)));
}
function getPropertyValue(v: string) {
  const value = /\[(.*)\]/.exec(v);
  if (value && value[1]) {
    return stringToArray(value[1]);
  }
  return v;
}
export default function parserStringStagger(
  stringStagger: string
): string | FunctionForPropertyValueInKeyframe {
  const value = trimString(stringStagger);
  if (
    (!Number.isNaN(parseFloat(value.substring(0, 1))) &&
      value.indexOf('<') > -1 &&
      value.indexOf('>') > -1) ||
    value.substring(0, 1) === '['
  ) {
    const splitValue = value.split('<');
    const propertyValue = getPropertyValue(trimString(splitValue[0]));

    const form = /<(.*)>/.exec(value);
    const getGrid = /\[(.*)\]/.exec(splitValue[1]);
    const getOtherValue = splitValue[1]
      .replace(/(.*)>/, '')
      .replace(/\[(.*)\]/, '');

    const grid = getGrid
      ? (stringToArray(trimString(getGrid[1])) as StaggerParams['grid'])
      : false;
    const staggerParams = {} as StaggerParams;
    if (grid) {
      staggerParams.grid = grid;
    }
    if (form && trimString(form[1])) {
      const v = parseFloat(trimString(form[1]));

      staggerParams.from = (Number.isNaN(v)
        ? trimString(form[1])
        : v) as StaggerParams['from'];
    }
    getOtherValue.split(' ').forEach((a) => {
      const v = trimString(a);
      if (v) {
        const isNumber = parseFloat(v);

        if (Number.isNaN(isNumber)) {
          switch (v) {
            case 'x':
            case 'y':
            case 'both':
              staggerParams.axis = v;
              break;
            case 'normal':
            case 'reverse':
              staggerParams.dir = v;
              break;

            default:
              staggerParams.easing = v as EasingsFunctionsList;
              break;
          }
        } else {
          staggerParams.start = isNumber;
        }
      }
    });

    return stagger(
      Array.isArray(propertyValue)
        ? propertyValue.map((v) => v.toString())
        : propertyValue,
      staggerParams
    );
  }
  return stringStagger;
}
