import Keyframes from '../contracts/key-frames';
import { PerformerFnProperties } from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
export default function flattenKeyframes(keyframes: Keyframes | PropertiesToAnimateObject, orderOfThePropertiesUsed?: PerformerFnProperties['orderOfThePropertiesUsed']): {
    keyframes: Record<string, Record<string, ValuesToAnimateProperty>>;
    orderOfThePropertiesUsed: string[];
};
