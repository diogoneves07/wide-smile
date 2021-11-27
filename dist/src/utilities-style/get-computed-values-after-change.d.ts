/**
 * Gets the CSS properties that would be changed in the element if there was the application of a determined style.
 *
 * @param element
 * An HTML element.
 *
 * @param CSSStringRules
 * The style to be applied.
 *
 * @param getTheseProperties
 * Indicates which properties should be read.
 *
 * @param initialStyle
 * Save the style as the initial style for the properties.
 */
export default function getComputedValuesAfterChange(element: HTMLElement, CSSStringRules: string): {
    before: Record<string, string>;
    after: Record<string, string>;
    beforeComputedStyle: Record<string, string>;
    afterComputedStyle: Record<string, string>;
};
