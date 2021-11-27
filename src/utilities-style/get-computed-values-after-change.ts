import applyCSSTransition from './apply-css-transition';
import propertyInStyleObject from './property-in-style-object';
import removesImportantString from './removes-important-string';
import CSSPropertiesImportant from './css-properties-important';
import { customForIn, toCamelCase } from '../utilities/index';
import { useElementCanche } from '../sauce/elements-canche';
import CSSStringRulesToObject from './css-string-rules-to-object';
import getLinkedCSSProperties from './get-linked-css-properties';
import reduceCSSStringRules from './reduce-css-string-rules';

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

export default function getComputedValuesAfterChange(
  element: HTMLElement,
  CSSStringRules: string
): {
  before: Record<string, string>;
  after: Record<string, string>;
  beforeComputedStyle: Record<string, string>;
  afterComputedStyle: Record<string, string>;
} {
  const elementCSSText = element.style.cssText;
  const elementStyle = element.style;
  const elementCanche = useElementCanche(element);

  const affectedCSSProperties: Record<string, string> = {};
  const affectedCSSPropertiesInitialValues: Record<string, string> = {};

  const bestCSSStringRules = reduceCSSStringRules(CSSStringRules);

  const beforeComputedStyle = elementCanche.bestComputedStyle();

  applyCSSTransition(
    element,
    'all linear 0s',
    CSSPropertiesImportant(`${bestCSSStringRules}`)
  );

  const afterComputedStyle = elementCanche.bestComputedStyle();

  const linkedCSSProperties: typeof afterComputedStyle = {};
  customForIn(
    CSSStringRulesToObject(bestCSSStringRules),
    (propertyValue, propertyName) => {
      getLinkedCSSProperties(
        propertyName as string,
        propertyValue as string
      ).forEach((property) => {
        linkedCSSProperties[toCamelCase(property)] = propertyValue as string;
      });
    }
  );

  customForIn(linkedCSSProperties, (_value, propertyName) => {
    const pName = (propertyName as unknown) as string;
    if (!propertyInStyleObject(pName, affectedCSSProperties)) {
      if (afterComputedStyle[pName] && pName !== 'cssText') {
        affectedCSSProperties[pName] = afterComputedStyle[pName];

        affectedCSSPropertiesInitialValues[pName] = beforeComputedStyle[pName];
      }
    }
  });

  customForIn(affectedCSSProperties, (propertyValue, propertyName) => {
    affectedCSSProperties[propertyName] = removesImportantString(
      propertyValue as string
    );

    affectedCSSPropertiesInitialValues[propertyName] = removesImportantString(
      beforeComputedStyle[propertyName as string]
    );
  });

  elementStyle.cssText = elementCSSText;
  return {
    before: affectedCSSPropertiesInitialValues,
    after: affectedCSSProperties,
    beforeComputedStyle,
    afterComputedStyle,
  };
}
