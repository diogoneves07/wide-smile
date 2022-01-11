import AllAnimableProperties from '../contracts/animable-properties';
import {
  AnimationInstance,
  AnimationOptions,
} from '../contracts/animation-inter';
import { CreatorFnMethods } from '../contracts/creator-fn';
import CurrentPropertyValue from '../contracts/current-property-value';
import { ListenersEventsName } from '../contracts/listeners-events-name';
import PerformerFn from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';
import ValuesToAnimateProperty from '../contracts/values-to-animate-property';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const CREATORS_FN_METHODS: CreatorFnMethods = {
  play(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.play();
    });
    return this;
  },

  load(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.load();
    });
    return this;
  },

  ready(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.ready();
    });
    return this;
  },

  pause(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.pause();
    });

    return this;
  },

  resume(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.resume();
    });

    return this;
  },

  restart(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.restart();
    });

    return this;
  },

  end(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.end();
    });

    return this;
  },

  go(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => {
      i.go(part);
    });

    return this;
  },

  back(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => {
      i.back(part);
    });

    return this;
  },

  jump(this: AnimationInstance['creator'], part: number) {
    this.performers.forEach((i) => {
      i.jump(part);
    });

    return this;
  },

  revert(this: AnimationInstance['creator'], endIteration?: boolean) {
    this.performers.forEach((i) => {
      i.revert(endIteration);
    });
    return this;
  },

  speed(this: AnimationInstance['creator'], multiply: number) {
    this.performers.forEach((i) => {
      i.speed(multiply);
    });
    return this;
  },

  dirTo(
    this: AnimationInstance['creator'],
    dir: Parameters<AnimationInstance['dirTo']>['0']
  ) {
    this.performers.forEach((i) => {
      i.dirTo(dir);
    });

    return this;
  },

  destroy(this: AnimationInstance['creator'], removeChanges?: true) {
    this.performers.forEach((i) => {
      i.destroy(removeChanges);
    });
    this.performers = [];
    return this;
  },
  cancel(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.cancel();
    });
    return this;
  },

  on(
    this: AnimationInstance['creator'],
    eventName: ListenersEventsName | string | AllAnimableProperties,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => unknown
  ) {
    this.performers.forEach((i) => {
      i.on(eventName, callbackfn);
    });

    return this;
  },

  off(
    this: AnimationInstance['creator'],
    eventName: ListenersEventsName | string | AllAnimableProperties,
    callbackfnUsed: Function
  ) {
    this.performers.forEach((i) => {
      i.off(eventName as string, callbackfnUsed);
    });
    return this;
  },

  now(this: AnimationInstance['creator']) {
    this.performers.forEach((i) => {
      i.now();
    });

    return this;
  },

  set(
    this: AnimationInstance['creator'],
    properties: AllAnimableProperties | string | PropertiesToAnimateObject,
    propertyValue?: ValuesToAnimateProperty | ValuesToAnimateProperty[]
  ) {
    this.performers.forEach((i) => {
      i.set(properties as never, propertyValue as never);
    });

    return this;
  },

  get(
    this: AnimationInstance['creator'],
    name: AllAnimableProperties | string
  ) {
    const properties: CurrentPropertyValue[] = [];
    this.performers.forEach((i) => {
      const v = i.get(name as string);
      if (v) {
        properties.push(v);
      }
    });

    return properties;
  },

  remove(
    this: AnimationInstance['creator'],
    ...names: (AllAnimableProperties | string)[]
  ) {
    this.performers.forEach((i) => {
      i.remove(...(names as string[]));
    });
    return this;
  },

  removeTarget(
    this: AnimationInstance['creator'],
    targets: AnimationOptions['targets']
  ) {
    this.performers.forEach((i) => {
      i.removeTarget(targets);
    });
    return this;
  },
};
export default CREATORS_FN_METHODS;
