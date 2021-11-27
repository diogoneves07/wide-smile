import getElementsInTheDOM from '../animation-mount/get-elements-in-the-dom';
import {
  addInStackForConstruction,
  useAnimationObjectExpectingSideEffects,
} from './organize-animation-creations';
import AnimableProperties from '../contracts/animable-properties';
import createAnimationPropertiesObject, {
  ANIMATION_PERFORMER_PROPERTIES,
} from './create-animation-properties-object';
import PERFORMER_FNS_METHODS from './performer-fns-methods';
import PerformerFn, {
  OverloadsForAnimationCreation,
  PerformerFnProperties,
} from '../contracts/performer-fn';
import PropertiesToAnimateObject from '../contracts/properties-to-animate-object';

import ValuesToAnimateProperty from '../contracts/values-to-animate-property';
import Keyframes from '../contracts/key-frames';
import {
  AnimationInstance,
  AnimationOptions,
  UserAnimationOptions,
} from '../contracts/animation-inter';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */

const NewPerformerFn = (
  performerProperties: UserAnimationOptions,
  creator: AnimationInstance['creator']
) => {
  const performerProps = performerProperties;
  const creatorDefaults = creator.dfs;
  const defaults: PerformerFnProperties = {
    creator,
    animationInstances: [],
    independentAnimations: [],
    propertiesUsed: [],
  };
  ANIMATION_PERFORMER_PROPERTIES.forEach((propertyName) => {
    defaults[propertyName as never] = creatorDefaults[propertyName as never];
  });

  if (performerProps.targets) {
    performerProps.targets = getElementsInTheDOM(performerProps.targets);
  }

  const animationPerformerProperties = { ...defaults, ...performerProps };

  const performerFn = Object.assign(
    (PerformerFnFn as unknown) as OverloadsForAnimationCreation,
    PERFORMER_FNS_METHODS,
    {
      $hidden: animationPerformerProperties as Required<PerformerFnProperties>,
      creator,
    }
  ) as PerformerFn;
  function PerformerFnFn(
    animate:
      | PropertiesToAnimateObject
      | Keyframes
      | AnimableProperties
      | number,
    parametersToAnimateOrPropertyValue?:
      | AnimationOptions
      | ValuesToAnimateProperty
      | true,
    parametersToAnimate?: AnimationOptions | AnimationOptions['dur'] | true
  ) {
    if (typeof animate === 'number') {
      performerFn.$hidden.currentAfterIterations = animate;
      return performerFn;
    }

    const animationProperties = createAnimationPropertiesObject(
      performerFn,
      animate as never,
      parametersToAnimateOrPropertyValue as never,
      parametersToAnimate as never
    );

    const lastAnimationParametersAdded = useAnimationObjectExpectingSideEffects(
      performerFn
    );

    useAnimationObjectExpectingSideEffects(performerFn, animationProperties);

    if (performerFn.$hidden.currentAfterIterations) {
      addInStackForConstruction(
        animationProperties,
        performerFn,
        lastAnimationParametersAdded,
        'afterIterations',
        performerFn.$hidden.currentAfterIterations
      );
    } else if (lastAnimationParametersAdded) {
      addInStackForConstruction(
        animationProperties,
        performerFn,
        lastAnimationParametersAdded,
        'together'
      );
    } else {
      addInStackForConstruction(animationProperties, performerFn);
    }

    return performerFn;
  }
  performerFn.$hidden.index = creator.performers.push(performerFn) - 1;
  return performerFn;
};

export default NewPerformerFn;
