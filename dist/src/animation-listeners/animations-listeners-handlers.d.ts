import { AnimationInstance } from '../contracts/animation-inter';
export declare const LISTENERS_NAMES: [
    'start',
    'loopEnd',
    'end',
    'load',
    'cancel',
    'destroy',
    'play',
    '$-iteration-control-methods',
    'ready',
    'change',
    'loopStart',
    '$-end-animation-in-cycle'
];
export declare function addAnimationEventListener(name: string, callbackfn: Function, animationInstance: AnimationInstance): void;
export declare function removeAnimationEventListener(name: string, callbackfnOrIndex: Function | number, animationInstance: AnimationInstance): void;
export declare function removeAllAnimationEventListeners(animationId: number): void;
export declare function propagateAnimationEventListener(name: string, animationInstance: AnimationInstance, callbackfnReturn?: (fnReturn: unknown) => void): void;
export declare function updateListenersAnimationId(lastAnimationId: number, newAnimationId: number): void;
