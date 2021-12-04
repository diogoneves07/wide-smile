import { AnimationInstance, AnimationInstancePropertiesAllWritable, PropertiesForTheCreationOfAnimation, UserAnimationObjectInternal } from '../contracts/animation-inter';
import { ListenersEventsName } from '../contracts/listeners-events-name';
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
    on(eventName: ListenersEventsName, callbackfn: (this: this, eventName: string, animation: this) => unknown): this;
    off(eventName: ListenersEventsName, callbackfnOrIndex: Function | number): this;
}
export default AnimationWS;
