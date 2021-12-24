import parserStringStagger from '../../src/animation-mount/parser-string-stagger';
import { StaggerParams } from '../../src/contracts/stagger-params';

const staggerPropertiesValuesPossible = {
  grid: [
    [5, 5],
    [15, 4],
  ],
  axis: ['x', 'y', 'both'],
  from: [3, 'first', 'last', 'center', 'edges', 'random'],
  start: ['100', '50'],
  easing: ['easeInCubic', 'linear'],
  dir: ['normal', 'reverse'],
  value: ['250', '450'],
};
const staggerProperties = Object.keys(
  staggerPropertiesValuesPossible
) as (keyof StaggerParams)[];

function toStringStagger(staggerParams: StaggerParams) {
  const stringStagger: string[] = [];

  if (staggerParams.value) {
    stringStagger[0] = staggerParams.value as string;
  }
  if (staggerParams.from) {
    stringStagger[1] = `<${staggerParams.from}>` as string;
  } else {
    stringStagger[1] = '<>';
  }

  staggerProperties
    .filter(
      (propertyName) => propertyName !== 'value' && propertyName !== 'from'
    )
    .forEach((propertyName) => {
      const value = staggerParams[propertyName] as never;
      if (value) {
        stringStagger.push(value);
      }
    });
  return stringStagger
    .map((v) => (Array.isArray(v) ? `[${v.toString()}]` : v))
    .join(' ');
}
function getPossibleValuesForTheStaggerProperties() {
  const staggerParams: StaggerParams = {};

  let allValuesHaveBeenTested = true;
  staggerProperties.forEach((propertyName) => {
    const propertyValues = staggerPropertiesValuesPossible[propertyName];
    if (propertyName === 'value' && propertyValues.length === 1) {
      staggerParams.value = propertyValues[0];
    } else if (propertyValues[0]) {
      const value = propertyValues.shift() as never;
      staggerParams[propertyName] = value;
      allValuesHaveBeenTested = false;
    }
  });

  return {
    allValuesHaveBeenTested,
    stringStagger: toStringStagger(staggerParams),
    staggerParams,
  };
}
test('Converts string to object stagger.', () => {
  (function recursionTest(result) {
    if (!result.allValuesHaveBeenTested) {
      expect(parserStringStagger(result.stringStagger)).toEqual(
        result.staggerParams
      );
      recursionTest(getPossibleValuesForTheStaggerProperties());
    }
  })(getPossibleValuesForTheStaggerProperties());
});
