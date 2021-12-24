import EasingsFunctionsList from '../contracts/easings-functions-list';

import { trimString } from '../utilities/handle-string';
import { StaggerParams } from '../contracts/stagger-params';
import removeSpacesChar from '../utilities/remove-spaces-char';

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
): string | StaggerParams {
  const value = trimString(stringStagger);

  if (value.indexOf('<') > -1 && value.indexOf('>') > -1) {
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
        if (Number.isNaN(parseFloat(v))) {
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
          staggerParams.start = removeSpacesChar(v);
        }
      }
    });

    staggerParams.value = Array.isArray(propertyValue)
      ? propertyValue.map((v) => v.toString())
      : propertyValue;
    return staggerParams;
  }
  return stringStagger;
}
