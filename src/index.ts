import './sauce/polyfills';
import './animation-engine/handle-visibility-change';
import { WIDE_SMILE_VERSION } from './sauce/constants';
import {
  createCustomProperty,
  CUSTOM_SPECIAL_PROPERTIES,
  OBSERVER_PROPERTIES,
  removeCustomProperty,
} from './sauce/custom-properties-for-animations';

import NewPerformerFn from './sauce/new-performer-fn';
import EasingsFunctionsList from './contracts/easings-functions-list';
import isDirValue from './animation-mount/is-dir-value';
import { registerCustomEasing } from './sauce/custom-easings';
import {
  AnimationInstance,
  UserAnimationOptions,
} from './contracts/animation-inter';
import CreateObserverPropertyCallbackfn from './contracts/create-observer-property-callbackfn';
import CreatorFnProperties from './contracts/creator-fn-properties';
import CreateSpecialPropertyCallbackfn from './contracts/create-special-property-callbackfn';
import PerformerFn from './contracts/performer-fn';
import { ListenersEventsName } from './contracts/listeners-events-name';
import EasingFunction from './contracts/easing-function';
import DEFAULTS_ANIMATION_PROPERTIES_VALUES from './sauce/defaults-animation-properties-values';

/* eslint-disable @typescript-eslint/no-use-before-define */

const CREATORS_FN_METHODS = {
  play(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.play());
    return this;
  },

  load(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.load());
    return this;
  },

  ready(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.ready());
    return this;
  },

  pause(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.pause());

    return this;
  },

  resume(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.resume());

    return this;
  },

  restart(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.restart());

    return this;
  },

  end(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.end());

    return this;
  },

  go(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => i.go(part));

    return this;
  },

  back(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => i.back(part));

    return this;
  },

  jump(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => i.jump(part));

    return this;
  },

  revert(this: AnimationInstance['creator'], endIteration?: boolean) {
    this.performers.forEach((i) => i.revert(endIteration));
    return this;
  },

  speed(this: AnimationInstance['creator'], multiply: number) {
    this.performers.forEach((i) => i.speed(multiply));
    return this;
  },

  dirTo(
    this: AnimationInstance['creator'],
    dir: Parameters<AnimationInstance['dirTo']>['0']
  ) {
    this.performers.forEach((i) => i.dirTo(dir));

    return this;
  },

  destroy(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.destroy());
    this.performers = [];
    return this;
  },
  cancel(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => i.cancel());
    return this;
  },

  on(
    this: AnimationInstance['creator'],
    eventName: ListenersEventsName,
    callbackfn: (
      this: AnimationInstance,
      eventName: string,
      animation: AnimationInstance
    ) => unknown
  ) {
    this.performers.forEach((i) => i.on(eventName, callbackfn));

    return this;
  },

  off(
    this: AnimationInstance['creator'],
    eventName: ListenersEventsName,
    callbackfnOrIndex: Function | number
  ) {
    this.performers.forEach((i) => i.off(eventName, callbackfnOrIndex));
    return this;
  },
};

const CREATORS_FN_GLOBAL: CreatorFnProperties['global'] = {
  new() {
    return Object.assign(NewCreatorFn(), GetCreatorFnProperties()) as never;
  },
  version: WIDE_SMILE_VERSION,

  asyncLoading: false,

  specials: CUSTOM_SPECIAL_PROPERTIES,

  observeds: OBSERVER_PROPERTIES,

  all: [],

  newEasing(name: string, callback: EasingFunction) {
    registerCustomEasing(name, callback);
    return this;
  },
  newSpecialProperty(
    this: CreatorFnProperties['global'],
    propertyOrProperties:
      | string
      | Record<string, CreateSpecialPropertyCallbackfn>,
    callbackfn?: CreateSpecialPropertyCallbackfn
  ) {
    createCustomProperty(propertyOrProperties, callbackfn, 'special');
    return this;
  },

  deleteSpecialProperty(
    this: CreatorFnProperties['global'],
    ...propertiesNames: string[]
  ) {
    removeCustomProperty(propertiesNames, 'special');
    return this;
  },

  newObservedProperty(
    this: CreatorFnProperties['global'],
    propertyOrProperties:
      | string
      | Record<string, CreateObserverPropertyCallbackfn>,
    callbackfn?: CreateObserverPropertyCallbackfn
  ) {
    createCustomProperty(propertyOrProperties, callbackfn, 'observed');
    return this;
  },

  deleteObservedProperty(
    this: CreatorFnProperties['global'],
    ...propertiesNames: string[]
  ) {
    removeCustomProperty(propertiesNames, 'observed');
    return this;
  },
};

function GetCreatorFnProperties(): Omit<CreatorFnProperties, 'global'> & {
  global: Omit<CreatorFnProperties['global'], 'new'> & {
    new: () => CreatorFn;
  };
} {
  return {
    dfs: { ...DEFAULTS_ANIMATION_PROPERTIES_VALUES },

    performers: [],

    global: CREATORS_FN_GLOBAL as never,
    ...CREATORS_FN_METHODS,
  };
}

function NewCreatorFn() {
  const creator = (creatorFn as unknown) as AnimationInstance['creator'];
  function creatorFn(): CreatorFn['global'];

  function creatorFn(
    performerProperties: UserAnimationOptions | object | string,
    ...props: (
      | EasingsFunctionsList
      | AnimationInstance['dir']
      | number
      | boolean
      | UserAnimationOptions
    )[]
  ): PerformerFn;

  function creatorFn(
    performerProperties?: unknown,
    ...props: (string | number | boolean | UserAnimationOptions)[]
  ) {
    if (performerProperties) {
      const performerFn = {
        targets: (performerProperties as UserAnimationOptions).targets
          ? (performerProperties as UserAnimationOptions).targets
          : (performerProperties as UserAnimationOptions['targets']),
      } as UserAnimationOptions;

      if ((performerProperties as UserAnimationOptions).targets) {
        Object.assign(performerFn, performerProperties);
      }
      let countNumbers = 0;
      props.forEach((v) => {
        switch (typeof v) {
          case 'number':
            if (countNumbers === 0) {
              performerFn.dur = v;
              countNumbers += 1;
            } else {
              performerFn.loop = v;
            }
            break;
          case 'string':
            if (isDirValue(v)) {
              performerFn.dir = v as AnimationInstance['dir'];
            } else {
              performerFn.easing = v as never;
            }
            break;
          case 'function':
            performerFn.easing = v as never;

            break;
          case 'boolean':
            performerFn.autoPlay = v;
            break;
          case 'object':
            Object.assign(performerFn, v);
            break;
          default:
            break;
        }
      });

      return NewPerformerFn(performerFn, creator);
    }
    return creator.global;
  }
  CREATORS_FN_GLOBAL.all.push(creator);
  return creatorFn;
}
const creatorFn = NewCreatorFn();

export type CreatorFn = typeof creatorFn &
  ReturnType<typeof GetCreatorFnProperties>;

Object.assign(creatorFn, GetCreatorFnProperties());

export default creatorFn as CreatorFn;
