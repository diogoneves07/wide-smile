import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import splitCSSProperties from '../utilities-style/split-css-properties';
import customForIn from '../utilities/custom-for-in';
import hasOwnProperty from '../utilities/has-own-property';
import ordernateByGrowingValues from '../utilities/ordernate-by-growing-values';

const POOL_PROPERTY_OBJECTS: PropertyObject[] = [];
export function recyclePropertyObjectToAnimate(
  animateProperties: PropertyObject[]
): void {
  const u = undefined as never;
  if (
    POOL_PROPERTY_OBJECTS.length < 500 /** Maximum objects in the dumpster. */
  ) {
    animateProperties.forEach((obj) => {
      const o = obj;
      o.target = u;
      o.index = u;
      o.keyframes = u;
      o.keyframesKeys = u;
      o.propertyName = u;
      o.newPropertyValue = u;
      o.lastKey = u;
      o.type = u;
      o.originalArrayLength = u;
      POOL_PROPERTY_OBJECTS.push(o);
    });
  }
}

function removeSpaces(a: string[]) {
  return a.filter((v) => v !== ' ');
}
function splitKeyframePropertyValue(keyframes: Record<string, string>) {
  const n: Record<string, string[]> = {};
  customForIn(keyframes, (keyframeValue, key) => {
    n[key] = removeSpaces(splitCSSProperties(keyframeValue));
  });
  return n;
}
type PropertyObject = AnimationAuxiliaryObject['animateProperties'][number];
export default function getPropertyObjectToAnimate(
  propertiesKeyframes: Record<string, Record<string, string>>,
  target: object,
  index: number,
  originalArrayLength: number,
  type: PropertyObject['type']
): PropertyObject[] {
  const animateProperties: PropertyObject[] = [];
  customForIn(propertiesKeyframes, (kf, propertyName) => {
    let differentValues = false;
    let lastkey = '0';
    customForIn(kf, (value, key) => {
      differentValues = value !== kf[lastkey];
      if (differentValues) {
        return true;
      }
      lastkey = key;
      return false;
    });
    if (
      hasOwnProperty(kf, '0') &&
      hasOwnProperty(kf, '100') &&
      differentValues
    ) {
      const o = (POOL_PROPERTY_OBJECTS.shift() || {}) as PropertyObject;
      o.target = target;
      o.index = index;
      o.keyframes = splitKeyframePropertyValue(kf);
      o.keyframesKeys = ordernateByGrowingValues(Object.keys(kf));
      o.propertyName = propertyName;
      o.type = type;
      o.originalArrayLength = originalArrayLength;
      animateProperties.push(o);
    }
  });

  return animateProperties;
}
