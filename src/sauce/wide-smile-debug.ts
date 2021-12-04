import { AnimationInstance } from '../contracts/animation-inter';

export default function debugAnimation(
  animation: AnimationInstance,
  message: string,
  callbackTest?: () => boolean
): void {
  const check = callbackTest ? callbackTest() : true;
  if (check)
    throw new Error(
      `\n\n<CreatorFn>: \n\n| AnimationWS object name: ${animation.animationId} | \n\n--> ${message}\n\n`
    );
}

export function debugNormal(
  type: string,
  message: string,
  callbackTest?: () => boolean
): void {
  const check = callbackTest ? callbackTest() : true;
  if (check)
    throw new Error(
      `\n\n<CreatorFn>: \n\n| Where or what happened: ${type} | \n\n--> ${message}\n\n`
    );
}
