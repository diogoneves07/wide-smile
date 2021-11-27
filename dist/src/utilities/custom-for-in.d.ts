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
export default function customForIn<Type extends {
    [K in keyof Type]: Type[keyof Type];
} | Type[]>(objectForLoop: Type, callbackfn: (value: Type[keyof Type], index: keyof Type, objectInLoop: typeof objectForLoop) => unknown, avoid?: string | number | unknown[], thisArg?: unknown): boolean;
