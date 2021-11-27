import AnimationWS from './animation';
import { ANIMATION_STATES } from './constants';
import { organizeCycleSequence } from './organize-cycle';

export default function logicToPlayAnimations(
  animationInstance: AnimationWS,
  animationsThatPerformTogether?: AnimationWS[],
  animationsThatWaitIterations?: {
    animations: AnimationWS[];
    waitIterations: number;
  }
): void {
  const performerFn = animationInstance.performer;
  if (
    (!animationsThatPerformTogether || !animationsThatPerformTogether[0]) &&
    (!animationsThatWaitIterations ||
      !animationsThatWaitIterations.animations[0])
  ) {
    if (
      animationInstance.autoPlay &&
      animationInstance.state === ANIMATION_STATES[0]
    ) {
      animationInstance.play();
    }
  } else {
    if (
      animationsThatWaitIterations &&
      animationsThatWaitIterations.animations[0]
    ) {
      const waitIterations = animationsThatWaitIterations.waitIterations;
      animationsThatWaitIterations.animations.forEach((o) => {
        const i = o;
        let count = 1;

        animationInstance.on('loopEnd', function f() {
          if (count >= waitIterations) {
            animationInstance.off('loopEnd', f);

            if (performerFn.$hidden.cycleOptions) {
              organizeCycleSequence(
                performerFn,
                i,
                animationInstance,
                'together'
              );
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
      if (animationInstance.state === ANIMATION_STATES[0]) {
        animationInstance.on('load', function f() {
          animationsThatPerformTogether.forEach((i) => {
            i.on('load', function d() {
              count += 1;

              if (count >= length) {
                animationInstance.on('ready', function g() {
                  animationsThatPerformTogether.forEach((a) => {
                    organizeCycleSequence(
                      performerFn,
                      a,
                      animationInstance,
                      'together'
                    );
                    performerFn.$hidden.animationInstances.push(a);
                    a.play();
                  });
                  animationInstance.off('ready', g);
                });
                if (animationInstance.autoPlay) {
                  animationInstance.play();
                }
              }
              i.off('load', d);
            });
            i.load();
          });
          animationInstance.off('load', f);
        });
        animationInstance.load();
      } else {
        animationInstance.on('ready', function g() {
          animationsThatPerformTogether.forEach((a) => {
            organizeCycleSequence(
              performerFn,
              a,
              animationInstance,
              'together'
            );
            performerFn.$hidden.animationInstances.push(a);
            a.play();
          });
          animationInstance.off('ready', g);
        });
        if (animationInstance.autoPlay) {
          animationInstance.play();
        }
      }
    }
    if (
      animationInstance.autoPlay &&
      animationInstance.state === ANIMATION_STATES[0]
    ) {
      animationInstance.play();
    }
  }
}
