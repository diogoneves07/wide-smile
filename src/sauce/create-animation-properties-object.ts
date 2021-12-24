import hasOwnProperty from '../utilities/has-own-property';
import AllAnimableProperties from '../contracts/animable-properties';
import isDirValue from '../animation-mount/is-dir-value';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import PerformerFn from '../contracts/performer-fn';
import Keyframes from '../contracts/key-frames';
import AnimationInstanceProperties, {
  AnimationOptions,
  UserAnimationOptions,
} from '../contracts/animation-inter';
import DEFAULTS_ANIMATION_PROPERTIES_VALUES from './defaults-animation-properties-values';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ANIMATION_PERFORMER_PROPERTIES = [
  'dir',
  'loop',
  'dur',
  'easing',
  'delay',
  'endDelay',
  'drive',
  'autoDestroy',
  'autoPlay',
  'pauseDocHidden',
  'round',
  'progress',
  'reset',
  'skip',
];

function parametersToAnimateShortcuts(v: unknown) {
  const obj: AnimationOptions = {};

  switch (typeof v) {
    case 'string':
      if (isDirValue(v)) {
        obj.dir = v as AnimationOptions['dir'];
      } else {
        obj.easing = v as AnimationOptions['easing'];
      }
      break;
    case 'function':
      obj.easing = v as AnimationOptions['easing'];

      break;
    case 'number':
      obj.dur = v;
      break;
    case 'boolean':
      obj.autoDestroy = v;
      break;
    default:
      break;
  }
  return obj;
}

export default function createAnimationPropertiesObject(
  animationPerformer: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | ValuesToAnimateProperty[],
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimateOrDurOrAutoDestroy?:
    | AnimationOptions
    | AnimationOptions['dur']
    | true
): AnimationInstanceProperties {
  let parametersToAnimationProperties = parametersToAnimateOrPropertyValue;
  let propertiesToBeAnimate: PropertiesToAnimateObject | Keyframes;

  if (typeof animate === 'string' || typeof animate === 'number') {
    parametersToAnimationProperties =
      typeof parametersToAnimateOrDurOrAutoDestroy === 'object'
        ? parametersToAnimateOrDurOrAutoDestroy
        : parametersToAnimateShortcuts(parametersToAnimateOrDurOrAutoDestroy);

    propertiesToBeAnimate = (() => {
      const o: PropertiesToAnimateObject = {};
      o[
        animate
      ] = parametersToAnimateOrPropertyValue as ValuesToAnimateProperty;
      return o;
    })();
  } else {
    parametersToAnimationProperties =
      typeof parametersToAnimationProperties === 'object'
        ? parametersToAnimationProperties
        : parametersToAnimateShortcuts(parametersToAnimateOrPropertyValue);

    propertiesToBeAnimate = animate as PropertiesToAnimateObject | Keyframes;
  }

  const targets = ((parametersToAnimationProperties as UserAnimationOptions)
    .targets || animationPerformer.$hidden.targets) as HTMLElement[];

  const length = targets.length;

  const t = targets.map((target, i) => {
    return {
      originalArrayLength: length,
      target,
      index: i,
    };
  });
  const animationProperties = {
    keyframes: propertiesToBeAnimate,
    ...(parametersToAnimationProperties as AnimationInstanceProperties),
    targets: t,
    performer: animationPerformer,
  } as AnimationOptions;

  ANIMATION_PERFORMER_PROPERTIES.forEach((propertyName) => {
    if (!hasOwnProperty(animationProperties, propertyName)) {
      animationProperties[propertyName as never] = animationPerformer.$hidden[
        propertyName as never
      ] as never;
    }
  });

  if (
    animationProperties.drive &&
    animationProperties.drive !== 'normal' &&
    animationProperties.loop === DEFAULTS_ANIMATION_PROPERTIES_VALUES.loop
  ) {
    if (Array.isArray(animationProperties.drive)) {
      const l = animationProperties.drive.length;
      if (typeof animationProperties.drive[l - 1] === 'string') {
        animationProperties.loop = true;
      } else {
        animationProperties.loop = l;
      }
    } else {
      animationProperties.loop = true;
    }
  }

  if (
    animationProperties.dir &&
    animationProperties.loop === DEFAULTS_ANIMATION_PROPERTIES_VALUES.loop
  ) {
    if (animationProperties.dir.indexOf('alternate') > -1) {
      animationProperties.loop = 2;
    }
  }

  return animationProperties as AnimationInstanceProperties;
}
