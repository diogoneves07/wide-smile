/* eslint-disable */

if (!Array.isArray) {
  Array.isArray = (arg: unknown): arg is unknown[] => {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value(target: any) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      const to = Object(target);
      for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        const keysArray = Object.keys(Object(nextSource));
        for (
          let nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex++
        ) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    },
  });
}

(() => {
  const CSS_VENDORS = 'ms moz webkit o'.split(' ');
  for (
    let x = 0;
    x < CSS_VENDORS.length && !window.requestAnimationFrame;
    x += 1
  ) {
    if (window[`${CSS_VENDORS[x]}RequestAnimationFrame` as never]) {
      (window as any).requestAnimationFrame =
        window[`${CSS_VENDORS[x]}RequestAnimationFrame` as never];
    }
    if (window[`${CSS_VENDORS[x]}CancelAnimationFrame` as never]) {
      (window as any).cancelAnimationFrame =
        window[`${CSS_VENDORS[x]}CancelAnimationFrame` as never];
    } else if (
      window[`${CSS_VENDORS[x]}CancelRequestAnimationFrame` as never]
    ) {
      (window as any).cancelAnimationFrame =
        window[`${CSS_VENDORS[x]}CancelRequestAnimationFrame` as never];
    }
  }
})();

Number.isNaN =
  Number.isNaN ||
  function isNaN(input: unknown) {
    return typeof input === 'number' && input !== input;
  };
