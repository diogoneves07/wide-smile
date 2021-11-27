/**
 * Orders the array by growth values.
 */
export default function ordernateByGrowingValues(
  array: (string | number)[]
): number[] {
  return array.map(Number).sort((a, b) => {
    return a - b;
  });
}
