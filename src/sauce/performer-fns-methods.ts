import customForIn from '../utilities/custom-for-in';
import { ANIMATION_STATES } from './constants';
import {
  addInStackForConstruction,
  useAnimationObjectExpectingSideEffects,
  runCallbacksAtTheRightTime,
} from './organize-animation-creations';
import { debugNormal } from './wide-smile-debug';
import AllAnimableProperties from '../contracts/animable-properties';
import createAnimationPropertiesObject from './create-animation-properties-object';
import PerformerFn, {
  OverloadsForAnimationCreation,
  PerformerFnMethods,
  PerformerFnProperties,
} from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import Keyframes from '../contracts/key-frames';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import {
  AnimationInstance,
  AnimationOptions,
} from '../contracts/animation-inter';
import { ListenersEventsName } from '../contracts/listeners-events-name';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-this-alias  */

const createIndependentAnimations: OverloadsForAnimationCreation = function a(
  this: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | string
    | ValuesToAnimateProperty[],
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
): PerformerFn {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const animationProperties = createAnimationPropertiesObject(
    this,
    animate as never,
    parametersToAnimateOrPropertyValue as never,
    parametersToAnimate as never
  );

  useAnimationObjectExpectingSideEffects(this, animationProperties);
  addInStackForConstruction(animationProperties, this);

  return this;
};

function getAnimationsRunning(performerFn: PerformerFn) {
  const $hidden = performerFn.$hidden;
  const animations = $hidden.animationInstances;
  if ($hidden.cycleOptions) {
    return [
      ...($hidden.cycleOptions
        .animationInstancesInCycle as AnimationInstance[]).filter(
        (a) => a.state === ANIMATION_STATES[1]
      ),
      ...animations.filter((a) => !a.isInCycle),
    ];
  }
  return animations;
}

const createDependentAnimations: OverloadsForAnimationCreation = function a(
  this: PerformerFn,
  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | string
    | ValuesToAnimateProperty[],
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
): PerformerFn {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const animationProperties = createAnimationPropertiesObject(
    this,
    animate as never,
    parametersToAnimateOrPropertyValue as never,
    parametersToAnimate as never
  );

  const lastAnimationParametersAdded = useAnimationObjectExpectingSideEffects(
    this
  );

  useAnimationObjectExpectingSideEffects(this, animationProperties);
  if (lastAnimationParametersAdded) {
    addInStackForConstruction(
      animationProperties,
      this,
      lastAnimationParametersAdded,
      'afterAnimation'
    );
  } else {
    const lastAnimationCreated = this.$hidden.animationInstances[
      this.$hidden.animationInstances.length - 1
    ];
    if (lastAnimationCreated) {
      addInStackForConstruction(
        animationProperties,
        this,
        lastAnimationCreated,
        'afterAnimation'
      );
    } else {
      addInStackForConstruction(animationProperties, this);
    }
  }

  return this;
};

function addFinalKeyframeInTheAnimation(
  this: PerformerFn,

  animate:
    | PropertiesToAnimateObject
    | Keyframes
    | AllAnimableProperties
    | ValuesToAnimateProperty[]
    | ValuesToAnimateProperty,
  parametersToAnimateOrPropertyValue?:
    | AnimationOptions
    | ValuesToAnimateProperty
    | ValuesToAnimateProperty[]
    | true,
  parametersToAnimateOrDurOrAutoDestroy?:
    | AnimationOptions
    | AnimationOptions['dur']
    | true
) {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;

  const objectExpectingSideEffects = useAnimationObjectExpectingSideEffects(
    this
  );
  if (objectExpectingSideEffects) {
    const lastAnimationParametersAdded = objectExpectingSideEffects;
    let initialKeyframe: PropertiesToAnimateObject | false = false;

    let animateProps = animate;

    if (
      typeof animate !== 'object' &&
      parametersToAnimateOrPropertyValue === undefined
    ) {
      animateProps = [animateProps] as ValuesToAnimateProperty[];
    }
    if (Array.isArray(animateProps)) {
      initialKeyframe = {};
      let count = 0;
      customForIn(
        lastAnimationParametersAdded.keyframes as PropertiesToAnimateObject,
        (_propertyValue, propertyName) => {
          const array = animateProps as ValuesToAnimateProperty[];
          const v = array[count];

          (initialKeyframe as PropertiesToAnimateObject)[propertyName] = v;
          if (typeof array[count + 1] !== 'undefined') {
            count += 1;
          }
        }
      );
    }
    const animationProperties = createAnimationPropertiesObject(
      this,
      (initialKeyframe || animateProps) as PropertiesToAnimateObject,
      parametersToAnimateOrPropertyValue,
      parametersToAnimateOrDurOrAutoDestroy
    );

    customForIn(animationProperties, (propertyValue, propertyName) => {
      const v = propertyValue as never;
      if (propertyName === 'keyframes') {
        lastAnimationParametersAdded.keyframes = [
          lastAnimationParametersAdded.keyframes as PropertiesToAnimateObject,
          v,
        ];
      } else {
        lastAnimationParametersAdded[propertyName as never] = v;
      }
    });
  } else {
    debugNormal(
      'Call at an improper moment.',
      'To use the "to" method you should call it right after the animation call to which it will be applied.'
    );
  }
  return this;
}

