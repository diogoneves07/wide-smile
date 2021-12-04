import { transformFunctionsToObject } from '../animation-engine/crud-animations-style';
import { hasAnimationInTheStack } from '../animation-engine/mount-animations-stack';
import {
  ANIMATION_STATES,
  WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS,
  WIDE_SMILE_SCROLL_PROPERTIES,
  TIME_OUT_FOR_SMART_LOADING,
} from '../sauce/constants';
import { getCustomProperty } from '../sauce/custom-properties-for-animations';
import { useElementCanche } from '../sauce/elements-canche';
import { isEmptyObject } from '../sauce/types';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { colorToRgb, isColor } from '../based-implementations/colors';
import getComputedValuesAfterChange from '../utilities-style/get-computed-values-after-change';
import getLinkedCSSProperties from '../utilities-style/get-linked-css-properties';
import getVendorCSSProperty from '../utilities-style/get-vendor-css-property';
import toCSSKebabCase from '../utilities-style/to-css-kebab-case';
import toCSSStringRules from '../utilities-style/to-css-string-rules';
import customForIn from '../utilities/custom-for-in';
import { getAttr } from '../utilities/dom-attributes';
import getTimeNow from '../utilities/get-time-now';
import getUnit from '../utilities/get-unit';
import { toCamelCase, trimString } from '../utilities/handle-string';
import hasOwnProperty, {
  hasOwnPropertyTarget,
} from '../utilities/has-own-property';
import {
  getUnitOfMeasureForPropertiesValues,
  getUnitOfMeasureForPropertyValue,
} from './get-unit-of-measure-properties';

import getPropertyObjectToAnimate from './get-property-object-to-animate';
import {
  addToCancheColorValue,
  consultComputedStyle,
  getColorValueFromCanche,
} from './css-properties-to-animate';
import parserStringStagger from '../sauce/parser-string-stagger';
import ordernateByGrowingValues from '../utilities/ordernate-by-growing-values';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
import TargetsAnimationProperty from '../contracts/targets-animation-property';

/* eslint-disable @typescript-eslint/no-use-before-define  */

type PropertyObject = AnimationAuxiliaryObject['animateProperties'][number];

type Properties = Record<string, Record<string, ValuesToAnimateProperty>>;

type PropertiesType = 'css' | 'attr' | 'direct' | 'transform';

function getValue(
  propertyValue: ValuesToAnimateProperty,
  target: object,
  index: number,
  length: number
): string;
function getValue(
  propertyValue: ValuesToAnimateProperty,
  target: HTMLElement,
  index: number,
  length: number
): string;
function getValue(
  propertyValue: ValuesToAnimateProperty,
  target: unknown,
  index: number,
  length: number
) {
  const value =
    typeof propertyValue === 'string'
      ? parserStringStagger(propertyValue)
      : propertyValue;
  switch (typeof value) {
    case 'number':
      return (value as number).toString() as string;

    case 'function':
      return (value as Function)(target, index, length).toString() as string;

    default:
      return (value as unknown) as string;
  }
}

function revealSpecialProperties(
  propertyName: string,
  propertyValue: unknown,
  target: object,
  index: number
): Record<string, unknown> {
  const pName = propertyName;
  const specialPropertyCallback = getCustomProperty(pName, 'special');

  const propertiesFound: Record<string, unknown> = {};
  if (specialPropertyCallback) {
    const o = specialPropertyCallback(propertyValue as never, target, index);
    customForIn(o, (value, name) => {
      if (getCustomProperty(name, 'special')) {
        Object.assign(
          propertiesFound,
          revealSpecialProperties(name, value, target, index)
        );
      } else {
        propertiesFound[name] = value;
      }
    });
  }

  return propertiesFound;
}

function computedStyle(target: HTMLElement) {
  return (useElementCanche(target).computedStyle as unknown) as Record<
    string,
    string
  >;
}

