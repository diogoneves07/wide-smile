import AllAnimableProperties from '../contracts/animable-properties';
import PerformerFn, { OverloadsForAnimationCreation } from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import Keyframes from '../contracts/key-frames';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import { AnimationOptions } from '../contracts/animation-inter';
export declare const createIndependentAnimations: OverloadsForAnimationCreation;
export declare const createDependentAnimations: OverloadsForAnimationCreation;
export declare function addFinalKeyframeInTheAnimation(this: PerformerFn, animate: PropertiesToAnimateObject | Keyframes | AllAnimableProperties | ValuesToAnimateProperty[] | ValuesToAnimateProperty, parametersToAnimateOrPropertyValue?: AnimationOptions | ValuesToAnimateProperty | ValuesToAnimateProperty[] | true, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true): PerformerFn;
