import AllAnimableProperties from '../contracts/animable-properties';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
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
export declare function addAnimationEventListener(name: string | AllAnimableProperties, callback: Function, animation: AnimationInstance): void;
export declare function removeAnimationEventListener(name: typeof LISTENERS_NAMES[number] | AllAnimableProperties | string, callbackfnUsed: Function, animation: AnimationInstance): void;
export declare function removeAllAnimationEventListeners(animationId: number): void;
export declare function propagateAnimationPropertyEventListener(name: string, animation: AnimationInstance, propertyObject: AnimationAuxiliaryObject['propertiesToBeAnimate'][number]): boolean;
export declare function propagateAnimationEventListener(name: typeof LISTENERS_NAMES[number], animation: AnimationInstance, useSpecialCallback?: (eventCallback: Function, animation: AnimationInstance) => unknown): void;
