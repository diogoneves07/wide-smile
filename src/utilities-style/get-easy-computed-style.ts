/**
 * Gets the calculated style of the element.
 */
export default function getEasyComputedStyle(
  element: HTMLElement
): CSSStyleDeclaration {
  let view: (Window & typeof globalThis) | null =
    element.ownerDocument.defaultView;
  if (!view || !view.opener) {
    view = window;
  }
  return view.getComputedStyle(element);
}
