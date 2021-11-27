export default function hasOwnProperty(
  object: object,
  key: string | number | symbol
): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function hasOwnPropertyTarget(
  object: object,
  key: string | number | symbol
): boolean {
  return object && key in object;
}
