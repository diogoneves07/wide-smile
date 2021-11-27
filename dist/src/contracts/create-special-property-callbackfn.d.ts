import AllNormalObject from './all-normal-objects';
import AnimableProperties from './animable-properties';
import FunctionForPropertyValueInKeyframe from './function-for-property-value-in-keyframe';
declare type CreateSpecialPropertyCallbackfn = (value: string | FunctionForPropertyValueInKeyframe | number, target: HTMLElement | AllNormalObject, index: number) => Record<string, string | FunctionForPropertyValueInKeyframe | number> | Record<AnimableProperties, string | FunctionForPropertyValueInKeyframe | number>;
export default CreateSpecialPropertyCallbackfn;
