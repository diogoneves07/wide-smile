export default function isDOMElement(e: object): boolean {
  return (e as HTMLElement).nodeType ? true : false || e instanceof SVGElement;
}
