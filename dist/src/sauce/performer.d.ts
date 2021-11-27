import { AnimationPerformerProperties, UserAnimationObject, AnimationPerformer } from '../contracts/user-animation-objects';
declare const NewAnimationPerformer: (obj: Partial<AnimationPerformerProperties>, creator: UserAnimationObject['creator']) => AnimationPerformer;
export default NewAnimationPerformer;
