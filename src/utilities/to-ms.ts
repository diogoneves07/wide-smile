/** Converts seconds to milliseconds. */

export default function toMs(seconds: number): number {
  return Math.floor(seconds * 1000);
}
