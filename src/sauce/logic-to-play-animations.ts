import AnimationWS from './animation';
import { ANIMATION_STATES } from './constants';
import { organizeCycleSequence } from './organize-cycle';

export default function logicToPlayAnimations(
  animation: AnimationWS,
  animationsThatPerformTogether?: AnimationWS[],
  animationsThatWaitIterations?: {
    animations: AnimationWS[];
    amountOfIterations: number;
  }
): void {
  const performerFn = animation.performer;
  if (
    (!animationsThatPerformTogether || !animationsThatPerformTogether[0]) &&
    (!animationsThatWaitIterations ||
      !animationsThatWaitIterations.animations[0])
  ) {
    if (animation.autoPlay && animation.state === ANIMATION_STATES[0]) {
      animation.play();
    }
  } else {
    if (
      animationsThatWaitIterations &&
      animationsThatWaitIterations.animations[0]
    ) {
      const amountOfIterations =
        animationsThatWaitIterations.amountOfIterations;
      animationsThatWaitIterations.animations.forEach((o) => {
        const i = o;
        let count = 1;

        animation.on('loopEnd', function f() {
          if (count >= amountOfIterations) {
            animation.off('loopEnd', f);

            if (performerFn.$hidden.cycleOptions) {
              organizeCycleSequence(performerFn, i, animation, 'together');
              performerFn.$hidden.animationInstances.push(i);

              i.play();
            } else {
              i.play();
            }
          }
          count += 1;
        });
      });
    }
    if (animationsThatPerformTogether && animationsThatPerformTogether[0]) {
      const length = animationsThatPerformTogether.length;
      let count = 0;
      if (animation.state === ANIMATION_STATES[0]) {
        animation.on('load', function f() {
          animationsThatPerformTogether.forEach((i) => {
            i.on('load', function d() {
              count += 1;

              if (count >= length) {
                animation.on('ready', function g() {
                  animationsThatPerformTogether.forEach((a) => {
                    organizeCycleSequence(
                      performerFn,
                      a,
                      animation,
                      'together'
                    );
                    performerFn.$hidden.animationInstances.push(a);
                    a.play();
                  });
                  animation.off('ready', g);
                });
                if (animation.autoPlay) {
                  animation.play();
                }
              }
              i.off('load', d);
            });
            i.load();
          });
          animation.off('load', f);
        });
        animation.load();
      } else {
        animation.on('ready', function g() {
          animationsThatPerformTogether.forEach((a) => {
            organizeCycleSequence(performerFn, a, animation, 'together');
            performerFn.$hidden.animationInstances.push(a);
            a.play();
          });
          animation.off('ready', g);
        });
        if (animation.autoPlay) {
          animation.play();
        }
      }
    }
    if (animation.autoPlay && animation.state === ANIMATION_STATES[0]) {
      animation.play();
    }
  }
}
