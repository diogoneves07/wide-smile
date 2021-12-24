import AnimationWS from './animation';
import { ANIMATION_STATES } from './constants';
import organizeTheExecutionOfCycleAnimations from '../animation-engine/organize-the-execution-of-cycle-animations';

function runTogetherAnimations(
  animationToLink: AnimationWS,
  playTogether: AnimationWS[]
) {
  const performerFn = animationToLink.performer;
  animationToLink.on('ready', function g() {
    playTogether.forEach((a) => {
      organizeTheExecutionOfCycleAnimations(
        performerFn,
        a,
        animationToLink,
        'together'
      );
      a.play();
    });
    animationToLink.off('ready', g);
  });
  if (animationToLink.autoPlay) {
    animationToLink.play();
  }
}
export function playAnimationsTogether(
  animationToLink: AnimationWS,
  playTogether?: AnimationWS[]
): void {
  if (!playTogether) {
    return;
  }
  const performerFn = animationToLink.performer;
  const length = playTogether.length;
  let countLoadedAnimations = 0;
  if (animationToLink.state === ANIMATION_STATES[0]) {
    animationToLink.on('load', function f() {
      playTogether.forEach((animation) => {
        animation.on('load', function d() {
          countLoadedAnimations += 1;
          if (countLoadedAnimations >= length) {
            runTogetherAnimations(animationToLink, playTogether);
          }
          animation.off('load', d);
        });
        animation.load();
      });
      animationToLink.off('load', f);
    });
    if (animationToLink.autoPlay) {
      animationToLink.load();
    }
  } else {
    animationToLink.on('ready', function g() {
      playTogether.forEach((animation) => {
        organizeTheExecutionOfCycleAnimations(
          performerFn,
          animation,
          animationToLink,
          'together'
        );
        animation.play();
      });
      animationToLink.off('ready', g);
    });
    if (animationToLink.autoPlay) {
      animationToLink.play();
    }
  }
}
export function playAnimationsAfterIterations(
  animationToLink: AnimationWS,
  playAfterIterations?: {
    animations: AnimationWS[];
    amountOfIterations: number;
  }
): void {
  if (!playAfterIterations) {
    return;
  }
  const performerFn = animationToLink.performer;

  const amountOfIterations = playAfterIterations.amountOfIterations;
  playAfterIterations.animations.forEach((a) => {
    const animation = a;
    let countCompletedIterations = 1;

    animationToLink.on('loopEnd', function f() {
      if (countCompletedIterations >= amountOfIterations) {
        animationToLink.off('loopEnd', f);

        if (performerFn.$hidden.cycleOptions) {
          organizeTheExecutionOfCycleAnimations(
            performerFn,
            animation,
            animationToLink,
            'together'
          );

          animation.play();
        } else {
          animation.play();
        }
      }
      countCompletedIterations += 1;
    });
  });
}
