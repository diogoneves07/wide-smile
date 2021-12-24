export default function WideSmileDebug(
  type: string,
  message: string,
  callbackTest?: () => boolean
): void {
  const check = callbackTest ? callbackTest() : true;
  if (check)
    throw new Error(
      `\n\n<WideSmile>: \n\n| Where or what happened: ${type} | \n\n--> ${message}\n\n`
    );
}
