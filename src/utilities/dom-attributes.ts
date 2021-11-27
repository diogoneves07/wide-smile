export function getAttr(element: HTMLElement, attrName: string): string | null {
  return element.getAttribute(attrName);
}

export function setAttr(
  element: HTMLElement,
  attrName: string,
  attrValue: string
): void {
  return element.setAttribute(attrName, attrValue);
}

export function removeAttr(element: HTMLElement, attrName: string): void {
  return element.removeAttribute(attrName);
}
