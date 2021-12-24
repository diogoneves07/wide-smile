import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
export default function applyCallbackForFutureAnimations(performer: PerformerFn, callback: (animation: AnimationInstance) => void): void;
