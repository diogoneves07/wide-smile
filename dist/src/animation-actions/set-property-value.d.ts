import AllAnimableProperties from '../contracts/animable-properties';
import PerformerFn from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
export default function setPropertyValue(performer: PerformerFn, properties: AllAnimableProperties | string | PropertiesToAnimateObject, propertyValue?: ValuesToAnimateProperty | ValuesToAnimateProperty[]): void;
