export default function isDirValue(s: string): boolean {
  switch (s) {
    case 'normal':
    case 'reverse':
    case 'alternate':
    case 'alternate-reverse':
      return true;

    default:
      return false;
  }
}
