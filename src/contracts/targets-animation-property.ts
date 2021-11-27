import AllNormalObject from './all-normal-objects';

type TargetsAnimationProperty = {
  target: HTMLElement | AllNormalObject;
  index: number;
  originalArrayLength: number;
}[];

export default TargetsAnimationProperty;
