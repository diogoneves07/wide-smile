export default function multiplyValue(value: number, multiply: number): number {
  const duration = Math.abs(multiply) * value;
  return multiply > 0 ? value + duration : Math.max(value - duration, 0);
}
