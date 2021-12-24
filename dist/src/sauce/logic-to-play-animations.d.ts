import AnimationWS from './animation';
export declare function playAnimationsTogether(animationToLink: AnimationWS, playTogether?: AnimationWS[]): void;
export declare function playAnimationsAfterIterations(animationToLink: AnimationWS, playAfterIterations?: {
    animations: AnimationWS[];
    amountOfIterations: number;
}): void;
