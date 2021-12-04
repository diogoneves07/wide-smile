import AllAnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';
declare type PropertiesToAnimateObjectKeyframes = Record<AllAnimableProperties, Record<string, ValuesToAnimateProperty>> | Record<string, Record<string, ValuesToAnimateProperty>>;
export default PropertiesToAnimateObjectKeyframes;
