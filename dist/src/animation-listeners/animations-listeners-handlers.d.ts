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
    '$-end-animation-in-cycle',
    'progressValue'
];
export declare function addAnimationEventListener(name: string, callbackfn: Function, animation: AnimationInstance): void;
export declare function removeAnimationEventListener(name: string, callbackfnOrIndex: Function | number, animation: AnimationInstance): void;
export declare function removeAllAnimationEventListeners(animationId: number): void;
export declare function propagateAnimationEventListener(name: string, animation: AnimationInstance, callbackfn?: (callbackfn: Function, animation: AnimationInstance) => void): void;
export declare function updateListenersAnimationId(lastAnimationId: number, newAnimationId: number): void;
