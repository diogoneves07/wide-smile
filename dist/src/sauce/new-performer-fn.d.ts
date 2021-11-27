import PerformerFn from '../contracts/performer-fn';
import { AnimationInstance, UserAnimationOptions } from '../contracts/animation-inter';
declare const NewPerformerFn: (performerProperties: UserAnimationOptions, creator: AnimationInstance['creator']) => PerformerFn;
export default NewPerformerFn;
