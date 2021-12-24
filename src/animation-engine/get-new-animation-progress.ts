import { MAX_KEYFRAME, ANIMATION_DIRECTIONS } from '../sauce/constants';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { getRandomKey } from '../utilities/index';
import { AnimationInstance } from '../contracts/animation-inter';

export default function getNewAnimationProgress(
  animationAuxiliaryObject: Pick<
    AnimationAuxiliaryObject,
    'countDriveLoops' | 'keyframesKeys' | 'lastStartProgress'
  > & {
    animation: Pick<
      AnimationInstance,
      'dir' | 'count' | 'drive' | 'dur' | 'max' | 'progressValue'
    >;
  }
): Pick<AnimationAuxiliaryObject, 'countDriveLoops'> & {
  maxProgress: AnimationInstance['max'];
  progress: AnimationInstance['progressValue'];
} {
  const a = animationAuxiliaryObject;
  const { keyframesKeys, animation } = a;
  let { countDriveLoops } = a;
  let maxProgress = animation.max;
  let progress = animation.progressValue;

  const drive = animation.drive as Exclude<typeof animation.drive, Function>;

  let driveEasy = typeof drive === 'string' ? drive : '';

  const listOfProgress = typeof drive === 'number' ? [drive] : drive;

  const takeControlOfTheDrive = Array.isArray(listOfProgress)
    ? listOfProgress[countDriveLoops] &&
      typeof listOfProgress[countDriveLoops] === 'string'
    : false;

  const direction = animation.dir;

  const iterationsCompleted = animation.count;

  const progressStoppedAt = progress || 0;

  if (takeControlOfTheDrive) {
    driveEasy = listOfProgress[countDriveLoops] as string;
  }
  progress = progressStoppedAt;
  if (driveEasy === ANIMATION_DIRECTIONS[6]) {
    maxProgress = getRandomKey(keyframesKeys, progressStoppedAt);
  } else if (driveEasy === ANIMATION_DIRECTIONS[7]) {
    do {
      maxProgress = Math.round(Math.random() * MAX_KEYFRAME);
    } while (Math.abs(progressStoppedAt - maxProgress) < 20);
  } else if (
    driveEasy === ANIMATION_DIRECTIONS[4] ||
    driveEasy === ANIMATION_DIRECTIONS[5]
  ) {
    maxProgress = getRandomKey(keyframesKeys, progressStoppedAt);
    progress = 0;
  } else if (
    direction === ANIMATION_DIRECTIONS[1] ||
    (direction === ANIMATION_DIRECTIONS[2] && iterationsCompleted % 2 === 1) ||
    (direction === ANIMATION_DIRECTIONS[3] && iterationsCompleted % 2 === 0)
  ) {
    progress = MAX_KEYFRAME;
    maxProgress = 0;
  } else {
    progress = 0;
    maxProgress = MAX_KEYFRAME;
  }

  if (!takeControlOfTheDrive && Array.isArray(listOfProgress)) {
    const hasMaxProgress = listOfProgress[countDriveLoops];
    if (
      countDriveLoops < listOfProgress.length ||
      hasMaxProgress === Infinity
    ) {
      if (hasMaxProgress === Infinity) {
        countDriveLoops = 0;
      }
      const n = listOfProgress[countDriveLoops];
      if (Array.isArray(n)) {
        maxProgress = (typeof n[1] === 'number' ? n[1] : maxProgress) as number;

        progress = n[0] as number;
      } else {
        maxProgress = (typeof n === 'number' ? n : maxProgress) as number;

        progress = progressStoppedAt;
      }

      countDriveLoops += 1;
      if (countDriveLoops >= listOfProgress.length) {
        countDriveLoops = 0;
      }
    }
  }

  return {
    countDriveLoops,
    progress,
    maxProgress,
  };
}
