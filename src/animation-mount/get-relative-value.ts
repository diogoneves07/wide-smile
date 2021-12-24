import TypeOfPropertiesToAnimate from '../contracts/type-of-properties-to-animate';
import getUnit from '../utilities/get-unit';
import getPropertyCurrentValue from './get-property-current-value';

export default function getRelativeValue(
  to: string,
  propertyName: string,
  type: TypeOfPropertiesToAnimate,
  target: HTMLElement
): string {
  const operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  const from = getPropertyCurrentValue(target, propertyName, type);
  const u = getUnit(to) || '';
  const x = parseFloat(from);
  const y = parseFloat(to.replace(operator[0], ''));
  let v;
  switch (operator[0][0]) {
    case '-':
      v = x - y;
      break;
    case '*':
      v = x * y;
      break;
    default:
      v = x + y;
  }
  return v + u;
}
