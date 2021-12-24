import { ANIMATION_STATES, MAX_KEYFRAME } from './constants';
import LoadAnimation, {
  startAnimationIfItIsLoaded,
} from '../animation-mount/load-animation';
import normalizePastedAnimationProperties from '../animation-mount/normalize-animation-object-properties';
import { removeAnimationFromStack } from '../animation-engine/mount-animations-stack';
import AnimationConstructor from './animation-constructor';
import {
  addAnimationEventListener,
  propagateAnimationEventListener,
  LISTENERS_NAMES,
  removeAnimationEventListener,
} from '../animation-listeners/animations-listeners-handlers';
import iterationControlMethods from './iteration-control-methods';
import multiplyValue from '../utilities/multiply-value';
import getNewAnimationProgress from '../animation-engine/get-new-animation-progress';
import resumeAnimation from '../animation-actions/resume-animation';
import restartAnimation from '../animation-actions/restart-animation';
import updateAnimation from '../animation-engine/update-animation';
import destroyAnimation from '../animation-actions/destroy-animation';
import {
  AnimationInstance,
  AnimationInstancePropertiesAllWritable,
  AnimationOptions,
  PropertiesForTheCreationOfAnimation,
  UserAnimationObjectInternal,
} from '../contracts/animation-inter';
import { ListenersEventsName } from '../contracts/listeners-events-name';
import { getAnimationAuxiliaryObject } from '../animation-mount/crud-animation-objects';
import removeAnimationStyle from '../animation-engine/remove-animation-style';
import AnimationAuxiliaryObject from '../contracts/animation-auxiliary-object';
import PerformerFn from '../contracts/performer-fn';
import pushPerformerAgainToTheCreator from './push-performer-again-to-the-creator';
import {
  removePropertyFromAnimation,
  removeTargetFromAnimation,
} from '../animation-actions/remove-from-animation';
import AllAnimableProperties from '../contracts/animable-properties';

interface AnimationWS extends AnimationInstance {
  [key: string]: unknown;
}

class AnimationWS implements AnimationInstance {
  constructor(
    animation:
      | AnimationInstancePropertiesAllWritable
      | UserAnimationObjectInternal
      | PropertiesForTheCreationOfAnimation,
    creator: AnimationInstance['creator']
  ) {
    const U_A_O = normalizePastedAnimationProperties(
      animation
    ) as UserAnimationObjectInternal;
    Object.assign(this, AnimationConstructor(U_A_O, creator));

    pushPerformerAgainToTheCreator(this);

    return this;
  }