function playAnimations(animationPerformer: PerformerFn) {
  animationPerformer.$hidden.animationInstances.forEach((a) => {
    const i = a;

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

const PERFORMER_FNS_METHODS: PerformerFnMethods = {
  $: createIndependentAnimations,

  _: createDependentAnimations,

  to: addFinalKeyframeInTheAnimation,

  cycle(
    this: PerformerFn,
    loopOrDir: PerformerFnProperties['loop'] | 'normal' | 'alternate',
    dir: 'normal' | 'alternate' = 'normal'
  ) {
    let loop;
    let d: typeof dir;
    if (typeof loopOrDir === 'string') {
      loop = loopOrDir === 'alternate' ? 2 : 1;
      d = loopOrDir as typeof dir;
    } else {
      loop = loopOrDir;
      d = dir;
    }
    this.$hidden.cycleOptions = {
      loop: loop || 2,
      dir: d,
      countCompleteAnimations: 0,
      numberOfAnimationsToComplete: 0,
      countLoops: 1,
      loopDirection: 'normal',
    };
    return this;
  },

  after(this: PerformerFn, iterations: number) {
    this.$hidden.currentAfterIterations = iterations;
    return this;
  },

  load(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      this.$hidden.animationInstances.forEach((a) => a.load());
    });
    return this;
  },

  ready(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      let count = 0;
      const animationPerformer = this;

      const animationInstances = animationPerformer.$hidden.animationInstances;
      const length = animationInstances.length;

      animationInstances.forEach((a) => {
        a.on('load', function f() {
          count += 1;

          if (count >= length) {
            playAnimations(animationPerformer);
          }
          a.off('load', f);
        }).load();
      });
    });

    return this;
  },

  play(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      playAnimations(this);
    });
    return this;
  },

  pause(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.pause());
    });
    return this;
  },

  resume(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.resume());
    });
    return this;
  },

  restart(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.restart());
    });
    return this;
  },

  end(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.end());
    });
    return this;
  },

  go(this: PerformerFn, part: number) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.go(part));
    });
    return this;
  },

  back(this: PerformerFn, part: number) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.back(part));
    });
    return this;
  },

  jump(this: PerformerFn, part: number) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.jump(part));
    });
    return this;
  },

  speed(this: PerformerFn, multiply: number) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.speed(multiply));
    });
    return this;
  },

  revert(this: PerformerFn, endIteration: boolean) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.revert(endIteration));
    });
    return this;
  },

  dirTo(this: PerformerFn, dir: Parameters<AnimationInstance['dirTo']>['0']) {
    runCallbacksAtTheRightTime(() => {
      getAnimationsRunning(this).forEach((a) => a.dirTo(dir));
    });
    return this;
  },

  cancel(this: PerformerFn) {
    runCallbacksAtTheRightTime(() => {
      this.$hidden.animationInstances.forEach((a) => a.cancel());
    });
    return this;
  },

  destroy(this: PerformerFn): boolean {
    runCallbacksAtTheRightTime(() => {
      this.$hidden.animationInstances.forEach((a) => a.destroy());
    });
    return true;
  },

  on(
    this: PerformerFn,
    eventName: ListenersEventsName,
    callbackfn: (
      this: AnimationInstance,
      eventName: string,
      animation: AnimationInstance
    ) => unknown
  ) {
    runCallbacksAtTheRightTime(() => {
      this.$hidden.animationInstances.forEach((a) =>
        a.on(eventName, callbackfn)
      );
    });
    return this;
  },

  off(
    this: PerformerFn,
    eventName: ListenersEventsName,
    callbackfnOrIndex: Function | number
  ) {
    runCallbacksAtTheRightTime(() => {
      this.$hidden.animationInstances.forEach((a) =>
        a.off(eventName, callbackfnOrIndex)
      );
    });
    return this;
  },
};

export default PERFORMER_FNS_METHODS;
