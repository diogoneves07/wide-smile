import AllNormalObject from './all-normal-objects';

type CreateObserverPropertyCallbackfn = (
  propertyValue: unknown,
  percentageCompleted: number,
  target: HTMLElement | AllNormalObject,
  index: number
) => void;

export default CreateObserverPropertyCallbackfn;
