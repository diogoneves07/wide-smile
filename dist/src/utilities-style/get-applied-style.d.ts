/**
 * Gets the computed style of the element. Only properties that actually have value, shorthand properties, or with empty value are discarded.
 */
export default function getAppliedStyle(element: HTMLElement, computedStyle: CSSStyleDeclaration): Record<string, string>;
