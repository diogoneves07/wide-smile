import isDirValue from '../animation-mount/is-dir-value';
import {
  AnimationInstance,
  UserAnimationOptions,
} from '../contracts/animation-inter';
import CreatorFn from '../contracts/creator-fn';
import EasingsFunctionsList from '../contracts/easings-functions-list';
import PerformerFn from '../contracts/performer-fn';
import CREATORS_FN_METHODS from './creators-fns-methods';
import DEFAULTS_ANIMATION_PROPERTIES_VALUES from './defaults-animation-properties-values';
import NewPerformerFn from './new-performer-fn';

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

function creatorFnProperties(global: CreatorFn['global']) {
  return {
    dfs: { ...DEFAULTS_ANIMATION_PROPERTIES_VALUES },

    performers: [],

    global,

    ...CREATORS_FN_METHODS,
  };
}
function pureCreatorFn() {
  const creator = (Creator as unknown) as AnimationInstance['creator'];

  function Creator(): CreatorFn['global'];

  function Creator(
    performerProperties: UserAnimationOptions | object | string,
    ...props: (
      | EasingsFunctionsList
      | AnimationInstance['dir']
      | number
      | boolean
      | UserAnimationOptions
    )[]
  ): PerformerFn;

  function Creator(
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
  return Creator;
}
export default function NewCreatorFn(global: CreatorFn['global']): CreatorFn {
  return Object.assign(pureCreatorFn(), creatorFnProperties(global));
}
