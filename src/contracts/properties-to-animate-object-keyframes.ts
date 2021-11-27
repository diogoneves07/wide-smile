import AnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';

type PropertiesToAnimateObjectKeyframes =
  | Record<AnimableProperties, Record<string, ValuesToAnimateProperty>>
  | Record<string, Record<string, ValuesToAnimateProperty>>;

export default PropertiesToAnimateObjectKeyframes;