function getRelativeValue(
  to: string,
  propertyName: string,
  type: PropertiesType,
  target: HTMLElement
) {
  const operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  const from = getCurrentValue(target, propertyName, type);
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

function getCurrentValue(
  target: HTMLElement,
  propertyName: string,
  type: PropertiesType
) {
  let currentValue: string;
  switch (type) {
    case 'attr':
      currentValue = getAttr(target, propertyName) || '0';
      break;
    case 'direct':
      currentValue = (target[propertyName as never] as number).toString();
      break;
    case 'transform':
      currentValue = getUnitOfMeasureForPropertyValue(
        propertyName,
        organizeTransformFunctionsValue(
          propertyName,
          getCurrentValueTransformFunction(target, propertyName)
        )
      );
      break;

    default:
      currentValue = computedStyle(target)[propertyName] || '';

      break;
  }
  return currentValue;
}

function useCurrentValue<T>(
  propertyValue: T,
  propertyName: string,
  type: PropertiesType,
  target: HTMLElement
) {
  let v;
  if (typeof propertyValue === 'string') {
    v = propertyValue;
    if (v.indexOf('?') > -1) {
      v = v.replace(
        /\?/,
        getCurrentValue(target, propertyName, type)
      ) as unknown;
    }

    v = getRelativeValue(v as string, propertyName, type, target);
  }

  return (v as unknown) as T;
}

function CSSPropertiesToAnimate(
  CSSProperties: Properties,
  target: HTMLElement,
  index: number,
  length: number
) {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(CSSProperties, (propertyKeyframes, propertyName) => {
    const pName = toCamelCase(propertyName);
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = getUnitOfMeasureForPropertyValue(
        propertyName,
        useCurrentValue(
          getValue(value, target, index, length),
          propertyName,
          'css',
          target
        )
      );

      getLinkedCSSProperties(propertyName).forEach((n) => {
        const name = toCamelCase(n);
        if (typeof value === 'string' && value.indexOf('?') > -1) {
          const currentValue = getUnitOfMeasureForPropertyValue(
            name,
            useCurrentValue(value, name, 'css', target)
          );
          keyframes[key][name] = isColor(currentValue)
            ? colorToRgb(currentValue)
            : currentValue;
        } else {
          keyframes[key][name] = v;
        }
      });
      if (!keyframes[key][pName]) {
        keyframes[key][pName] = v;
      }
    });
  });

  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const kf = keyframe;

    customForIn(kf, (propertyValue, propertyName) => {
      kf[propertyName] = getColorValueFromCanche(propertyValue);
    });

    const properties = toCSSStringRules(kf);

    let o: Record<string, string>;

    if (properties && consultComputedStyle(kf)) {
      const propertiesChanged = getComputedValuesAfterChange(
        target,
        properties
      );

      o = isEmptyObject(propertiesChanged.after)
        ? propertiesChanged.before
        : propertiesChanged.after;
    } else {
      o = kf;
    }

    customForIn(o, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = isColor(propertyValue)
        ? colorToRgb(propertyValue)
        : propertyValue;

      if (
        isColor(propertiesKeyframes[propertyName][key]) &&
        propertiesKeyframes[propertyName][key] !== kf[propertyName] &&
        trimString(kf[propertyName]).split(' ').length === 1
      ) {
        addToCancheColorValue(
          kf[propertyName],
          propertiesKeyframes[propertyName][key]
        );
      }
    });
  });
  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'css'
  );
}

function attrPropertiesToAnimate(
  attrProperties: Properties,
  target: HTMLElement,
  index: number,
  length: number
) {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(attrProperties, (propertyKeyframes, propertyName) => {
    const attrName = toCSSKebabCase(propertyName);
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = useCurrentValue(
        getValue(value, target, index, length),
        attrName,
        'attr',
        target
      );
      keyframes[key][propertyName] = v;
    });
  });

  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const properties = keyframe;

    customForIn(properties, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }
      propertiesKeyframes[propertyName][key] = propertyValue;
    });
  });

  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'attr'
  );
}

function organizeTransformFunctionsValue(
  propertyName: keyof typeof WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS,
  propertyValue: string
) {
  const propertyValues = propertyValue.split(',');

  const transformFnValues = WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[
    propertyName
  ].split(',');

  let unitOfMeasureInUse = '';
  let lastRealValue = '';
  const newPropertyValues = transformFnValues.map((defaultValue, index) => {
    let value = propertyValues[index];
    if (value) {
      lastRealValue = value;
    } else {
      value = lastRealValue || defaultValue;
    }
    unitOfMeasureInUse = value ? getUnit(value) : unitOfMeasureInUse;

    return value;
  });
  return newPropertyValues.join(',').replace(/( {2})/g, ' ');
}

