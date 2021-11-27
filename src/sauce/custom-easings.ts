import EasingFunction from '../contracts/easing-function';

const CUSTOM_EASINGS: Record<string, EasingFunction> = {};
export function registerCustomEasing(
  name: string,
  callback: EasingFunction
): void {
  CUSTOM_EASINGS[name] = callback;
}

export function getCustomEasing(name: string): EasingFunction | undefined {
  return CUSTOM_EASINGS[name];
}
