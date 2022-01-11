import { ANIMATION_STATES } from './constants';
import PerformerFn, {
  PerformerFnMethods,
  PerformerFnProperties,
} from '../contracts/performer-fn';
import {
  AnimationInstance,
  AnimationOptions,
} from '../contracts/animation-inter';
import { ListenersEventsName } from '../contracts/listeners-events-name';
import getAnimationsRunning from './get-performer-animations-running';
import amountOfAnimationsInterestedInEvent from '../animation-listeners/amount-of-animations-interested-in-event';
import { toCamelCase } from '../utilities/handle-string';
import {
  addFinalKeyframeInTheAnimation,
  createDependentAnimations,
  createIndependentAnimations,
} from './fns-to-create-animations';
import applyCallbackForFutureAnimations from './apply-callback-for-future-animations';
import { removeLastAnimationObjectAddedToPerformer } from './last-added-animation-object';
import AllAnimableProperties from '../contracts/animable-properties';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import { buildAnimationsForSpecificPerformer } from './organize-animation-creations';
import getCurrentPropertiesValue from '../animation-actions/get-current-properties-value';
import getPropertyName from './get-property-name';
import setPropertyValue from '../animation-actions/set-property-value';
import loadAnimationsAndPlayWhenReady from '../animation-actions/load-animations-and-play-when-ready';

/* eslint-disable @typescript-eslint/no-this-alias  */

function playAnimations(animationPerformer: PerformerFn) {
  animationPerformer.$hidden.animationInstances.forEach((animation) => {
    const i = animation;
    if (i.state === ANIMATION_STATES[0] || i.state === ANIMATION_STATES[5]) {
      if (
        animationPerformer.$hidden.independentAnimations &&
        animationPerformer.$hidden.independentAnimations.indexOf(i) > -1
      ) {
        i.play();
      } else {
        i.autoPlay = true;
      }
    }
  });
}
function applyWhenTheAnimationIsLoaded(
  animation: AnimationInstance,
  callback: () => void
) {
  if (animation.state === ANIMATION_STATES[0]) {
    animation
      .on('load', function fn() {
        callback();
        animation.off('load', fn);
      })
      .load();
  } else {
    callback();
  }
}