function getCurrentValueTransformFunction(
  target: HTMLElement,
  transformFunction: string
) {
  const current = target.style[getVendorCSSProperty('transform') as never];

  if (current && current.indexOf(transformFunction) > -1) {
    const transformFunctionsObject = transformFunctionsToObject(target) || {};
    if (
      hasOwnProperty(transformFunctionsObject, transformFunction) &&
      transformFunctionsObject[transformFunction]
    ) {
      return transformFunctionsObject[transformFunction];
    }
  }

  return WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[transformFunction];
}

function transformPropertiesToAnimate(
  transformProperties: Properties,
  target: HTMLElement,
  index: number,
  length: number
) {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(transformProperties, (propertyKeyframes, propertyName) => {
    const transformFnName = propertyName;
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = useCurrentValue(
        getValue(value, target, index, length),
        transformFnName,
        'transform',
        target
      );

      keyframes[key][propertyName] = v;
    });
  });
  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const properties = getUnitOfMeasureForPropertiesValues(keyframe) as Record<
      string,
      string
    >;

    customForIn(properties, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = organizeTransformFunctionsValue(
        propertyName,
        propertyValue
      );
    });
  });
  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'transform'
  );
}

function getScrollValues(target: HTMLElement, to: string) {
  const scrollHeight = target.scrollHeight;
  const scrollWidth = target.scrollWidth;
  const clientHeight = target.clientHeight;
  const clientWidth = target.clientWidth;
  const scrollValues = (value: string | number, maxValue: number) => {
    let v = value;
    v = typeof v === 'number' ? v.toString() : v;
    let r = parseFloat(v);

    if (v.indexOf('%') > -1) {
      r = (maxValue / 100) * Math.floor(parseFloat(v));
    }

    v = r > maxValue || v.indexOf('max') > -1 ? maxValue : r;

    return v.toString();
  };

  return {
    scrollTop: scrollValues(to, scrollHeight - clientHeight),
    scrollLeft: scrollValues(to, scrollWidth - clientWidth),
  };
}
function directPropertiesToAnimate(
  targetProperties: Properties,
  target: object,
  index: number,
  length: number
) {
  const keyframes: Record<string, Record<string, string>> = {};

  customForIn(targetProperties, (propertyKeyframes, propertyName) => {
    const scrollProperty = propertyName;
    customForIn(propertyKeyframes, (value, key) => {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }
      const v = useCurrentValue(
        getValue(value, target, index, length),
        scrollProperty,
        'direct',
        target as never
      );

      keyframes[key][propertyName] = v;
    });
  });

  const propertiesKeyframes: Record<string, Record<string, string>> = {};

  customForIn(keyframes, (keyframe, key) => {
    const properties = keyframe;

    customForIn(properties, (propertyValue, propertyName) => {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }
      if (WIDE_SMILE_SCROLL_PROPERTIES.indexOf(propertyName as string) > -1) {
        propertiesKeyframes[propertyName][key] = getScrollValues(
          target as HTMLElement,
          propertyValue
        )[propertyName as 'scrollTop' | 'scrollLeft'];
      } else {
        propertiesKeyframes[propertyName][key] = propertyValue;
      }
    });
  });
  return getPropertyObjectToAnimate(
    propertiesKeyframes,
    target,
    index,
    length,
    'direct'
  );
}

