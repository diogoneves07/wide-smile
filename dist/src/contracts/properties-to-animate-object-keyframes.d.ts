import AnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';
declare type PropertiesToAnimateObjectKeyframes = Record<AnimableProperties, Record<string, ValuesToAnimateProperty>> | Record<string, Record<string, ValuesToAnimateProperty>>;
export default PropertiesToAnimateObjectKeyframes;
