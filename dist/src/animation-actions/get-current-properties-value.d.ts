import AllAnimableProperties from '../contracts/animable-properties';
import CurrentPropertyValue from '../contracts/current-property-value';
import PerformerFn from '../contracts/performer-fn';
export default function getCurrentPropertiesValue(performer: PerformerFn, name: AllAnimableProperties | string): CurrentPropertyValue | undefined;
