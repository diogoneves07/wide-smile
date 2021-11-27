import { ConcreteAnimationObject, UserAnimationObject } from '../contracts/index';
/**
 * Defines the direction of the animation iteration.
 */
export default function setAnimationDirection(requiredAnimationProperties: Pick<ConcreteAnimationObject, 'countDriveloop' | 'progress' | 'maxProgress' | 'keyframesKeys'> & {
    userAnimationObject: Pick<UserAnimationObject, 'dir' | 'count' | 'drive' | 'dur'>;
}): Pick<ConcreteAnimationObject, 'countDriveloop' | 'progress' | 'maxProgress'>;
