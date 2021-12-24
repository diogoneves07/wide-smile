import AllNormalObject from './all-normal-objects';
declare type CreateObserverPropertyCallbackfn = (propertyValue: unknown, percentageCompleted: number, target: HTMLElement | AllNormalObject, index: number) => unknown;
export default CreateObserverPropertyCallbackfn;