const PERFORMER_FNS_METHODS: PerformerFnMethods = {
  $: createIndependentAnimations,

  _: createDependentAnimations,

  to: addFinalKeyframeInTheAnimation,

  cycle(
    this: PerformerFn,
    loopOrDir: PerformerFnProperties['loop'] | 'normal' | 'alternate',
    dir: 'normal' | 'alternate' = 'normal'
  ) {
    removeLastAnimationObjectAddedToPerformer(this);
    let loop;
    let d: typeof dir;
    if (typeof loopOrDir === 'string') {
      loop = 2;
      d = loopOrDir as typeof dir;
    } else {
      loop = loopOrDir;
      d = dir;
    }
    this.$hidden.cycleOptions = {
      loop: loop || 2,
      dir: d,
      countCompletedAnimations: 0,
      numberOfAnimationsToComplete: 0,
      countLoops: 0,
      loopDirection: 'normal',
    };
    return this;
  },

  after(this: PerformerFn, amountIterations = 1) {
    this.$hidden.currentAfterIterations = amountIterations;
    return this;
  },

  wait(this: PerformerFn, seconds?: string) {
    this.$hidden.currentWaitExecutionTime = seconds;
    return this;
  },

  now(this: PerformerFn) {
    removeLastAnimationObjectAddedToPerformer(this);

    buildAnimationsForSpecificPerformer(this, {
      skip: true,
      firstRunImmediately: true,
    });
    return this;
  },

  ready(this: PerformerFn) {
    loadAnimationsAndPlayWhenReady(this);

    return this;
  },

  set(
    this: PerformerFn,
    properties: AllAnimableProperties | string | PropertiesToAnimateObject,
    propertyValue?: ValuesToAnimateProperty | ValuesToAnimateProperty[]
  ) {
    const userPerformer = this;

    setPropertyValue(this, properties, propertyValue);
    return userPerformer;
  },

  get(this: PerformerFn, name: AllAnimableProperties | string) {
    return getCurrentPropertiesValue(this, name);
  },

  load(this: PerformerFn) {
    this.$hidden.animationInstances.forEach((animation) => {
      animation.load();
    });
    applyCallbackForFutureAnimations(this, (animation) => {
      animation.load();
    });
    return this;
  },

  play(this: PerformerFn) {
    playAnimations(this);
    applyCallbackForFutureAnimations(this, (animation) => {
      const a = animation;
      if (a.state === ANIMATION_STATES[0] || a.state === ANIMATION_STATES[5]) {
        if (
          this.$hidden.independentAnimations &&
          this.$hidden.independentAnimations.indexOf(a) > -1
        ) {
          a.play();
        } else {
          a.autoPlay = true;
        }
      }
    });
    return this;
  },

  pause(this: PerformerFn) {
    getAnimationsRunning(this).forEach((animation) => animation.pause());
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.pause();
      });
    });
    return this;
  },

  resume(this: PerformerFn) {
    getAnimationsRunning(this).forEach((animation) => animation.resume());
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.resume();
      });
    });
    return this;
  },

  restart(this: PerformerFn) {
    getAnimationsRunning(this).forEach((animation) => animation.restart());
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.restart();
      });
    });
    return this;
  },

  end(this: PerformerFn) {
    getAnimationsRunning(this).forEach((animation) => animation.end());

    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.end();
      });
    });
    return this;
  },

  go(this: PerformerFn, part: number) {
    getAnimationsRunning(this).forEach((animation) => animation.go(part));
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.go(part);
      });
    });
    return this;
  },

  back(this: PerformerFn, part: number) {
    getAnimationsRunning(this).forEach((animation) => animation.back(part));
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.back(part);
      });
    });
    return this;
  },

  jump(this: PerformerFn, part: number) {
    getAnimationsRunning(this).forEach((animation) => animation.jump(part));
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.jump(part);
      });
    });
    return this;
  },

  speed(this: PerformerFn, multiply: number) {
    removeLastAnimationObjectAddedToPerformer(this);

    getAnimationsRunning(this).forEach((animation) =>
      animation.speed(multiply)
    );
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.speed(multiply);
      });
    });
    return this;
  },

  revert(this: PerformerFn, endIteration: boolean) {
    getAnimationsRunning(this).forEach((animation) =>
      animation.revert(endIteration)
    );
    applyCallbackForFutureAnimations(this, (animation) => {
      applyWhenTheAnimationIsLoaded(animation, () => {
        animation.revert(endIteration);
      });
    });
    return this;
  },

  dirTo(this: PerformerFn, dir: Parameters<AnimationInstance['dirTo']>['0']) {
    getAnimationsRunning(this).forEach((animation) => animation.dirTo(dir));

    applyCallbackForFutureAnimations(this, (animation) => {
      animation.dirTo(dir);
    });
    return this;
  },

  cancel(this: PerformerFn) {
    removeLastAnimationObjectAddedToPerformer(this);

    this.$hidden.animationInstances.forEach((animation) => {
      animation.cancel();
    });

    applyCallbackForFutureAnimations(this, (animation) => {
      animation.cancel();
    });
    return this;
  },

  destroy(this: PerformerFn, removeChanges?: true) {
    removeLastAnimationObjectAddedToPerformer(this);

    this.$hidden.animationInstances.forEach((animation) => {
      animation.destroy(removeChanges);
    });

    applyCallbackForFutureAnimations(this, (animation) => {
      animation.destroy(removeChanges);
    });

    return this;
  },

  on(
    this: PerformerFn,
    eventName: ListenersEventsName | string | AllAnimableProperties,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => unknown
  ) {
    const eName = getPropertyName(this, toCamelCase(eventName.toString()));
    const performer = this;

    let countingEventShots = 0;
    let countAnimationsInterestedInEvent = 0;
    let animationInstances = performer.$hidden.animationInstances.slice();
    const eventCallback = (item: unknown) => {
      countingEventShots += 1;

      countAnimationsInterestedInEvent = amountOfAnimationsInterestedInEvent(
        animationInstances
      );

      if (countingEventShots >= countAnimationsInterestedInEvent) {
        countAnimationsInterestedInEvent = 0;
        countingEventShots = 0;
        switch (eName) {
          case 'load':
          case 'ready':
          case 'play':
            performer.off(eName, callbackfn);
            break;
          default:
            break;
        }
        return callbackfn.call(performer, item, performer);
      }

      return undefined;
    };

    animationInstances = performer.$hidden.animationInstances.slice();

    animationInstances.forEach((animation) => {
      countAnimationsInterestedInEvent += 1;
      animation.on(eventName, eventCallback);
    });

    applyCallbackForFutureAnimations(this, (animation) => {
      animationInstances.push(animation);

      animation.on(eventName, eventCallback);
    });

    if (!this.$hidden.eventsCallbacks) {
      this.$hidden.eventsCallbacks = {};
    }
    const eventBucket = this.$hidden.eventsCallbacks[eName] || [];

    if (!this.$hidden.eventsCallbacks[eName]) {
      this.$hidden.eventsCallbacks[eName] = eventBucket;
    }

    eventBucket.push([callbackfn, eventCallback]);

    return this;
  },

  off(
    this: PerformerFn,
    eventName: ListenersEventsName | string | AllAnimableProperties,
    callbackfnUsed: Function
  ) {
    const eName = getPropertyName(this, toCamelCase(eventName.toString()));

    if (this.$hidden.eventsCallbacks && this.$hidden.eventsCallbacks[eName]) {
      const eventBucket = this.$hidden.eventsCallbacks[eName] as [
        Function,
        Function
      ][];

      let eventCallback: Function | false = false;
      this.$hidden.eventsCallbacks[eName] = eventBucket.filter((fns) => {
        if (fns[0] !== callbackfnUsed) {
          return true;
        }
        eventCallback = fns[1];
        return false;
      });

      if (eventCallback) {
        this.$hidden.animationInstances.forEach((animation) =>
          animation.off(eName, eventCallback as Function)
        );

        applyCallbackForFutureAnimations(this, (animation) => {
          animation.off(eName, eventCallback as Function);
        });
      }
    }

    return this;
  },

  remove(this: PerformerFn, ...names: (AllAnimableProperties | string)[]) {
    const propertiesNames = names.map((name) => {
      const n = parseFloat(name.toString());
      if (this.$hidden.orderOfThePropertiesUsed[n]) {
        return this.$hidden.orderOfThePropertiesUsed[n];
      }
      return name;
    }) as string[];

    this.$hidden.animationInstances.forEach((animation) => {
      animation.remove(...propertiesNames);
    });

    applyCallbackForFutureAnimations(this, (animation) => {
      animation.remove(...propertiesNames);
    });
    return this;
  },

  removeTarget(this: PerformerFn, targets: AnimationOptions['targets']) {
    this.$hidden.animationInstances.forEach((animation) => {
      animation.removeTarget(targets);
    });

    applyCallbackForFutureAnimations(this, (animation) => {
      animation.removeTarget(targets);
    });
    return this;
  },
};
export default PERFORMER_FNS_METHODS;
