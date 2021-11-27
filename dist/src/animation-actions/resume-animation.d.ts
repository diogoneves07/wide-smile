import { AnimationInstance } from '../contracts/animation-inter';
/**
 * Resumes the animation that was paused.
 */
export default function resumeAnimation(requiredAnimationProperties: Pick<AnimationInstance, 'state' | 'animationId'>): void;
