import PerformerFn from '../contracts/performer-fn';
import getUnit from '../utilities/get-unit';

export default function getPropertyName(
  performer: PerformerFn,
  name: string
): string {
  if (!getUnit(name)) {
    const n = parseFloat(name);
    if (performer.$hidden.orderOfThePropertiesUsed[n]) {
      return performer.$hidden.orderOfThePropertiesUsed[n];
    }
  }
  return name;
}
