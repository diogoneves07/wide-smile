import getElementsInTheDOM from '../animation-mount/get-elements-in-the-dom';
import { addAnimationObjectToTheConstructionStack } from './organize-animation-creations';
import AllAnimableProperties from '../contracts/animable-properties';
import createAnimationPropertiesObject, {
  ANIMATION_PERFORMER_PROPERTIES,
} from './create-animation-properties-object';
import PERFORMER_FNS_METHODS from './performer-fns-methods';
import PerformerFn, { PerformerFnProperties } from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';

import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import Keyframes from '../contracts/key-frames';
import {
  AnimationInstance,
  AnimationOptions,
  UserAnimationOptions,
} from '../contracts/animation-inter';
import {
  addLastAnimationObjectAddedToPerformer,
  getLastAnimationObjectAddedToPerformer,
} from './last-added-animation-object';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
let COUNT_PERFORMER_ID = 0;
function getNewPerformerFn(
  creator: AnimationInstance['creator'],
  animationPerformerProperties: Required<PerformerFnProperties>
) {
  const performerFn = (function Performer(
    animate:
      | PropertiesToAnimateObject
      | Keyframes
      | AllAnimableProperties
      | number,
    parametersToAnimateOrPropertyValue?:
      | AnimationOptions
      | ValuesToAnimateProperty
      | true,
    parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
  ) {
    const animationProperties = createAnimationPropertiesObject(
      performerFn,
      animate as never,
      parametersToAnimateOrPropertyValue as never,
      parametersToAnimate as never
    );

    const lastAnimationParametersAdded = getLastAnimationObjectAddedToPerformer(
      performerFn
    );

    addLastAnimationObjectAddedToPerformer(performerFn, animationProperties);

    if (performerFn.$hidden.currentAfterIterations) {
      addAnimationObjectToTheConstructionStack(
        performerFn,
        animationProperties,
        lastAnimationParametersAdded,
        'afterIterations',
        performerFn.$hidden.currentAfterIterations
      );
      performerFn.$hidden.currentAfterIterations = undefined;
    } else if (performerFn.$hidden.currentWaitExecutionTime) {
      addAnimationObjectToTheConstructionStack(
        performerFn,
        animationProperties,
        lastAnimationParametersAdded,
        'waitExecutionTime',
        performerFn.$hidden.currentWaitExecutionTime
      );
      performerFn.$hidden.currentWaitExecutionTime = undefined;
    } else if (lastAnimationParametersAdded) {
      addAnimationObjectToTheConstructionStack(
        performerFn,
        animationProperties,

        lastAnimationParametersAdded,
        'together'
      );
    } else {
      addAnimationObjectToTheConstructionStack(
        performerFn,
        animationProperties
      );
    }

    return performerFn;
  } as unknown) as PerformerFn;

  COUNT_PERFORMER_ID += 1;

  Object.assign(performerFn, PERFORMER_FNS_METHODS, {
    id: COUNT_PERFORMER_ID,
    $hidden: animationPerformerProperties as Required<PerformerFnProperties>,
    creator,
  });

  return performerFn;
}
const NewPerformerFn = (
  performerProperties: UserAnimationOptions,
  creator: AnimationInstance['creator']
) => {
  const performerProps = performerProperties;
  const creatorDefaults = creator.dfs;
  const defaults: PerformerFnProperties = {
    animationInstances: [],
    independentAnimations: [],
    orderOfThePropertiesUsed: [],
  };
  ANIMATION_PERFORMER_PROPERTIES.forEach((propertyName) => {
    defaults[propertyName as never] = creatorDefaults[propertyName as never];
  });

  if (performerProps.targets) {
    performerProps.targets = getElementsInTheDOM(performerProps.targets);
  }

  const performerFn = getNewPerformerFn(creator, {
    ...defaults,
    ...performerProps,
  } as Required<PerformerFnProperties>);

  creator.performers.push(performerFn);

  return performerFn;
};

export default NewPerformerFn;
