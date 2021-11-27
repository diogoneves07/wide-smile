import { isNumber } from '../sauce/types';
import { MAX_KEYFRAME, ANIMATION_DIRECTIONS } from '../sauce/constants';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import { getRandomKey } from '../utilities/index';
import { AnimationInstance } from '../contracts/animation-inter';

/**
 * Defines the direction of the animation iteration.
 */
export default function setAnimationProgress(
  animationAuxiliaryObject: Pick<
    AnimationAuxiliaryObject,
    'countDriveloop' | 'keyframesKeys' | 'lastStartProgress'
  > & {
    animationInstance: Pick<
      AnimationInstance,
      'dir' | 'count' | 'drive' | 'dur' | 'max' | 'progressValue'
    >;
  }
): Pick<AnimationAuxiliaryObject, 'countDriveloop'> & {
  maxProgress: AnimationInstance['max'];
  progress: AnimationInstance['progressValue'];
} {
  const a = animationAuxiliaryObject;
  const { keyframesKeys, animationInstance } = a;
  let { countDriveloop } = a;
  let maxProgress = animationInstance.max;
  let progress = animationInstance.progressValue;

  const drive = animationInstance.drive as Exclude<
    typeof animationInstance.drive,
    Function
  >;

  let driveEasy = typeof drive === 'string' ? drive : '';

  const listOfProgress = typeof drive === 'number' ? [drive] : drive;

  const takeControlOfTheDrive = Array.isArray(listOfProgress)
    ? listOfProgress[countDriveloop] &&
      typeof listOfProgress[countDriveloop] === 'string'
    : false;

  const direction = animationInstance.dir;

  const iterationsCompleted = animationInstance.count;

  const progressStoppedAt = progress || 0;

  if (takeControlOfTheDrive) {
    driveEasy = listOfProgress[countDriveloop] as string;
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
    const hasMaxProgress = listOfProgress[countDriveloop];
    if (countDriveloop < listOfProgress.length || hasMaxProgress === Infinity) {
      if (hasMaxProgress === Infinity) {
        countDriveloop = 0;
      }
      const n = listOfProgress[countDriveloop];
      if (Array.isArray(n)) {
        maxProgress = (isNumber(n[1]) ? n[1] : maxProgress) as number;

        progress = n[0] as number;
      } else {
        maxProgress = (isNumber(n) ? n : maxProgress) as number;

        progress = progressStoppedAt;
      }

      countDriveloop += 1;
      if (countDriveloop >= listOfProgress.length) {
        countDriveloop = 0;
      }
    }
  }

  return {
    countDriveloop,
    progress,
    maxProgress,
  };
}
