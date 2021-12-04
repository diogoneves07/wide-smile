import AllNormalObject from './all-normal-objects';
import AllAnimableProperties from './animable-properties';
import FunctionForPropertyValueInKeyframe from './function-for-property-value-in-keyframe';

type CreateSpecialPropertyCallbackfn = (
  value: string | FunctionForPropertyValueInKeyframe | number,
  target: HTMLElement | AllNormalObject,
  index: number
) =>
  | Record<string, string | FunctionForPropertyValueInKeyframe | number>
  | Record<
      AllAnimableProperties,
      string | FunctionForPropertyValueInKeyframe | number
    >;
export default CreateSpecialPropertyCallbackfn;
