export const ANIMATION_STATES: Readonly<
  [
    waiting: 'waiting',
    running: 'running',
    completed: 'completed',
    paused: 'paused',
    destroyed: 'destroyed',
    loaded: 'loaded',
    loading: 'loading',
    canceled: 'canceled'
  ]
> = [
  'waiting',
  'running',
  'completed',
  'paused',
  'destroyed',
  'loaded',
  'loading',
  'canceled',
];

export const ANIMATION_DIRECTIONS: Readonly<
  [
    normal: 'normal',
    reverse: 'reverse',
    alternate: 'alternate',
    alternateReverse: 'alternate-reverse',
    randomKeys: 'random-keys',
    randomOffset: 'random-offset',
    fluidRandomKeys: 'fluid-random-keys',
    fluidRandomOffset: 'fluid-random-offset'
  ]
> = [
  'normal',

  'reverse',

  'alternate',

  'alternate-reverse',

  'random-keys',

  'random-offset',

  'fluid-random-keys',

  'fluid-random-offset',
];

export const WIDE_SMILE_VERSION = '0.0.1';

export const CSS_VENDORS: Readonly<string[]> = ['moz', 'ms', 'o', 'webkit'];

export const CSS_VENDORS_LENGTH = CSS_VENDORS.length;

export const MAX_KEYFRAME = 100;

/**
 * Defines the time taken for each animation intercalation.
 */
export const INTERCALATION_TIME = 18;

export const BEST_FPS_TIMEOUT = 13;

export const TIME_OUT_FOR_SMART_LOADING = 50;

export const WIDE_SMILE_SCROLL_PROPERTIES = ['scrollLeft', 'scrollTop'];

/**
 * Initial values of the transformation functions.
 */
export const WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS: Readonly<
  Record<string, string>
> = {
  matrix: '1, 0, 0, 1, 0, 0',
  matrix3d: '1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1',
  perspective: '0',
  rotate: '0',
  rotate3d: '0, 0, 0, 0',
  rotateX: '0',
  rotateY: '0',
  rotateZ: '0',
  translate: '0, 0',
  translate3d: '0, 0, 0',
  translateX: '0',
  translateY: '0',
  translateZ: '0',
  scale: '1, 1',
  scale3d: '1, 1, 1',
  scaleX: '1',
  scaleY: '1',
  scaleZ: '1',
  skew: '0, 0',
  skewX: '0',
  skewY: '0',
};
