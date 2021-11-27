import AnimableProperties from './animable-properties';
import EasingsFunctionsList from './easings-functions-list';
import Keyframes from './key-frames';
import PropertiesToAnimateObject from './properties-to-animate-object';
import ValuesToAnimateProperty from './values-to-animate-property';
import { AnimationOptions } from './animation-instance-properties';
interface OverloadsForAnimationCreation {
    (iterations: number): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, parametersToAnimate?: AnimationOptions): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, dur?: AnimationOptions['dur']): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty, autoDestroy?: true): this;
    (propertyName: AnimableProperties, propertyValue: ValuesToAnimateProperty[], autoDestroy?: true): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty[], parametersToAnimate?: AnimationOptions): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, parametersToAnimate?: AnimationOptions): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, dur?: AnimationOptions['dur']): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, autoDestroy?: true): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty[], parametersToAnimate?: EasingsFunctionsList | AnimationOptions['dir']): this;
    (propertyName: string, propertyValue: ValuesToAnimateProperty, dirOrEasing?: EasingsFunctionsList | AnimationOptions['dir']): this;
    (animate: PropertiesToAnimateObject, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions): this;
    (animate: ValuesToAnimateProperty[], parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions): this;
    (animate: Keyframes, parametersToAnimateOrDurOrAutoDestroy?: AnimationOptions | AnimationOptions['dur'] | true | EasingsFunctionsList | AnimationOptions['dir']): this;
}
export default OverloadsForAnimationCreation;
