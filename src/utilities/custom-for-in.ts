import hasOwnProperty from './has-own-property';

/**
 * Very similar to a "for in", however, it is optional go through the "prototype" and is more controllable.
 * @param objectForLoop
 * The object.
 *
 * @param callbackfn
 * A function that accepts up to three arguments. Calls the callbackfn function one time for each element in the array. If callbackfn returns any value that, if converted to boolean equals "true" the looping and terminating.
 *
 * @param avoid
 * A drive of "key" to jump or the key to start counting. The default value is "prototype" - ( avoiding the object's prototype reading ).
 *
 * @param thisArg
 * An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 */

export default function customForIn<
  Type extends
    | {
        [K in keyof Type]: Type[keyof Type];
      }
    | Type[]
>(
  objectForLoop: Type,
  callbackfn: (
    value: Type[keyof Type],
    index: keyof Type,
    objectInLoop: typeof objectForLoop
  ) => unknown,
  avoid: string | number | unknown[] = 'prototype',
  thisArg?: unknown
): boolean {
  const isInPrototype = Array.isArray(objectForLoop)
    ? (key: string | number) => {
        return Number.isNaN(Number(key));
      }
    : (key: string | number) => {
        return !hasOwnProperty(objectForLoop, key);
      };
  const avoidItems = Array.isArray(avoid);
  const jumps = avoidItems ? (avoid as string[]).join(' ') : '';
  let pass = avoidItems || !avoid || avoid === 'prototype';
  const getPrototype = avoid.toString().indexOf('prototype') !== -1;

  // eslint-disable-next-line
  for (const propertyName in objectForLoop) {
    if (
      !(getPrototype && isInPrototype(propertyName)) &&
      jumps.indexOf(propertyName) === -1 &&
      pass === true
    ) {
      const callbackfnCalled = callbackfn.call(
        thisArg,
        objectForLoop[propertyName as never],
        propertyName as keyof Type,
        objectForLoop
      );
      if (callbackfnCalled) return true;
    }
    if (!pass) pass = propertyName === avoid;
  }
  return false;
}
