import AllAnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';

type PropertiesToAnimateObject =
  | Record<
      AllAnimableProperties & string,
      ValuesToAnimateProperty | ValuesToAnimateProperty[]
    >
  | Record<string, ValuesToAnimateProperty | ValuesToAnimateProperty[]>;

export default PropertiesToAnimateObject;
