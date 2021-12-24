import AnimationInstanceProperties from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';

const LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS: [
  PerformerFn,
  AnimationInstanceProperties
][] = [];

function getIndex(animationPerformer: PerformerFn) {
  for (
    let index = 0, l = LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.length;
    index < l;
    index += 1
  ) {
    if (
      LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS[index][0] ===
      animationPerformer
    ) {
      return index;
    }
  }
  return -1;
}

export function resetArrayOfLastAddedAnimationObjects(): void {
  LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.length = 0;
}

export function removeLastAnimationObjectAddedToPerformer(
  animationPerformer: PerformerFn
): void {
  const index = getIndex(animationPerformer);
  if (index > -1) {
    LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.splice(index, 1);
  }
}
export function addLastAnimationObjectAddedToPerformer(
  animationPerformer: PerformerFn,
  animationObject: AnimationInstanceProperties
): void {
  LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.unshift([
    animationPerformer,
    animationObject,
  ]);
}
export function getLastAnimationObjectAddedToPerformer(
  animationPerformer: PerformerFn
): AnimationInstanceProperties | undefined {
  const index = getIndex(animationPerformer);
  return index > -1
    ? LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS[index][1]
    : undefined;
}
