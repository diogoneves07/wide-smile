import PerformerFn from '../contracts/performer-fn';

export default function getPropertyName(
  performer: PerformerFn,
  name: string | number
): string {
  const n = parseFloat(name.toString());
  if (performer.$hidden.orderOfThePropertiesUsed[n]) {
    return performer.$hidden.orderOfThePropertiesUsed[n];
  }
  return name.toString();
}
