import AllAnimableProperties from './animable-properties';
import ValuesToAnimateProperty from './values-to-animate-property';

type PropertiesToAnimateObject =
  | Record<
      (AllAnimableProperties & string) | 'offset' | '_',
      ValuesToAnimateProperty | ValuesToAnimateProperty[]
    >
  | Record<string, ValuesToAnimateProperty | ValuesToAnimateProperty[]>
  | {
      [key: string]: unknown;
      offset?: number | number[];
      _?: number | number[];
    };

export default PropertiesToAnimateObject;
