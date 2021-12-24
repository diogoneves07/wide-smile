import CreateObserverPropertyCallbackfn from '../contracts/create-observer-property-callbackfn';
import CreateSpecialPropertyCallbackfn from '../contracts/create-special-property-callbackfn';
import CreatorFn from '../contracts/creator-fn';
import EasingFunction from '../contracts/easing-function';
import { WIDE_SMILE_VERSION } from './constants';
import { registerCustomEasing } from './custom-easings';
import {
  createCustomProperty,
  CUSTOM_SPECIAL_PROPERTIES,
  OBSERVER_PROPERTIES,
  removeCustomProperty,
} from './custom-properties-for-animations';
import NewCreatorFn from './new-creator-fn';

const CREATORS_FN_GLOBAL_PROPERTY: CreatorFn['global'] = {
  new() {
    const c = NewCreatorFn(CREATORS_FN_GLOBAL_PROPERTY);

    CREATORS_FN_GLOBAL_PROPERTY.all.push(c);

    return c;
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
    this: CreatorFn['global'],
    propertyOrProperties:
      | string
      | Record<string, CreateSpecialPropertyCallbackfn>,
    callbackfn?: CreateSpecialPropertyCallbackfn
  ) {
    createCustomProperty(propertyOrProperties, callbackfn, 'special');
    return this;
  },

  deleteSpecialProperty(
    this: CreatorFn['global'],
    ...propertiesNames: string[]
  ) {
    removeCustomProperty(propertiesNames, 'special');
    return this;
  },

  newObservedProperty(
    this: CreatorFn['global'],
    propertyOrProperties:
      | string
      | Record<string, CreateObserverPropertyCallbackfn>,
    callbackfn?: CreateObserverPropertyCallbackfn
  ) {
    createCustomProperty(propertyOrProperties, callbackfn, 'observed');
    return this;
  },

  deleteObservedProperty(
    this: CreatorFn['global'],
    ...propertiesNames: string[]
  ) {
    removeCustomProperty(propertiesNames, 'observed');
    return this;
  },
};

export default CREATORS_FN_GLOBAL_PROPERTY;
