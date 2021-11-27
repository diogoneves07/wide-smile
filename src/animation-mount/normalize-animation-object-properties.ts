import { AnimationInstance } from '../contracts/animation-inter';
import { customForIn } from '../utilities/index';

function isPossiblyAnArray<Type extends object>(o: Type): Type | false {
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
            const v = isPossiblyAnArray(propertyValue as never);
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
      !isPossiblyAnArray(propertyValue as never)
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
  animationInstance: Type
): Type {
  const aInstance = (normalizePastedProperties(
    animationInstance
  ) as unknown) as AnimationInstance;

  return (aInstance as unknown) as Type;
}
