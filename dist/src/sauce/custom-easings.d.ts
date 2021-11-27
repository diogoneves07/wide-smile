import EasingFunction from '../contracts/easing-function';
export declare function registerCustomEasing(name: string, callback: EasingFunction): void;
export declare function getCustomEasing(name: string): EasingFunction | undefined;
