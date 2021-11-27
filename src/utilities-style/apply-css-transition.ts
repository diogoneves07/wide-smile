import getVendorCSSProperty from './get-vendor-css-property';
/**
 * Applies a transition to certain CSS properties.
 * @param element
 * An HTML element
 *
 * @param transitionValue
 *
 * @param CSSStyleRules
 * A value for the "transition" CSS property.
 */
export default function applyCSSTransition(
  element: HTMLElement,
  transitionValue: string,
  CSSStyleRules: string
): void {
  const elementStyle = element.style;

  elementStyle.cssText = `${
    elementStyle.cssText + getVendorCSSProperty('transition', transitionValue)
  }:${transitionValue};${CSSStyleRules}`;
}
