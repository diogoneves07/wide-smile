import AnimationWS from './animation';
export default function logicToPlayAnimations(animation: AnimationWS, animationsThatPerformTogether?: AnimationWS[], animationsThatWaitIterations?: {
    animations: AnimationWS[];
    amountOfIterations: number;
}): void;
