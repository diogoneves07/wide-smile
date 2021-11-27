import { AnimationOptions } from '../contracts/animation-inter';
import { ANIMATION_STATES } from './constants';

const DEFAULTS_ANIMATION_PROPERTIES_VALUES = {
  targets: undefined,
  dir: 'normal',
  loop: 1,
  dur: 1,
  easing: 'linear',
  progressValue: undefined,
  progress: undefined,
  delay: -1,
  endDelay: -1,
  state: ANIMATION_STATES[0],
  drive: 'normal',
  autoDestroy: false,
  autoPlay: true,
  removeChanges: false,
  pauseDocHidden: true,
  round: 0,
} as AnimationOptions;
export default DEFAULTS_ANIMATION_PROPERTIES_VALUES;
