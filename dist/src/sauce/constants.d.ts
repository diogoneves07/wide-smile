export declare const ANIMATION_STATES: Readonly<[
    waiting: 'waiting',
    running: 'running',
    completed: 'completed',
    paused: 'paused',
    destroyed: 'destroyed',
    loaded: 'loaded',
    loading: 'loading',
    canceled: 'canceled'
]>;
export declare const ANIMATION_DIRECTIONS: Readonly<[
    normal: 'normal',
    reverse: 'reverse',
    alternate: 'alternate',
    alternateReverse: 'alternate-reverse',
    randomKeys: 'random-keys',
    randomOffset: 'random-offset',
    fluidRandomKeys: 'fluid-random-keys',
    fluidRandomOffset: 'fluid-random-offset'
]>;
export declare const WIDE_SMILE_VERSION = "0.0.1";
export declare const CSS_VENDORS: Readonly<string[]>;
export declare const CSS_VENDORS_LENGTH: number;
export declare const MAX_KEYFRAME = 100;
/**
 * Defines the time taken for each animation intercalation.
 */
export declare const INTERCALATION_TIME = 18;
export declare const BEST_FPS_TIMEOUT = 13;
export declare const TIME_OUT_FOR_SMART_LOADING = 50;
export declare const WIDE_SMILE_SCROLL_PROPERTIES: string[];
/**
 * Initial values of the transformation functions.
 */
export declare const WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS: Readonly<Record<string, string>>;
