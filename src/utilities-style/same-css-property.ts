import { CSS_VENDORS, CSS_VENDORS_LENGTH } from '../sauce/constants';
import toCSSKebabCase from './to-css-kebab-case';

/**
 * Compares whether the properties are the same despite the vendor.
 */
export default function sameCSSProperty(
  property: string,
  propertyVendor: string
): boolean {
  const CSSProperty = toCSSKebabCase(property);
  const CSSPropertyVendor = toCSSKebabCase(propertyVendor);
  if (CSSProperty === CSSPropertyVendor) {
    return true;
  }

  for (let counting = CSS_VENDORS_LENGTH - 1; counting > -1; counting -= 1) {
    if (`-${CSS_VENDORS[counting]}-${CSSProperty}` === CSSPropertyVendor) {
      return true;
    }
  }
  return false;
}
