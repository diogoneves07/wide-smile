import AnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';

type PropertiesToAnimateObject =
  | Record<
      AnimableProperties & string,
      ValuesToAnimateProperty | ValuesToAnimateProperty[]
    >
  | Record<string, ValuesToAnimateProperty | ValuesToAnimateProperty[]>;

export default PropertiesToAnimateObject;
