import {
  AnimationInstancePropertiesAllWritable,
  UserAnimationObjectInternal,
} from '../contracts/animation-inter';

/**
 * A simple counter that helps to mark animation objects through the `animationId` property to avoid collisions and also indicates the priority of the animation instance's style insertion.
 */
let ANIMATIONS_ID = -1;

export default function AnimationConstructor(
  animationInstance:
    | AnimationInstancePropertiesAllWritable
    | UserAnimationObjectInternal,
  creator: UserAnimationObjectInternal['creator']
): AnimationInstancePropertiesAllWritable {
  const D_A_P = creator.dfs;
  ANIMATIONS_ID += 1;
  return {
    ...D_A_P,
    ...animationInstance,
    ...{
      creator,

      targets: animationInstance.targets,

      loop: animationInstance.loop,

      count: 0,

      animationId: ANIMATIONS_ID,
    },
  } as AnimationInstancePropertiesAllWritable;
}
