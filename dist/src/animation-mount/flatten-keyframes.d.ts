import Keyframes from '../contracts/key-frames';
import { PerformerFnProperties } from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import PropertiesToAnimateObjectKeyframes from '../contracts/properties-to-animate-object-keyframes';
export default function flattenKeyframes(keyframes: Keyframes | PropertiesToAnimateObject, propertiesUsed: PerformerFnProperties['propertiesUsed']): PropertiesToAnimateObjectKeyframes;