  load(): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );

    if (!animationAuxiliaryObject) {
      LoadAnimation(this, (aAuxiliaryObject: AnimationAuxiliaryObject) => {
        const a = aAuxiliaryObject;
        if (
          a.dataLoadingState === 'load' &&
          a.animation.state !== ANIMATION_STATES[3]
        ) {
          a.animation.state = ANIMATION_STATES[5];
        }
      });
    }

    return this;
  }

  play(): this {
    if (
      this.state === ANIMATION_STATES[0] ||
      this.state === ANIMATION_STATES[5] ||
      this.state === ANIMATION_STATES[6]
    ) {
      LoadAnimation(this, startAnimationIfItIsLoaded);
    }
    return this;
  }

  pause(): this {
    if (this.state === ANIMATION_STATES[1]) {
      this.state = ANIMATION_STATES[3];

      removeAnimationFromStack(this.animationId);
    }

    return this;
  }

  resume(): this {
    if (this.state === ANIMATION_STATES[3]) {
      resumeAnimation(this);
    }

    return this;
  }

  restart(): this {
    removeAnimationFromStack(this.animationId);
    restartAnimation(this);

    return this;
  }

  end(): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (this.state !== ANIMATION_STATES[1]) {
      if (this.state === ANIMATION_STATES[6]) {
        const setTimeoutId = setTimeout(() => {
          clearTimeout(setTimeoutId);
          this.end();
        }, 0);
      }
      return this;
    }
    if (animationAuxiliaryObject) {
      if (typeof this.loop === 'number') {
        this.count = this.loop - 1;
        const animationProgressObject = getNewAnimationProgress(
          animationAuxiliaryObject
        );
        animationAuxiliaryObject.countDriveLoops =
          animationProgressObject.countDriveLoops;
        this.max = animationProgressObject.maxProgress;
      }

      this.progressValue = this.max;

      updateAnimation(animationAuxiliaryObject);
    }

    return this;
  }

  go(part: number): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (animationAuxiliaryObject) {
      iterationControlMethods(
        animationAuxiliaryObject.duration,
        undefined,
        part,
        this
      );
    }

    return this;
  }

  back(part: number): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (animationAuxiliaryObject) {
      animationAuxiliaryObject.backRunning = true;

      iterationControlMethods(
        animationAuxiliaryObject.duration,
        undefined,
        part,
        this
      );
    }

    return this;
  }

  jump(part: number): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    const toProgress = (MAX_KEYFRAME / 1) * Math.min(Math.max(part, 0), 1);

    if (animationAuxiliaryObject) {
      const reverseExecution = animationAuxiliaryObject.reverseExecution;
      const newProgress = reverseExecution
        ? MAX_KEYFRAME - toProgress
        : toProgress;

      this.progressValue = newProgress;
      this.max = newProgress;

      updateAnimation(animationAuxiliaryObject);
    }

    return this;
  }

  speed(multiply: number): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (animationAuxiliaryObject) {
      iterationControlMethods(
        animationAuxiliaryObject.duration,
        multiplyValue(this.dur, multiply),
        (1 / MAX_KEYFRAME) * this.max,
        this
      );
    }

    return this;
  }

  revert(endIteration?: boolean): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );

    if (animationAuxiliaryObject) {
      const lastStartProgress = animationAuxiliaryObject.lastStartProgress || 0;

      if (!endIteration) {
        animationAuxiliaryObject.backRunning = true;
      }
      iterationControlMethods(
        animationAuxiliaryObject.duration,
        undefined,
        (1 / MAX_KEYFRAME) * lastStartProgress,
        this
      );
    }

    return this;
  }

  dirTo(dir: Parameters<AnimationInstance['dirTo']>['0']): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (animationAuxiliaryObject) {
      let direction: AnimationInstance['dir'];
      switch (dir) {
        case 0:
          direction = 'normal';
          break;
        case 1:
          direction = 'reverse';
          break;
        case 2:
          direction = 'alternate';
          break;
        case 3:
          direction = 'alternate-reverse';
          break;

        default:
          direction = dir;
          break;
      }
      this.dir = direction;
      updateAnimation(animationAuxiliaryObject);
    }
    return this;
  }

  cancel(): this {
    const animationAuxiliaryObject = getAnimationAuxiliaryObject(
      this.animationId
    );
    if (animationAuxiliaryObject) {
      const removeChanges = this.removeChanges;
      removeAnimationFromStack(this.animationId);

      this.removeChanges = true;
      removeAnimationStyle(animationAuxiliaryObject);
      this.removeChanges = removeChanges;

      propagateAnimationEventListener(LISTENERS_NAMES[4], this);
    }
    this.state = ANIMATION_STATES[7];

    return this;
  }

  destroy(removeChanges?: true): boolean {
    if (removeChanges) {
      this.removeChanges = true;
    }
    removeAnimationFromStack(this.animationId);

    propagateAnimationEventListener(LISTENERS_NAMES[5], this);

    destroyAnimation(this);

    /**
     * Important ! Set the property state to avoid side effects of timeouts.
     */
    this.state = ANIMATION_STATES[4];

    return true;
  }

  on(
    eventName: ListenersEventsName | AllAnimableProperties | string,
    callbackfn: (
      this: PerformerFn,
      item: unknown,
      performerFn: PerformerFn
    ) => unknown
  ): this {
    addAnimationEventListener(eventName, callbackfn, this);
    return this;
  }

  off(
    eventName: ListenersEventsName | AllAnimableProperties | string,
    callbackfnUsed: Function
  ): this {
    removeAnimationEventListener(eventName, callbackfnUsed, this);
    return this;
  }

  remove(...names: (AllAnimableProperties | string)[]): this {
    removePropertyFromAnimation(names, this);
    return this;
  }

  removeTarget(targets: AnimationOptions['targets']): this {
    removeTargetFromAnimation(targets, this);
    return this;
  }
}

export default AnimationWS;
