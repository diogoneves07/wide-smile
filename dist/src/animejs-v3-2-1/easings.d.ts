import { EasingFunction } from '../contracts/user-animation-objects';
export declare function applyArguments(func: Function, args: number[]): EasingFunction;
export declare function parseEasings(easing: string | Function, duration?: number): EasingFunction;
