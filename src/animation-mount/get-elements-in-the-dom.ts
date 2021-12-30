import { AnimationOptions } from '../contracts/animation-inter';

export default function getElementsInTheDOM(
  targets: AnimationOptions['targets']
): HTMLElement[] {
  const elements: object[] = [];
  if (targets) {
    let targetForElements = targets;
    if (
      typeof targetForElements === 'string' ||
      (typeof targetForElements === 'object' &&
        !(targetForElements as unknown[])[0])
    ) {
      targetForElements = [targetForElements as never];
    } else {
      targetForElements = [].slice.call(targetForElements);
    }

    (targetForElements as (string | object)[]).forEach((elementOrSelector) => {
      if (typeof elementOrSelector === 'string') {
        [].slice
          .call(document.querySelectorAll(elementOrSelector))
          .forEach((elt) => {
            if (elements.indexOf(elt as HTMLElement) === -1) {
              elements.push(elt as HTMLElement);
            }
          });
      } else if (elements.indexOf(elementOrSelector) === -1) {
        if (elementOrSelector && typeof targetForElements === 'object') {
          elements.push(elementOrSelector);
        }
      }
    });
  }
  return elements as HTMLElement[];
}
