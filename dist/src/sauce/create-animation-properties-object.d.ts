import AllAnimableProperties from '../contracts/animable-properties';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import PerformerFn from '../contracts/performer-fn';
import Keyframes from '../contracts/key-frames';
import AnimationInstanceProperties, { AnimationOptions } from '../contracts/animation-inter';
export declare const ANIMATION_PERFORMER_PROPERTIES: string[];
export default function createAnimationPropertiesObject(animationPerformer: PerformerFn, animate: PropertiesToAnimateObject | Keyframes | AllAnimableProperties | ValuesToAnimateProperty[], parametersToAnimateOrPropertyValue?: AnimationOptions | ValuesToAnimateProperty | ValuesToAnimateProperty[] | true, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true): AnimationInstanceProperties;
