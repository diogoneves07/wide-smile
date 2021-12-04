export declare function normalizePastedProperties<Type extends object>(obj: Type, loopObject?: boolean): Type;
/**
 * Normalize object properties that have been pasted to be able to share the same value.
 * @example
 * input = {
 *  firstname_lastname: 'Neves'
 * }
 *
 * output = {
 *  firstname: 'Neves'
 *  lastname: 'Neves'
 * }
 *
 */
export default function normalizePastedAnimationProperties<Type extends object>(animation: Type): Type;
