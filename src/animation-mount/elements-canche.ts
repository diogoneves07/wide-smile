import getEasyComputedStyle from '../utilities-style/get-easy-computed-style';
import getAppliedStyle from '../utilities-style/get-applied-style';
import customForIn from '../utilities/custom-for-in';
/* eslint-disable  import/prefer-default-export */

type ElementsCanche = Record<
  string,
  {
    target: HTMLElement;
    data: {
      computedStyle: CSSStyleDeclaration;
      bestComputedStyle: () => Record<string, string>;
      startComputedStyle: Record<string, string>;
    };
  }[]
>;

const ELEMENTS_CANCHE: ElementsCanche = {};

function bucketId(target: HTMLElement) {
  return (target.tagName || target.nodeName).toLowerCase();
}
type ElementData = typeof ELEMENTS_CANCHE[string][number]['data'];

function getElementCanche(
  target: HTMLElement
):
  | false
  | {
      data: ElementData;
      index: number;
      bucket: typeof ELEMENTS_CANCHE[string];
    } {
  const bucket = ELEMENTS_CANCHE[bucketId(target)];

  if (!bucket) {
    return false;
  }

  for (
    let counting = 0, { length } = bucket;
    counting < length;
    counting += 1
  ) {
    if (bucket[counting].target === target) {
      return { data: bucket[counting].data, index: counting, bucket };
    }
  }
  return false;
}

function createElementCanche(target: HTMLElement): ElementData {
  const hasBucket = bucketId(target);
  const bucket = ELEMENTS_CANCHE[hasBucket];
  const computedStyle = getEasyComputedStyle(target);
  const elementCancheObject = {
    target,
    data: {
      computedStyle,
      startComputedStyle: getAppliedStyle(target, computedStyle),
      bestComputedStyle: () => getAppliedStyle(target, computedStyle),
    },
  };

  if (bucket) {
    bucket.push(elementCancheObject);
  } else {
    ELEMENTS_CANCHE[hasBucket] = [elementCancheObject];
  }

  return elementCancheObject.data;
}

type ElementDataWithMethods = Required<ElementData>;

export function useElementCanche(target: HTMLElement): ElementDataWithMethods {
  const elementCancheContainer = getElementCanche(target);
  const elementData = elementCancheContainer
    ? elementCancheContainer.data
    : createElementCanche(target);

  return (elementData as unknown) as ElementDataWithMethods;
}

/**
 * Auto removes elements removed from the DOM.
 */
setInterval(() => {
  customForIn(ELEMENTS_CANCHE, (bucket) => {
    bucket.slice().forEach((o, index) => {
      const { target } = o;
      if (!target.parentElement && !target.parentNode) {
        bucket.splice(index, 1);
      }
    });
  });
}, 500);