function propertiesToBeAnimated(
  targetObject: TargetsAnimationProperty[number],
  props: PropertiesToAnimateObjectKeyframes,
  specials: PropertiesToAnimateObjectKeyframes
): AnimationAuxiliaryObject['animateProperties'] {
  let animateProperties: PropertyObject[] = [];
  const properties = props;
  const CSSProperties: Properties = {};
  const attrProperties: Properties = {};
  const transformProperties: Properties = {};
  const targetProperties: Properties = {};
  const { target, index, originalArrayLength } = targetObject;

  customForIn(specials, (o, propertyName) => {
    customForIn(o, (value, key) => {
      customForIn(
        revealSpecialProperties(propertyName as string, value, target, index),
        (v, n) => {
          if (!properties[n as never]) {
            properties[n as never] = {} as never;
          }
          if (value !== '?') {
            properties[n as never][key] = v as never;
          } else {
            properties[n as never][key] = value as never;
          }
        }
      );
    });
  });

  customForIn(properties, (propertyValue, propertyName) => {
    const keyframes = { ...propertyValue };
    if (getCustomProperty(propertyName, 'observed')) {
      if (keyframes[100] === '?') {
        keyframes[100] = keyframes[0];
      }

      animateProperties.push({
        keyframes,
        keyframesKeys: ordernateByGrowingValues(Object.keys(keyframes)),
        target,
        index,
        propertyName: propertyName as string,
        type: 'observed',
        originalArrayLength,
      });
    } else if (
      hasOwnProperty(WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS, propertyName)
    ) {
      transformProperties[propertyName] = keyframes;
    } else if (hasOwnPropertyTarget(target, propertyName)) {
      targetProperties[propertyName] = keyframes;
    } else if (
      getAttr(target as HTMLElement, propertyName) !== null ||
      !getLinkedCSSProperties(getVendorCSSProperty(propertyName as string))[0]
    ) {
      attrProperties[propertyName] = keyframes;
    } else {
      CSSProperties[getVendorCSSProperty(propertyName as string)] = keyframes;
    }
  });

  if (!isEmptyObject(CSSProperties)) {
    animateProperties = animateProperties.concat(
      CSSPropertiesToAnimate(
        CSSProperties,
        target as HTMLElement,
        index,
        originalArrayLength
      )
    );
  }
  if (!isEmptyObject(attrProperties)) {
    animateProperties = animateProperties.concat(
      attrPropertiesToAnimate(
        attrProperties,
        target as HTMLElement,
        index,
        originalArrayLength
      )
    );
  }
  if (!isEmptyObject(transformProperties)) {
    animateProperties = animateProperties.concat(
      transformPropertiesToAnimate(
        transformProperties,
        target as HTMLElement,
        index,
        originalArrayLength
      )
    );
  }
  if (!isEmptyObject(targetProperties)) {
    animateProperties = animateProperties.concat(
      directPropertiesToAnimate(
        targetProperties,
        target,
        index,
        originalArrayLength
      )
    );
  }

  return animateProperties;
}

const ANIMATIONS_FOR_LOAD: Parameters<typeof loadPropertiesToAnimate>[] = [];
let IS_BUSY_LOADER = false;
const loadNextAnimation = (a?: typeof ANIMATIONS_FOR_LOAD[number]) => {
  if (a) {
    loadPropertiesToAnimate(...a);
  }
};
export default function loadPropertiesToAnimate(
  animationAuxiliaryObject: AnimationAuxiliaryObject,
  props: PropertiesToAnimateObjectKeyframes,
  callbackLoaded: (
    result: boolean,
    propertiesToAnimate: PropertyObject[]
  ) => void
): void {
  const { animation } = animationAuxiliaryObject;
  const targets = animation.targets;

  if (animation.creator.global.asyncLoading) {
    IS_BUSY_LOADER = false;
  }

  /**
   * There's an animation currently loading.
   */
  if (IS_BUSY_LOADER) {
    ANIMATIONS_FOR_LOAD.push([animationAuxiliaryObject, props, callbackLoaded]);

    return;
  }
  IS_BUSY_LOADER = true;

  const length = targets.length;
  const properties = { ...props };
  const specials = (() => {
    const o: typeof properties = {};
    customForIn(properties, (propertyValue, propertyName) => {
      if (getCustomProperty(propertyName as string, 'special')) {
        o[propertyName] = propertyValue as never;
      }
    });
    return o;
  })();

  let animateProperties: PropertyObject[] = [];

  let count = 0;
  let startTime = getTimeNow();

  let releaseTheExecutionStack = false;

  (function repeat() {
    animateProperties = animateProperties.concat(
      propertiesToBeAnimated(targets[count], properties, specials)
    );
    const timePassed = getTimeNow() - startTime;

    count += 1;

    switch (animation.state) {
      case ANIMATION_STATES[2]:
      case ANIMATION_STATES[3]:
      case ANIMATION_STATES[4]:
      case ANIMATION_STATES[7]:
        IS_BUSY_LOADER = false;
        callbackLoaded(false, animateProperties);
        loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        return;
      default:
        if (count < length) {
          if (
            (!releaseTheExecutionStack && !hasAnimationInTheStack()) ||
            timePassed < TIME_OUT_FOR_SMART_LOADING
          ) {
            releaseTheExecutionStack = true;

            repeat();
          } else {
            releaseTheExecutionStack = false;
            startTime = getTimeNow();
            const setTimeoutId = setTimeout(() => {
              clearTimeout(setTimeoutId);
              repeat();
            }, 0);
          }
        } else {
          IS_BUSY_LOADER = false;

          callbackLoaded(true, animateProperties);
          loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        }
        break;
    }
  })();
}
