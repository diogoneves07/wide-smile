export default function getScrollValues(
  target: HTMLElement,
  to: string
): {
  scrollTop: string;
  scrollLeft: string;
} {
  const scrollHeight = target.scrollHeight;
  const scrollWidth = target.scrollWidth;
  const clientHeight = target.clientHeight;
  const clientWidth = target.clientWidth;
  const scrollValues = (value: string | number, maxValue: number) => {
    let v = value;
    v = typeof v === 'number' ? v.toString() : v;
    let r = parseFloat(v);

    if (v.indexOf('%') > -1) {
      r = (maxValue / 100) * Math.floor(parseFloat(v));
    }

    v = r > maxValue || v.indexOf('max') > -1 ? maxValue : r;

    return v.toString();
  };

  return {
    scrollTop: scrollValues(to, scrollHeight - clientHeight),
    scrollLeft: scrollValues(to, scrollWidth - clientWidth),
  };
}
