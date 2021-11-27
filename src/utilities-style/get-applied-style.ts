import { toCamelCase } from '../utilities/index';

function augmentDimension(
  name: 'width' | 'height',
  elementStyleObject: CSSStyleDeclaration
): number {
  const isBorderBox =
    elementStyleObject.boxSizing.toString().toLowerCase() === 'border-box';

  if (isBorderBox) {
    const sides = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
    const fields = [
      `padding${sides[0]}`,
      `padding${sides[1]}`,
      `border${sides[0]}Width`,
      `border${sides[1]}Width`,
    ];
    let augment = 0;

    fields.forEach((field) => {
      const value = parseFloat(elementStyleObject[field as never]);
      if (!Number.isNaN(value)) {
        augment += value;
      }
    });
    return -augment;
  }

  return 0;
}

function getWidthHeight(
  element: HTMLElement,
  property: 'width' | 'height',
  elementStyleObject: CSSStyleDeclaration
): string {
  return `${
    element.getBoundingClientRect()[property] +
    augmentDimension(property, elementStyleObject)
  }px`;
}

/**
 * Normalizes some CSS properties that have not had a set value.
 *
 * @example
 * [ 'top', 'left', 'bottom', 'right', 'width', 'height' ]
 */
function computePropertiesValue(
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): Record<string, string> {
  const elementStyle = element.style;
  const elementCSSText = elementStyle.cssText;

  const currentComputedStyleForUse = computedStyle;

  const currentComputedStyle = currentComputedStyleForUse;

  const inDisplayNone =
    currentComputedStyle.getPropertyValue('display') === 'none';

  if (inDisplayNone) {
    elementStyle.display = 'initial';
    elementStyle.cssText = elementCSSText;
  }
  const propertiesToBeHandled: Record<string, string> = {};

  ['top', 'left', 'bottom', 'right', 'width', 'height'].forEach(
    (propertyName) => {
      let computedValue: string | number = 0;

      if (
        inDisplayNone &&
        (propertyName === 'width' || propertyName === 'height')
      ) {
        elementStyle.display = 'initial';

        computedValue = getWidthHeight(
          element,
          propertyName as 'width' | 'height',
          currentComputedStyleForUse
        );

        elementStyle.cssText = elementCSSText;

        propertiesToBeHandled[propertyName] = String(computedValue);
      } else {
        computedValue = currentComputedStyle[propertyName as never];

        if (!computedValue) {
          computedValue = element.style[(propertyName as unknown) as number];
        }

        if (computedValue === 'auto') {
          if (propertyName === 'width' || propertyName === 'height') {
            computedValue = getWidthHeight(
              element,
              propertyName,
              currentComputedStyle
            );
          } else {
            let checkProperty: number;
            switch (propertyName) {
              case 'top':
              case 'left':
                checkProperty = 1;
                break;

              case 'right':
              case 'bottom':
                checkProperty = 2;
                break;

              default:
                checkProperty = 0;
                break;
            }
            if (checkProperty) {
              const { position } = currentComputedStyle;

              if (
                position === 'fixed' ||
                (checkProperty === 1 && position === 'absolute')
              ) {
                if (inDisplayNone) {
                  elementStyle.display = 'initial';
                }
                computedValue = `${
                  element.getBoundingClientRect()[
                    propertyName as 'top' | 'left' | 'bottom' | 'right'
                  ]
                }px`;

                elementStyle.cssText = elementCSSText;
              } else {
                computedValue = '0px';
              }
            }
          }
        }
        propertiesToBeHandled[propertyName] = computedValue
          ? String(computedValue)
          : '';
      }
    }
  );
  return propertiesToBeHandled;
}

/**
 * Gets the computed style of the element. Only properties that actually have value, shorthand properties, or with empty value are discarded.
 */
export default function getAppliedStyle(
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): Record<string, string> {
  const bestStyleComputed = computePropertiesValue(element, computedStyle);
  const appliedStyle: Record<string, string> = {};
  let counting = 0;
  let propertyName = computedStyle.item(counting);

  while (propertyName !== '') {
    const propertyNameInCamelCase = toCamelCase(propertyName);
    const propertyValue = computedStyle.getPropertyValue(propertyName);
    if (propertyValue !== '') {
      appliedStyle[propertyNameInCamelCase] =
        bestStyleComputed[propertyNameInCamelCase] || propertyValue;
    }
    counting += 1;
    propertyName = computedStyle.item(counting);
  }

  return appliedStyle;
}
