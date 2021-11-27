/**
 * Splits the CSS properties and their values into a array.
 */

export default function splitCSSProperties(CSSStringRules: string): string[] {
  let lastIndex = 0;
  const propertiesSplited: string[] = [];
  const style = CSSStringRules.replace(/(;)/g, '; ').replace(/( {2})/g, ' ');
  style.replace(/[:()[\] ,=]/g, (a: string, b: number) => {
    const s = style.substring(lastIndex, b);
    if (s) {
      propertiesSplited.push(s);
    }

    propertiesSplited.push(a);
    lastIndex = b + 1;

    return a;
  });
  propertiesSplited.push(style.substring(lastIndex, Infinity));

  return propertiesSplited;
}
