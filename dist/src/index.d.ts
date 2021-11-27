import './sauce/polyfills';
import './animation-engine/handle-visibility-change';
import EasingsFunctionsList from './contracts/easings-functions-list';
import { AnimationInstance, UserAnimationOptions } from './contracts/animation-inter';
import CreatorFnProperties from './contracts/creator-fn-properties';
import PerformerFn from './contracts/performer-fn';
declare function GetCreatorFnProperties(): Omit<CreatorFnProperties, 'global'> & {
    global: Omit<CreatorFnProperties['global'], 'new'> & {
        new: () => WideSmile;
    };
};
declare const creatorFn: {
    (): WideSmile['global'];
    (performerProperties: UserAnimationOptions | object | string, ...props: (EasingsFunctionsList | AnimationInstance['dir'] | number | boolean | UserAnimationOptions)[]): PerformerFn;
};
export declare type WideSmile = typeof creatorFn & ReturnType<typeof GetCreatorFnProperties>;
declare const _default: WideSmile;
export default _default;
