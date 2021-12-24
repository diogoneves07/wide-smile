import { AnimationInstance, AnimationInstancePropertiesAllWritable, AnimationOptions, PropertiesForTheCreationOfAnimation, UserAnimationObjectInternal } from '../contracts/animation-inter';
import { ListenersEventsName } from '../contracts/listeners-events-name';
import PerformerFn from '../contracts/performer-fn';
import AllAnimableProperties from '../contracts/animable-properties';
interface AnimationWS extends AnimationInstance {
    [key: string]: unknown;
}
declare class AnimationWS implements AnimationInstance {
    constructor(animation: AnimationInstancePropertiesAllWritable | UserAnimationObjectInternal | PropertiesForTheCreationOfAnimation, creator: AnimationInstance['creator']);
    load(): this;
    play(): this;
    pause(): this;
    resume(): this;
    restart(): this;
    end(): this;
    go(part: number): this;
    back(part: number): this;
    jump(part: number): this;
    speed(multiply: number): this;
    revert(endIteration?: boolean): this;
    dirTo(dir: Parameters<AnimationInstance['dirTo']>['0']): this;
    cancel(): this;
    destroy(removeChanges?: true): boolean;
    on(eventName: ListenersEventsName | AllAnimableProperties | string, callbackfn: (this: PerformerFn, item: unknown, performerFn: PerformerFn) => unknown): this;
    off(eventName: ListenersEventsName | AllAnimableProperties | string, callbackfnUsed: Function): this;
    remove(...names: (AllAnimableProperties | string)[]): this;
    removeTarget(targets: AnimationOptions['targets']): this;
}
export default AnimationWS;
