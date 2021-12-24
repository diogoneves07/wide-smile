import { AnimationInstance } from '../contracts/animation-inter';
import PerformerFn from '../contracts/performer-fn';
import applyCallbackForFutureAnimations from '../sauce/apply-callback-for-future-animations';
import { ANIMATION_STATES } from '../sauce/constants';

export default function loadAnimationsAndPlayWhenReady(
  performer: PerformerFn
): void {
  let setTimeoutId = -1;
  const animationInstances: AnimationInstance[] = [];
  function readyLogic() {
    let count = 0;
    const length = animationInstances.length;

    function countFn(a: AnimationInstance) {
      const animation = a;
      animation.autoPlay = true;

      count += 1;
      if (count >= length) {
        animationInstances.forEach((i) => {
          if (
            a.state === ANIMATION_STATES[5] &&
            performer.$hidden.independentAnimations.indexOf(i) > -1
          ) {
            i.play();
          }
        });
      }
    }

    animationInstances.forEach((animation) => {
      if (animation.state !== ANIMATION_STATES[5]) {
        animation
          .on('load', function f() {
            countFn(animation);
            animation.off('load', f);
          })
          .load();
      } else {
        countFn(animation);
      }
    });
  }

  applyCallbackForFutureAnimations(performer, (a) => {
    const animation = a;
    animationInstances.push(animation);
    animation.autoPlay = false;
    if (setTimeoutId < 0) {
      setTimeoutId = (setTimeout(() => {
        readyLogic();
        clearTimeout(setTimeoutId);
      }, 0) as unknown) as number;
    }
  });
}
