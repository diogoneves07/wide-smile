import TypeOfPropertiesToAnimate from '../contracts/type-of-properties-to-animate';
import getPropertyCurrentValue from './get-property-current-value';
import getRelativeValue from './get-relative-value';

export default function treatPropertyCurrentValue<T>(
  propertyValue: T,
  propertyName: string,
  type: TypeOfPropertiesToAnimate,
  target: HTMLElement
): T {
  let v;
  if (typeof propertyValue === 'string') {
    v = propertyValue;
    if (v.indexOf('?') > -1) {
      v = v.replace(
        /\?/,
        getPropertyCurrentValue(target, propertyName, type)
      ) as unknown;
    }

    v = getRelativeValue(v as string, propertyName, type, target);
  }

  return (v as unknown) as T;
}
