import { AnimationInstance } from '../contracts/animation-inter';
import { customForIn } from '../utilities/index';

function toArray<Type extends object>(o: unknown): Type | false {
  if (!o || typeof o !== 'object') {
    return false;
  }
  const c = Array.isArray(o) ? o : [].slice.call(o);
  return c && c.length > 0 ? (c as Type) : false;
}

export function normalizePastedProperties<Type extends object>(
  obj: Type,
  loopObject?: boolean
): Type {
  const o = obj;

  customForIn(obj, (propertyValue, propertyName) => {
    const splitedPropertyName = (propertyName as string).split('_');
    if (splitedPropertyName.length > 1) {
      splitedPropertyName.forEach((pName) => {
        const n = pName as never;
        if (pName) {
          if (o[n] && typeof propertyValue === 'object') {
            const v = toArray(propertyValue);
            if (v) {
              o[n] = (o[n] as unknown[]).concat(v) as never;
            } else {
              Object.assign(o[n], propertyValue);
            }
          } else {
            o[n] = propertyValue as never;
          }
        }
      });
      delete o[propertyName];
    }
    if (
      loopObject &&
      propertyValue &&
      typeof propertyValue === 'object' &&
      !toArray(propertyValue)
    ) {
      normalizePastedProperties(propertyValue as never);
    }
  });
  return o;
}
/**
 * Normalize object properties that have been pasted to be able to share the same value.
 * @example
 * input = {
 *  firstname_lastname: 'Neves'
 * }
 *
 * output = {
 *  firstname: 'Neves'
 *  lastname: 'Neves'
 * }
 *
 */
export default function normalizePastedAnimationProperties<Type extends object>(
  animation: Type
): Type {
  const aInstance = (normalizePastedProperties(
    animation
  ) as unknown) as AnimationInstance;

  return (aInstance as unknown) as Type;
}
