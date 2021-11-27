/**
 * Gets a random key.
 * @param keys
 * The array of numeric values.
 *
 * @param lastkey
 * The array of numeric values.
 */
export default function getRandomKey(keys: number[], lastkey = 0): number {
  const selected: number = Math.floor(Math.random() * keys.length);
  return keys[selected] === lastkey
    ? keys[selected - 1 >= 0 ? selected - 1 : selected + 1]
    : keys[selected];
}
