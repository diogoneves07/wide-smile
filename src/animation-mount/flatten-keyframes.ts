import Keyframes from '../contracts/key-frames';
import { PerformerFnProperties } from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
import customForIn from '../utilities/custom-for-in';
import hasOwnProperty from '../utilities/has-own-property';
import normalizePastedAnimationProperties from './normalize-animation-object-properties';

function arrayKeyframesToObject(keyframes: Keyframes) {
  const keyframesObject: Record<string, Keyframes[number]> = {};
  const keyframesArray = keyframes.slice();
  let leftovers = 100;
  let lastKey = 0;
  const keyframesArrayLength = keyframes.length;
  let leftoversIndexs = keyframesArrayLength;

  keyframesArray.forEach((keyframe, index) => {
    const kf = keyframe;
    if (hasOwnProperty(keyframe, 'offset')) {
      lastKey = Math.max(Math.min((100 / 1) * (kf.offset as number), 100), 0);
      delete kf.offset;
    } else {
      lastKey = index > 0 ? leftovers / leftoversIndexs + lastKey : 0;
    }

    if (hasOwnProperty(keyframesObject, lastKey)) {
      keyframesObject[lastKey] = {
        ...keyframesObject[lastKey],
        ...(kf as Record<string, string>),
      };
    } else {
      keyframesObject[lastKey] = kf as never;
    }

    leftovers = 100 - lastKey;

    leftoversIndexs -= 1;

    return true;
  });

  return keyframesObject;
}
export default function flattenKeyframes(
  keyframes: Keyframes | PropertiesToAnimateObject,
  propertiesUsed: PerformerFnProperties['propertiesUsed']
): PropertiesToAnimateObjectKeyframes {
  let kframes = keyframes;
  let newKeyframes: Record<string, Keyframes[number]> = {};
  const propertiesToAnimate: PropertiesToAnimateObjectKeyframes = {};
  const propertiesUsedForThis: string[] = [];

  if (Array.isArray(kframes)) {
    newKeyframes = arrayKeyframesToObject(kframes);
  } else {
    kframes = { ...keyframes } as PropertiesToAnimateObject;
    customForIn(kframes, (propertyValue, propertyName) => {
      if (Array.isArray(propertyValue)) {
        propertiesToAnimate[propertyName] = arrayKeyframesToObject(
          (propertyValue as unknown) as Keyframes
        ) as never;
        delete kframes[propertyName as never];
      }
    });

    newKeyframes[0] = (() => {
      const keyframe: PropertiesToAnimateObject = {};
      customForIn(kframes, (_propertyValue, propertyName) => {
        // Value to be set yet.
        keyframe[propertyName] = '?';
      });
      return keyframe;
    })();
    newKeyframes[100] = kframes;
  }

  customForIn(newKeyframes, (keyframe, key) => {
    newKeyframes[key] = normalizePastedAnimationProperties(keyframe);
  });

  customForIn(propertiesToAnimate, (propertyValue, propertyName) => {
    let n = propertyName;

    if (!Number.isNaN(parseFloat(n))) {
      n = propertiesUsed[Number(n)];
      propertiesToAnimate[n] = propertyValue;
      delete propertiesToAnimate[propertyName];
    }
    if (propertiesUsed.indexOf(n) === -1) {
      propertiesUsed.push(n);
    }
  });

  customForIn(newKeyframes, (keyframe) => {
    customForIn(keyframe, (propertyValue, propertyName) => {
      const f = keyframe;
      let n = propertyName as string;

      if (!Number.isNaN(parseFloat(n))) {
        n = propertiesUsed[Number(n)];

        /**
         * Replaces indexes by the property name.
         */
        f[n as never] = propertyValue as never;

        delete f[propertyName];
      }
      if (propertiesUsed.indexOf(n) === -1) {
        propertiesUsed.push(n);
      }
      if (propertiesUsedForThis.indexOf(n) === -1) {
        propertiesUsedForThis.push(n);
      }
    });
  });

  customForIn(newKeyframes, (keyframe, key) => {
    propertiesUsedForThis.forEach((propertyName) => {
      const v = keyframe[propertyName as never];

      if (!propertiesToAnimate[propertyName]) {
        propertiesToAnimate[propertyName] = {};
      }
      if (key !== '0' && key !== '100') {
        if (keyframe[propertyName as never]) {
          propertiesToAnimate[propertyName][key] = v;
        }
      } else {
        propertiesToAnimate[propertyName][key] =
          typeof v === 'undefined' ? '?' : v;
      }
    });
  });
  return propertiesToAnimate;
}