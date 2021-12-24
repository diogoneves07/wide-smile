import stagger from '../based-implementations/stagger';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import parserStringStagger from './parser-string-stagger';

export function getRealPropertyValue(
  propertyValue: ValuesToAnimateProperty,
  target: object,
  index: number,
  length: number
): string;
export function getRealPropertyValue(
  propertyValue: ValuesToAnimateProperty,
  target: HTMLElement,
  index: number,
  length: number
): string;
export function getRealPropertyValue(
  propertyValue: ValuesToAnimateProperty,
  target: unknown,
  index: number,
  length: number
): string {
  const value =
    typeof propertyValue === 'string'
      ? ((v) => (typeof v === 'object' ? stagger(v) : v))(
          parserStringStagger(propertyValue)
        )
      : propertyValue;
  switch (typeof value) {
    case 'number':
      return (value as number).toString() as string;

    case 'function':
      return (value as Function)(target, index, length).toString() as string;

    default:
      return (value as unknown) as string;
  }
}
