(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wS"] = factory();
	else
		root["wS"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animation-actions/destroy-animation.ts":
/*!****************************************************!*\
  !*** ./src/animation-actions/destroy-animation.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ destroyAnimation; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _animation_engine_remove_animation_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation-engine/remove-animation-style */ "./src/animation-engine/remove-animation-style.ts");
/* harmony import */ var _sauce_remove_reference_in_creator_to_performer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sauce/remove-reference-in-creator-to-performer */ "./src/sauce/remove-reference-in-creator-to-performer.ts");






function removeInstance(array, animation) {
  return array.filter(function (i) {
    return i !== animation;
  });
}
/**
 * Destroys an animation.
 */


function destroyAnimation(a) {
  var animation = a;
  var performerProperties = animation.performer.$hidden;
  var cycleOptions = performerProperties.cycleOptions;
  if (!animation.state) return;
  animation.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[4];
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.getAnimationAuxiliaryObject)(animation.animationId);

  if (animationAuxiliaryObject) {
    (0,_animation_engine_remove_animation_style__WEBPACK_IMPORTED_MODULE_3__.default)(animationAuxiliaryObject);
    (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.removeAnimationAuxiliaryObject)(animation.animationId);
  }

  performerProperties.animationInstances = removeInstance(performerProperties.animationInstances, animation);
  performerProperties.independentAnimations = removeInstance(performerProperties.independentAnimations, animation);

  if (cycleOptions) {
    if (cycleOptions.animationInstancesInCycle) {
      cycleOptions.animationInstancesInCycle = removeInstance(cycleOptions.animationInstancesInCycle, animation);
    }

    if (cycleOptions.sequence) {
      var sequence = cycleOptions.sequence;
      var l = sequence.length;

      for (var index = 0; index < l; index += 1) {
        sequence[index] = removeInstance(sequence[index], animation);
      }

      cycleOptions.sequence = sequence.filter(function (i) {
        return i.length > 0;
      });
    }
  }

  (0,_sauce_remove_reference_in_creator_to_performer__WEBPACK_IMPORTED_MODULE_4__.default)(animation.performer);
  (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__.removeAllAnimationEventListeners)(animation.animationId);
}

/***/ }),

/***/ "./src/animation-actions/get-current-properties-value.ts":
/*!***************************************************************!*\
  !*** ./src/animation-actions/get-current-properties-value.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCurrentPropertiesValue; }
/* harmony export */ });
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _sauce_get_property_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/get-property-name */ "./src/sauce/get-property-name.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");




function concatProperties(currentPropertiesValue, newProperties) {
  newProperties.forEach(function (newPropertyObject) {
    var index = currentPropertiesValue.findIndex(function (p) {
      return newPropertyObject.propertyName === p.propertyName && newPropertyObject.target === p.target;
    });

    if (index > -1) {
      if (newPropertyObject.dateLastIntercalation > currentPropertiesValue[index].dateLastIntercalation) {
        currentPropertiesValue.splice(index, 1);
        currentPropertiesValue.push(newPropertyObject);
      }
    } else {
      currentPropertiesValue.push(newPropertyObject);
    }
  });
  return currentPropertiesValue;
}

function getCurrentPropertiesValue(performer, name) {
  var propertyName = (0,_sauce_get_property_name__WEBPACK_IMPORTED_MODULE_1__.default)(performer, (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_2__.toCamelCase)(name.toString()));
  var animationInstances = performer.$hidden.animationInstances.slice().reverse();
  var length = animationInstances.length;
  var currentPropertiesValue = [];

  var _loop = function _loop(index) {
    var animation = animationInstances[index];
    var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__.getAnimationAuxiliaryObject)(animation.animationId);

    if (animationAuxiliaryObject) {
      var propertyObjects = animationAuxiliaryObject.propertiesToBeAnimate.filter(function (propertyObject) {
        return propertyObject.propertyName === propertyName;
      }).map(function (o) {
        return {
          target: o.target,
          value: o.newPropertyValue,
          propertyName: propertyName,
          dateLastIntercalation: animationAuxiliaryObject.dateLastIntercalation
        };
      });

      if (propertyObjects[0]) {
        currentPropertiesValue = concatProperties(currentPropertiesValue, propertyObjects);
      }
    }
  };

  for (var index = 0; index < length; index += 1) {
    _loop(index);
  }

  if (currentPropertiesValue[0]) {
    return {
      target: currentPropertiesValue[0].target,
      value: currentPropertiesValue[0].value,
      propertyName: currentPropertiesValue[0].propertyName
    };
  }

  return undefined;
}

/***/ }),

/***/ "./src/animation-actions/load-animations-and-play-when-ready.ts":
/*!**********************************************************************!*\
  !*** ./src/animation-actions/load-animations-and-play-when-ready.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ loadAnimationsAndPlayWhenReady; }
/* harmony export */ });
/* harmony import */ var _sauce_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/apply-callback-for-future-animations */ "./src/sauce/apply-callback-for-future-animations.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");


function loadAnimationsAndPlayWhenReady(performer) {
  var setTimeoutId = -1;
  var animationInstances = [];

  function readyLogic() {
    var count = 0;
    var length = animationInstances.length;

    function countFn(a) {
      var animation = a;
      animation.autoPlay = true;
      count += 1;

      if (count >= length) {
        animationInstances.forEach(function (i) {
          if (a.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[5] && performer.$hidden.independentAnimations.indexOf(i) > -1) {
            i.play();
          }
        });
      }
    }

    animationInstances.forEach(function (animation) {
      if (animation.state !== _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[5]) {
        animation.on('load', function f() {
          countFn(animation);
          animation.off('load', f);
        }).load();
      } else {
        countFn(animation);
      }
    });
  }

  (0,_sauce_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_0__.default)(performer, function (a) {
    var animation = a;
    animationInstances.push(animation);
    animation.autoPlay = false;

    if (setTimeoutId < 0) {
      setTimeoutId = setTimeout(function () {
        readyLogic();
        clearTimeout(setTimeoutId);
      }, 0);
    }
  });
}

/***/ }),

/***/ "./src/animation-actions/progress-animation-go-to.ts":
/*!***********************************************************!*\
  !*** ./src/animation-actions/progress-animation-go-to.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ progressAnimationGoTo; }
/* harmony export */ });
/* harmony import */ var _animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-engine/mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _animation_engine_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-engine/reset-animation-time-properties */ "./src/animation-engine/reset-animation-time-properties.ts");
/* harmony import */ var _animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-engine/start-animation-execution-cycle */ "./src/animation-engine/start-animation-execution-cycle.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");




function progressAnimationGoTo(animationId, newProgress, applyDelay) {
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_3__.getAnimationAuxiliaryObject)(animationId);

  if (animationAuxiliaryObject) {
    var animation = animationAuxiliaryObject.animation;
    (0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_0__.removeAnimationFromStack)(animationAuxiliaryObject.animationId);
    animationAuxiliaryObject.lastStartProgress = animation.progressValue;
    animation.max = newProgress;

    if (animation.loop === animation.count) {
      animation.count -= 1;
    }

    if (applyDelay) {
      (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_2__.default)((0,_animation_engine_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_1__.default)(animationAuxiliaryObject));
    } else {
      (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_2__.default)((0,_animation_engine_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_1__.default)(animationAuxiliaryObject), true);
    }
  }
}

/***/ }),

/***/ "./src/animation-actions/remove-from-animation.ts":
/*!********************************************************!*\
  !*** ./src/animation-actions/remove-from-animation.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removePropertyFromAnimation": function() { return /* binding */ removePropertyFromAnimation; },
/* harmony export */   "removeTargetFromAnimation": function() { return /* binding */ removeTargetFromAnimation; }
/* harmony export */ });
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _animation_mount_get_elements_in_the_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/get-elements-in-the-dom */ "./src/animation-mount/get-elements-in-the-dom.ts");
/* harmony import */ var _animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






function remove(item, animation) {
  var prop = _typeof(item) === 'object' ? 'target' : 'propertyName';
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__.getAnimationAuxiliaryObject)(animation.animationId);

  if (animationAuxiliaryObject) {
    animationAuxiliaryObject.propertiesToBeAnimate = animationAuxiliaryObject.propertiesToBeAnimate.filter(function (propertyObject) {
      var check = propertyObject[prop] !== item;

      if (!check) {
        (0,_animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__.recyclePropertyObjectToAnimate)(propertyObject);
      }

      return check;
    });
  }
}

function removePropertyFromAnimation(names, animation) {
  names.forEach(function (name) {
    var propertyName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.toCamelCase)(name.toString());
    remove(propertyName, animation);
  });
}
function removeTargetFromAnimation(targets, animation) {
  (0,_animation_mount_get_elements_in_the_dom__WEBPACK_IMPORTED_MODULE_1__.default)(targets).forEach(function (o) {
    remove(o, animation);
  });
}

/***/ }),

/***/ "./src/animation-actions/restart-animation.ts":
/*!****************************************************!*\
  !*** ./src/animation-actions/restart-animation.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ restartAnimation; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/load-animation */ "./src/animation-mount/load-animation.ts");
/* harmony import */ var _animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-engine/start-animation-execution-cycle */ "./src/animation-engine/start-animation-execution-cycle.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _animation_engine_restart_animation_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../animation-engine/restart-animation-properties */ "./src/animation-engine/restart-animation-properties.ts");





/**
 * Restart animation.
 */

function restartAnimation(animation) {
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_3__.getAnimationAuxiliaryObject)(animation.animationId);
  var u = animation;

  if (animationAuxiliaryObject) {
    (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_2__.default)((0,_animation_engine_restart_animation_properties__WEBPACK_IMPORTED_MODULE_4__.default)(animationAuxiliaryObject));
  } else {
    u.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0];
    u.count = 0;
    (0,_animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__.default)(animation, _animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__.startAnimationIfItIsLoaded);
  }
}

/***/ }),

/***/ "./src/animation-actions/resume-animation.ts":
/*!***************************************************!*\
  !*** ./src/animation-actions/resume-animation.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ resumeAnimation; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-engine/start-animation-execution-cycle */ "./src/animation-engine/start-animation-execution-cycle.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");



/**
 * Resumes the animation that was paused.
 */

function resumeAnimation(requiredAnimationProperties) {
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.getAnimationAuxiliaryObject)(requiredAnimationProperties.animationId);

  if (animationAuxiliaryObject) {
    var u = animationAuxiliaryObject.animation;

    if (animationAuxiliaryObject.animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[3]) {
      u.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1];
      (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_1__.default)(animationAuxiliaryObject, true);
    }
  }
}

/***/ }),

/***/ "./src/animation-actions/set-property-value.ts":
/*!*****************************************************!*\
  !*** ./src/animation-actions/set-property-value.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ setPropertyValue; }
/* harmony export */ });
/* harmony import */ var _animation_engine_crud_animations_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-engine/crud-animations-style */ "./src/animation-engine/crud-animations-style.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function setPropertyValue(performer, properties, propertyValue) {
  var targets = performer.$hidden.targets;
  var newPerformer = performer.creator(targets);
  newPerformer.$hidden.ignorePerformer = true;
  newPerformer.$hidden.orderOfThePropertiesUsed = performer.$hidden.orderOfThePropertiesUsed.slice();
  var animationOptions = {
    skip: true,
    autoPlay: false,
    dur: 0
  };

  if (typeof properties === 'string' && propertyValue) {
    newPerformer.$(properties, propertyValue, animationOptions);
  } else if (_typeof(properties) === 'object') {
    newPerformer.$(properties, animationOptions);
  }

  newPerformer.on('load', function () {
    var animation = newPerformer.$hidden.animationInstances[0];
    var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_1__.getAnimationAuxiliaryObject)(animation.animationId);

    if (animationAuxiliaryObject) {
      animation.progressValue = 100;
      animation.max = 100;
      (0,_animation_engine_crud_animations_style__WEBPACK_IMPORTED_MODULE_0__.applyAnimationsStyleToTargets)(animationAuxiliaryObject.propertiesToBeAnimate, animationAuxiliaryObject);
      newPerformer.destroy();
    }
  }).load();
}

/***/ }),

/***/ "./src/animation-engine/all-animation-targets-have-been-removed.ts":
/*!*************************************************************************!*\
  !*** ./src/animation-engine/all-animation-targets-have-been-removed.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ allAnimationTargetsHaveBeenRemoved; }
/* harmony export */ });
function allAnimationTargetsHaveBeenRemoved(animation) {
  animation.destroy();
}

/***/ }),

/***/ "./src/animation-engine/animation-completed.ts":
/*!*****************************************************!*\
  !*** ./src/animation-engine/animation-completed.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ animationCompleted; }
/* harmony export */ });
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _remove_animation_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./remove-animation-style */ "./src/animation-engine/remove-animation-style.ts");




function animationCompleted(animationAuxiliaryObject) {
  var aAuxiliaryObject = animationAuxiliaryObject;
  var animation = animationAuxiliaryObject.animation;
  animation.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_STATES[2];
  (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[7], animation);
  (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[2], animation);

  if (animation.isInCycle) {
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[11], animation);
  }

  if (animation.autoDestroy) {
    (0,_animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_1__.recyclePropertyObjectsToAnimate)(aAuxiliaryObject.propertiesToBeAnimate);
    animation.destroy();
  } else if (animation.reset) {
    var removeChanges = animation.removeChanges;
    animation.removeChanges = true;
    (0,_remove_animation_style__WEBPACK_IMPORTED_MODULE_3__.default)(aAuxiliaryObject);
    animation.removeChanges = removeChanges;
  }
}

/***/ }),

/***/ "./src/animation-engine/animation-intercalation-completed.ts":
/*!*******************************************************************!*\
  !*** ./src/animation-engine/animation-intercalation-completed.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ animationIntercalationCompleted; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/manage-memory-collections */ "./src/sauce/manage-memory-collections.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _utilities_to_ms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/to-ms */ "./src/utilities/to-ms.ts");
/* harmony import */ var _animation_iteration_completed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animation-iteration-completed */ "./src/animation-engine/animation-iteration-completed.ts");
/* harmony import */ var _manage_animations_delay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./manage-animations-delay */ "./src/animation-engine/manage-animations-delay.ts");
/* harmony import */ var _new_animation_intercalation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./new-animation-intercalation */ "./src/animation-engine/new-animation-intercalation.ts");







/**
 * Checks whether the animation iteration has been completed or there should be more intercalations.
 */

function animationIntercalationCompleted(animationAuxiliaryObject) {
  (0,_sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_1__.releasesGarbageFromAnimations)();
  var aAuxiliaryObject = animationAuxiliaryObject;
  var animation = aAuxiliaryObject.animation;

  if (animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
    var reverseExecution = aAuxiliaryObject.reverseExecution;
    var maxProgress = animation.max;
    var progress = animation.progressValue;

    if (reverseExecution && progress < maxProgress || !reverseExecution && progress > maxProgress || progress === maxProgress) {
      animation.progressValue = maxProgress;
      var endDelay = Math.max((0,_utilities_to_ms__WEBPACK_IMPORTED_MODULE_3__.default)(animation.endDelay));

      if (endDelay > 0) {
        (0,_manage_animations_delay__WEBPACK_IMPORTED_MODULE_5__.default)(aAuxiliaryObject, endDelay, (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_2__.default)(), _animation_iteration_completed__WEBPACK_IMPORTED_MODULE_4__.default);
      } else {
        (0,_animation_iteration_completed__WEBPACK_IMPORTED_MODULE_4__.default)(aAuxiliaryObject);
      }
    } else {
      (0,_new_animation_intercalation__WEBPACK_IMPORTED_MODULE_6__.default)(aAuxiliaryObject);
    }
  }
}

/***/ }),

/***/ "./src/animation-engine/animation-iteration-completed.ts":
/*!***************************************************************!*\
  !*** ./src/animation-engine/animation-iteration-completed.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ animationIterationCompleted; }
/* harmony export */ });
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_completed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation-completed */ "./src/animation-engine/animation-completed.ts");
/* harmony import */ var _get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-new-values-for-animation-intercalation */ "./src/animation-engine/get-new-values-for-animation-intercalation.ts");
/* harmony import */ var _insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insert-animation-in-the-queue */ "./src/animation-engine/insert-animation-in-the-queue.ts");
/* harmony import */ var _new_animation_intercalation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./new-animation-intercalation */ "./src/animation-engine/new-animation-intercalation.ts");
/* harmony import */ var _reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reset-animation-time-properties */ "./src/animation-engine/reset-animation-time-properties.ts");
/* harmony import */ var _get_new_animation_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get-new-animation-progress */ "./src/animation-engine/get-new-animation-progress.ts");







function animationIterationCompleted(animationAuxiliaryObject) {
  var a = animationAuxiliaryObject;
  var animation = a.animation;
  var backRunning = a.backRunning;
  var maxProgress = animation.max;
  var amountOfIterations = animation.loop;
  var iterationsCompleted = animation.count;
  var backRunningStopped = -1;
  a.propertiesToBeAnimate.forEach(function (obj) {
    var o = obj;
    o.lastKey = undefined;
  });
  /**
   * Checks that the completion of the iteration was not an animation return action(methods: `go` and `back`).
   */

  if (!backRunning) {
    iterationsCompleted += 1;
  }

  animation.count = iterationsCompleted;

  if (amountOfIterations > iterationsCompleted || amountOfIterations === Infinity || amountOfIterations === true) {
    if (backRunning) {
      backRunningStopped = animation.progressValue;
      backRunning = false;
      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[7], animation);
    }

    var animationProgressObject = (0,_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_6__.default)(a);
    a.countDriveLoops = animationProgressObject.countDriveLoops;
    a.lastStartProgress = animationProgressObject.progress;
    maxProgress = animationProgressObject.maxProgress;
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[7], animation);
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[1], animation);
    (0,_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_5__.default)(a);
    a.backRunning = backRunning;
    animation.max = maxProgress;
    animation.progressValue = animationProgressObject.progress;

    if (backRunningStopped > -1) {
      /**
       * Maintain the value of the last progress.
       */
      animation.progressValue = backRunningStopped;
      (0,_new_animation_intercalation__WEBPACK_IMPORTED_MODULE_4__.default)(a);
    } else {
      var newIntercalationObject = (0,_get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_2__.default)(a);
      Object.assign(a, newIntercalationObject.toAuxiliaryObject);
      animation.progressValue = newIntercalationObject.progress;
      (0,_insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_3__.default)(a);
    }
  } else {
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[1], animation);
    (0,_animation_completed__WEBPACK_IMPORTED_MODULE_1__.default)(a);
  }
}

/***/ }),

/***/ "./src/animation-engine/calc-next-property-value.ts":
/*!**********************************************************!*\
  !*** ./src/animation-engine/calc-next-property-value.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ calcNextPropertyValue; }
/* harmony export */ });
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");



function treatSupportsFloatingValue(propertyValues) {
  var values = propertyValues;
  var hasRGB = values.findIndex(function (v) {
    return v.indexOf('rgb') > -1;
  });

  if (hasRGB > -1) {
    var index = hasRGB;

    do {
      var v = Number((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(values[index]));

      if (!Number.isNaN(v)) {
        values[index] = Math.round(v) + ((0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__.default)(values[index]) || '');
      }

      index += 1;
    } while (values[index] !== ')');
  }

  return values;
}

function calcNextPropertyValue(propertyObject, fromAndTo, currentPercent, easingFn, round) {
  var startValues = propertyObject.keyframes[fromAndTo[0]];
  var endValues = propertyObject.keyframes[fromAndTo[1]];
  var newValue = [];
  endValues.forEach(function (value, index) {
    var startValueIndex = startValues[index] ? (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(startValues[index]) : '0';
    var result;

    if (!Number.isNaN(parseFloat(value))) {
      var unitOfMeasure = (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__.default)(value) || (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__.default)(startValueIndex) || '';
      var fromNumber = parseFloat(startValueIndex);
      var toNumber = parseFloat((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(value));
      result = easingFn(1 / 100 * currentPercent, propertyObject.target, propertyObject.index, propertyObject.originalArrayLength);
      result = fromNumber + result * (toNumber - fromNumber);

      if (round) {
        result = Math.round(result * round) / round;
      }

      result = " ".concat(result.toString() + unitOfMeasure);
    } else {
      result = value;
    }

    newValue.push(result);
  });
  return (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(treatSupportsFloatingValue(newValue).join(''));
}

/***/ }),

/***/ "./src/animation-engine/crud-animations-style.ts":
/*!*******************************************************!*\
  !*** ./src/animation-engine/crud-animations-style.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformFunctionsToObject": function() { return /* binding */ transformFunctionsToObject; },
/* harmony export */   "transformFunctionsObjectToString": function() { return /* binding */ transformFunctionsObjectToString; },
/* harmony export */   "applyAnimationsStyleToTargets": function() { return /* binding */ applyAnimationsStyleToTargets; }
/* harmony export */ });
/* harmony import */ var _utilities_style_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/index */ "./src/utilities-style/index.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/dom-attributes */ "./src/utilities/dom-attributes.ts");
/* harmony import */ var _sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sauce/custom-properties-for-animations */ "./src/sauce/custom-properties-for-animations.ts");
/* harmony import */ var _calc_next_property_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calc-next-property-value */ "./src/animation-engine/calc-next-property-value.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../animation-mount/property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/is-dom-element */ "./src/utilities/is-dom-element.ts");









function transformFunctionsToObject(target) {
  var t = (0,_utilities_style_index__WEBPACK_IMPORTED_MODULE_0__.getVendorCSSProperty)('transform');
  var current = target.style[t];

  if (current) {
    return (0,_utilities_style_index__WEBPACK_IMPORTED_MODULE_0__.CSSStringRulesToObject)(current.replace(/[(]/g, ':').replace(/[)]/g, ';'));
  }

  return false;
}
function transformFunctionsObjectToString(transformFunctionsObject) {
  var newValue = '';
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.customForIn)(transformFunctionsObject, function (v, n) {
    if (v) {
      newValue += "".concat(n, "(").concat((0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.trimString)(v).replace(/( {2})/g, ' ').replace(/ /g, ', ').replace(/,,/g, ','), ")");
    }
  });
  return newValue;
}

function animateTargetTransform(target, propertyName, propertyValue, beforeAnimating) {
  var fnName = propertyName;
  var properties = beforeAnimating.transfromFns;
  var elt = target;
  var t = (0,_utilities_style_index__WEBPACK_IMPORTED_MODULE_0__.getVendorCSSProperty)('transform');
  var transformFunctionsObject = transformFunctionsToObject(target) || {};

  if (!(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty)(properties, fnName)) {
    properties[fnName] = transformFunctionsObject[fnName] || '';
  }

  transformFunctionsObject[fnName] = propertyValue;
  elt.style[t] = transformFunctionsObjectToString(transformFunctionsObject);
}

function animateTargetCSS(target, propertyName, propertyValue, beforeAnimating) {
  var properties = beforeAnimating.style;
  var elt = target;

  if (!(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty)(properties, propertyName)) {
    properties[propertyName] = elt.style[propertyName];
  }

  elt.style[propertyName] = propertyValue;
}

function animateTargetDirectProps(target, propertyName, propertyValue, beforeAnimating) {
  var pName = propertyName;
  var elt = target;
  var properties = beforeAnimating.direct;

  if (!(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty)(beforeAnimating, pName)) {
    properties[pName] = elt[pName];
  }

  elt[pName] = propertyValue;
}

function animateTargetAttributes(target, propertyName, propertyValue, beforeAnimating) {
  var pName = (0,_utilities_style_index__WEBPACK_IMPORTED_MODULE_0__.toCSSKebabCase)(propertyName);
  var properties = beforeAnimating.attr;

  if (!(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty)(properties, propertyName)) {
    properties[propertyName] = (0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_2__.getAttr)(target, pName);
  }

  (0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_2__.setAttr)(target, pName, propertyValue);
}

function animateTargetObserved(target, propertyName, value, percentageCompleted, index) {
  return (0,_sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_3__.getCustomProperty)(propertyName, 'observed')(value, percentageCompleted, target, index);
}

function applyAnimationsStyleToTargets(propertiesToBeAnimate, animationAuxiliaryObject) {
  var valuesOfThePropertiesBeforeAnimating = animationAuxiliaryObject.valuesOfThePropertiesBeforeAnimating,
      reverseExecution = animationAuxiliaryObject.reverseExecution,
      animation = animationAuxiliaryObject.animation;
  var progress = animation.progressValue;
  propertiesToBeAnimate.slice().forEach(function (o, index) {
    var propertyObject = o;
    var target = propertyObject.target;

    if (((0,_utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_8__.default)(target) || 'parentElement' in target) && !target.parentElement && !target.parentNode) {
      (0,_animation_mount_property_object_to_animate__WEBPACK_IMPORTED_MODULE_7__.recyclePropertyObjectToAnimate)(propertyObject);
      propertiesToBeAnimate.splice(index, 1);
    } else {
      if (!valuesOfThePropertiesBeforeAnimating[propertyObject.index]) {
        valuesOfThePropertiesBeforeAnimating[propertyObject.index] = {
          style: {},
          attr: {},
          direct: {},
          transfromFns: {}
        };
      }

      var from = 0;
      var to = _sauce_constants__WEBPACK_IMPORTED_MODULE_5__.MAX_KEYFRAME;

      if (propertyObject.keyframesKeys) {
        var l = propertyObject.keyframesKeys.length;

        for (var i = 0; i < l; i += 1) {
          var key = propertyObject.keyframesKeys[i];

          if (progress <= key) {
            to = key;
            break;
          }

          from = key;
        }
      }

      var percentageInRelationToKey = to - from > 0 ? _sauce_constants__WEBPACK_IMPORTED_MODULE_5__.MAX_KEYFRAME / (to - from) * (progress - from) : _sauce_constants__WEBPACK_IMPORTED_MODULE_5__.MAX_KEYFRAME;

      if (typeof propertyObject.lastKey === 'number' && propertyObject.lastKey !== to && !reverseExecution) {
        var s = to;
        percentageInRelationToKey = reverseExecution ? 0 : _sauce_constants__WEBPACK_IMPORTED_MODULE_5__.MAX_KEYFRAME;
        to = propertyObject.lastKey;
        propertyObject.lastKey = s;
        from = to;
      } else {
        propertyObject.lastKey = to;
      }

      if (reverseExecution) {
        var ss = from;
        from = to;
        to = ss;
        percentageInRelationToKey = reverseExecution ? _sauce_constants__WEBPACK_IMPORTED_MODULE_5__.MAX_KEYFRAME - percentageInRelationToKey : percentageInRelationToKey;
      }

      if (propertyObject.type === 'observed') {
        var result = animationAuxiliaryObject.easing(1 / 100 * percentageInRelationToKey, target, propertyObject.index, propertyObject.originalArrayLength);
        var lastValue = propertyObject.newPropertyValue || (reverseExecution ? propertyObject.keyframes[100] : propertyObject.keyframes[0]);
        propertyObject.newPropertyValue = animateTargetObserved(target, propertyObject.propertyName, reverseExecution ? propertyObject.keyframes[from] : propertyObject.keyframes[to], 0 + result * (100 - 0), propertyObject.index);

        if (!(0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_6__.propagateAnimationPropertyEventListener)(propertyObject.propertyName, animation, propertyObject)) {
          propertyObject.newPropertyValue = animateTargetObserved(target, propertyObject.propertyName, lastValue, 100, propertyObject.index);
        }
      } else {
        propertyObject.newPropertyValue = (0,_calc_next_property_value__WEBPACK_IMPORTED_MODULE_4__.default)(propertyObject, [from, to], percentageInRelationToKey, animationAuxiliaryObject.easing, animation.round);
        var f;
        var allowedToApplyStyle = (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_6__.propagateAnimationPropertyEventListener)(propertyObject.propertyName, animation, propertyObject);

        if (allowedToApplyStyle) {
          switch (propertyObject.type) {
            case 'transform':
              f = animateTargetTransform;
              break;

            case 'attr':
              f = animateTargetAttributes;
              break;

            case 'direct':
              f = animateTargetDirectProps;
              break;

            default:
              f = animateTargetCSS;
              break;
          }

          f(propertyObject.target, propertyObject.propertyName, propertyObject.newPropertyValue, valuesOfThePropertiesBeforeAnimating[propertyObject.index]);
        }
      }
    }
  });
  return propertiesToBeAnimate;
}

/***/ }),

/***/ "./src/animation-engine/get-new-animation-progress.ts":
/*!************************************************************!*\
  !*** ./src/animation-engine/get-new-animation-progress.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNewAnimationProgress; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");


function getNewAnimationProgress(animationAuxiliaryObject) {
  var a = animationAuxiliaryObject;
  var keyframesKeys = a.keyframesKeys,
      animation = a.animation;
  var countDriveLoops = a.countDriveLoops;
  var maxProgress = animation.max;
  var progress = animation.progressValue;
  var drive = animation.drive;
  var driveEasy = typeof drive === 'string' ? drive : '';
  var listOfProgress = typeof drive === 'number' ? [drive] : drive;
  var takeControlOfTheDrive = Array.isArray(listOfProgress) ? listOfProgress[countDriveLoops] && typeof listOfProgress[countDriveLoops] === 'string' : false;
  var direction = animation.dir;
  var iterationsCompleted = animation.count;
  var progressStoppedAt = progress || 0;

  if (takeControlOfTheDrive) {
    driveEasy = listOfProgress[countDriveLoops];
  }

  progress = progressStoppedAt;

  if (driveEasy === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[6]) {
    maxProgress = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.getRandomKey)(keyframesKeys, progressStoppedAt);
  } else if (driveEasy === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[7]) {
    do {
      maxProgress = Math.round(Math.random() * _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME);
    } while (Math.abs(progressStoppedAt - maxProgress) < 20);
  } else if (driveEasy === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[4] || driveEasy === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[5]) {
    maxProgress = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.getRandomKey)(keyframesKeys, progressStoppedAt);
    progress = 0;
  } else if (direction === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[1] || direction === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[2] && iterationsCompleted % 2 === 1 || direction === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_DIRECTIONS[3] && iterationsCompleted % 2 === 0) {
    progress = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME;
    maxProgress = 0;
  } else {
    progress = 0;
    maxProgress = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME;
  }

  if (!takeControlOfTheDrive && Array.isArray(listOfProgress)) {
    var hasMaxProgress = listOfProgress[countDriveLoops];

    if (countDriveLoops < listOfProgress.length || hasMaxProgress === Infinity) {
      if (hasMaxProgress === Infinity) {
        countDriveLoops = 0;
      }

      var n = listOfProgress[countDriveLoops];

      if (Array.isArray(n)) {
        maxProgress = typeof n[1] === 'number' ? n[1] : maxProgress;
        progress = n[0];
      } else {
        maxProgress = typeof n === 'number' ? n : maxProgress;
        progress = progressStoppedAt;
      }

      countDriveLoops += 1;

      if (countDriveLoops >= listOfProgress.length) {
        countDriveLoops = 0;
      }
    }
  }

  return {
    countDriveLoops: countDriveLoops,
    progress: progress,
    maxProgress: maxProgress
  };
}

/***/ }),

/***/ "./src/animation-engine/get-new-values-for-animation-intercalation.ts":
/*!****************************************************************************!*\
  !*** ./src/animation-engine/get-new-values-for-animation-intercalation.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNewValuesForAnimationIntercalation; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _utilities_to_ms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/to-ms */ "./src/utilities/to-ms.ts");



function getNewValuesForAnimationIntercalation(requiredAnimationProperties) {
  var animationAuxiliaryObject = requiredAnimationProperties;
  var animation = animationAuxiliaryObject.animation,
      iterationInterlacations = animationAuxiliaryObject.iterationInterlacations;
  var maxProgress = animation.max;
  var progress = animation.progressValue;
  var startTimeOfTheIteration = animationAuxiliaryObject.startTimeOfTheIteration,
      reverseExecution = animationAuxiliaryObject.reverseExecution,
      timeRunningIteration = animationAuxiliaryObject.timeRunningIteration;
  var duration = (0,_utilities_to_ms__WEBPACK_IMPORTED_MODULE_2__.default)(animation.dur);

  if (duration <= 0) {
    return {
      toAuxiliaryObject: {
        iterationInterlacations: iterationInterlacations,
        startTimeOfTheIteration: startTimeOfTheIteration,
        reverseExecution: reverseExecution,
        timeRunningIteration: timeRunningIteration
      },
      progress: maxProgress
    };
  }

  var currentTime = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__.default)();
  /**
   * Checks how the animation's progress should behave.
   */

  reverseExecution = progress > maxProgress;
  var durationOfTheInterlacation;

  if (startTimeOfTheIteration > 0) {
    durationOfTheInterlacation = currentTime - startTimeOfTheIteration - timeRunningIteration;
  } else {
    durationOfTheInterlacation = 0;
  }

  durationOfTheInterlacation += iterationInterlacations.leftovers;
  iterationInterlacations.timeConsumed += durationOfTheInterlacation;
  var averageDurationForIntercalation = iterationInterlacations.completed > 0 ? iterationInterlacations.timeConsumed / iterationInterlacations.completed : 0;
  iterationInterlacations.leftovers = Math.max(0, durationOfTheInterlacation - averageDurationForIntercalation);
  iterationInterlacations.completed += 1;
  var timeBasedProgress = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME / duration * averageDurationForIntercalation;
  var newProgress;

  if (reverseExecution) {
    newProgress = progress - timeBasedProgress;
    newProgress = newProgress < 0 ? 0 : newProgress;
    newProgress = newProgress < maxProgress ? maxProgress : newProgress;
  } else {
    newProgress = progress + timeBasedProgress;
    newProgress = newProgress > _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME ? _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME : newProgress;
    newProgress = newProgress > maxProgress ? maxProgress : newProgress;
  }

  progress = newProgress;
  timeRunningIteration = duration / _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME * progress;
  startTimeOfTheIteration = currentTime - timeRunningIteration;
  return {
    toAuxiliaryObject: {
      iterationInterlacations: iterationInterlacations,
      startTimeOfTheIteration: startTimeOfTheIteration,
      reverseExecution: reverseExecution,
      timeRunningIteration: timeRunningIteration
    },
    progress: progress
  };
}

/***/ }),

/***/ "./src/animation-engine/handle-visibility-change.ts":
/*!**********************************************************!*\
  !*** ./src/animation-engine/handle-visibility-change.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handleVisibilityChange; }
/* harmony export */ });
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");



var ANIMATIONS_PAUSED = [];
function handleVisibilityChange() {
  if (document.hidden) {
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__.default)((0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__.getAllAnimationAuxiliaryObjects)(), function (c) {
      var animation = c.animation;

      if (animation.state !== _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[3] && animation.pauseDocHidden) {
        animation.pause();
        ANIMATIONS_PAUSED.push(animation);
      }
    });
  } else {
    ANIMATIONS_PAUSED.forEach(function (a) {
      a.resume();
    });
    ANIMATIONS_PAUSED.length = 0;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

/***/ }),

/***/ "./src/animation-engine/insert-animation-in-the-queue.ts":
/*!***************************************************************!*\
  !*** ./src/animation-engine/insert-animation-in-the-queue.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ insertAnimationInTheQueue; }
/* harmony export */ });
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _utilities_to_ms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/to-ms */ "./src/utilities/to-ms.ts");
/* harmony import */ var _crud_animations_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crud-animations-style */ "./src/animation-engine/crud-animations-style.ts");
/* harmony import */ var _manage_animations_delay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./manage-animations-delay */ "./src/animation-engine/manage-animations-delay.ts");
/* harmony import */ var _mount_animations_stack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reset-animation-time-properties */ "./src/animation-engine/reset-animation-time-properties.ts");







/**
 * Delegates the animation to be executed.
 */

function insertAnimationInTheQueue(animationAuxiliaryObject) {
  var jumpTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var animationLoadingTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var a = animationAuxiliaryObject;
  var animation = a.animation,
      remainingDelayAnimation = a.remainingDelayAnimation;

  if (!a.animationAlreadyStarted) {
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[8], animation);
  }

  var delay = Math.max((0,_utilities_to_ms__WEBPACK_IMPORTED_MODULE_2__.default)(animation.delay) - animationLoadingTime, 0);

  if (delay > 0 && (remainingDelayAnimation || !jumpTimeout)) {
    (0,_manage_animations_delay__WEBPACK_IMPORTED_MODULE_4__.default)(a, remainingDelayAnimation || delay, (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__.default)(), function () {
      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[10], animation);
      (0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_5__.addAnimationToStack)(a);
    });
  } else {
    (0,_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_6__.default)(a);
    a.remainingDelayAnimation = 0;
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[10], animation);

    if (a.animation.firstRunImmediately && !a.animationAlreadyStarted) {
      a.propertiesToBeAnimate = (0,_crud_animations_style__WEBPACK_IMPORTED_MODULE_3__.applyAnimationsStyleToTargets)(a.propertiesToBeAnimate, a);
      a.animation.firstRunImmediately = false;
    }

    (0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_5__.addAnimationToStack)(a);
  }
}

/***/ }),

/***/ "./src/animation-engine/manage-animations-delay.ts":
/*!*********************************************************!*\
  !*** ./src/animation-engine/manage-animations-delay.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ manageAnimationsDelay; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reset-animation-time-properties */ "./src/animation-engine/reset-animation-time-properties.ts");



var ANIMATIONS_DELAY = [];
var timeoutId;

function processAnimationsDelays() {
  timeoutId = setInterval(function () {
    if (ANIMATIONS_DELAY.length === 0) {
      clearInterval(timeoutId);
      timeoutId = undefined;
      return;
    }

    ANIMATIONS_DELAY = ANIMATIONS_DELAY.filter(function (values) {
      var v = values;
      var c = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_1__.default)() - v.startTime;
      var state = v.animationAuxiliaryObject.animation.state;

      if (state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
        if (c >= v.delay) {
          v.animationAuxiliaryObject.remainingDelayAnimation = v.delay - c;
          (0,_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_2__.default)(v.animationAuxiliaryObject);
          v.animationAuxiliaryObject.remainingDelayAnimation = 0;
          v.callbackDelayCompleted(v.animationAuxiliaryObject);
          return false;
        }
      }

      if (state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[7] || state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[4]) {
        return false;
      }

      return true;
    });
  }, 0);
}

function manageAnimationsDelay(animationAuxiliaryObject, delay, startTime, callbackDelayCompleted) {
  ANIMATIONS_DELAY.push({
    animationAuxiliaryObject: animationAuxiliaryObject,
    delay: delay,
    startTime: startTime,
    callbackDelayCompleted: callbackDelayCompleted
  });

  if (!timeoutId) {
    processAnimationsDelays();
  }
}

/***/ }),

/***/ "./src/animation-engine/mount-animations-stack.ts":
/*!********************************************************!*\
  !*** ./src/animation-engine/mount-animations-stack.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTimeoutForStackMounting": function() { return /* binding */ useTimeoutForStackMounting; },
/* harmony export */   "getCurrentAnimationsStac": function() { return /* binding */ getCurrentAnimationsStac; },
/* harmony export */   "resetAnimationsStack": function() { return /* binding */ resetAnimationsStack; },
/* harmony export */   "addAnimationToStack": function() { return /* binding */ addAnimationToStack; },
/* harmony export */   "removeAnimationFromStack": function() { return /* binding */ removeAnimationFromStack; },
/* harmony export */   "hasAnimationInTheStack": function() { return /* binding */ hasAnimationInTheStack; },
/* harmony export */   "getAnimationInTheStack": function() { return /* binding */ getAnimationInTheStack; }
/* harmony export */ });
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");

/**
 * That's where the animations are queued before they're executed.
 */

var ANIMATIONS_STACK = {};
var timeoutForStackMounting;
function useTimeoutForStackMounting(callback) {
  timeoutForStackMounting = callback;
}
function getCurrentAnimationsStac() {
  return ANIMATIONS_STACK;
}
function resetAnimationsStack() {
  ANIMATIONS_STACK = {};
}
function addAnimationToStack(animationAuxiliaryObject) {
  if (!animationAuxiliaryObject || !animationAuxiliaryObject.animation) {
    return false;
  }

  ANIMATIONS_STACK[animationAuxiliaryObject.animationId] = animationAuxiliaryObject;
  timeoutForStackMounting();
  return true;
}
function removeAnimationFromStack(animationId) {
  if (ANIMATIONS_STACK[animationId]) {
    ANIMATIONS_STACK[animationId] = null;
  }
}
function hasAnimationInTheStack() {
  return !(0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_0__.default)(ANIMATIONS_STACK);
}
function getAnimationInTheStack(animationId) {
  if (typeof animationId !== 'number') {
    return ANIMATIONS_STACK;
  }

  return ANIMATIONS_STACK[animationId];
}

/***/ }),

/***/ "./src/animation-engine/new-animation-intercalation.ts":
/*!*************************************************************!*\
  !*** ./src/animation-engine/new-animation-intercalation.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ newAnimationIntercalation; }
/* harmony export */ });
/* harmony import */ var _get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-new-values-for-animation-intercalation */ "./src/animation-engine/get-new-values-for-animation-intercalation.ts");
/* harmony import */ var _insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insert-animation-in-the-queue */ "./src/animation-engine/insert-animation-in-the-queue.ts");
/* harmony import */ var _mount_animations_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");



function newAnimationIntercalation(animationAuxiliaryObject) {
  var aAuxiliaryObject = animationAuxiliaryObject;

  if (aAuxiliaryObject.remainingDelayAnimation > 0) {
    (0,_insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_1__.default)(aAuxiliaryObject);
    return;
  }

  var newIntercalationObject = (0,_get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_0__.default)(aAuxiliaryObject);
  Object.assign(aAuxiliaryObject, newIntercalationObject.toAuxiliaryObject);
  aAuxiliaryObject.animation.progressValue = newIntercalationObject.progress;
  (0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_2__.addAnimationToStack)(aAuxiliaryObject);
}

/***/ }),

/***/ "./src/animation-engine/organize-the-execution-of-cycle-animations.ts":
/*!****************************************************************************!*\
  !*** ./src/animation-engine/organize-the-execution-of-cycle-animations.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkAmountOfAnimationsCompletedInCycle": function() { return /* binding */ checkAmountOfAnimationsCompletedInCycle; },
/* harmony export */   "default": function() { return /* binding */ organizeTheExecutionOfCycleAnimations; }
/* harmony export */ });
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _sauce_iteration_control_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sauce/iteration-control-methods */ "./src/sauce/iteration-control-methods.ts");




/* 
  eslint-disable @typescript-eslint/no-loop-func
*/

function revertAnimationProgress(animation) {
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_1__.getAnimationAuxiliaryObject)(animation.animationId);

  if (animationAuxiliaryObject) {
    var lastStartProgress = animationAuxiliaryObject.lastStartProgress || 0;
    (0,_sauce_iteration_control_methods__WEBPACK_IMPORTED_MODULE_3__.default)(animationAuxiliaryObject.duration, undefined, 1 / _sauce_constants__WEBPACK_IMPORTED_MODULE_2__.MAX_KEYFRAME * lastStartProgress, animation, true // apply delay
    );
  }
}

function runAnimation(animation, direction) {
  if (animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_STATES[0]) {
    animation.play();
  } else if (direction === 'normal') {
    animation.restart();
  } else if (animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_STATES[2]) {
    revertAnimationProgress(animation);
  }
}

function repeatCycleExecution(cycleOptions) {
  var cycle = cycleOptions;
  var direction = cycleOptions.dir;

  if (!cycle.sequenceRunning || cycle.sequenceRunning && !cycle.sequenceRunning[0]) {
    cycle.loopDirection = cycle.loopDirection === 'normal' ? 'reverse' : 'normal';
    cycle.countCompletedAnimations = 0;
    cycle.countLoops += 1;
  }

  if (cycle.loop !== true && cycle.countLoops >= cycle.loop) {
    return;
  }

  var sequenceRunning = cycle.sequenceRunning;

  if (cycle.sequence && (!sequenceRunning || !sequenceRunning[0])) {
    sequenceRunning = cycle.dir === 'normal' || cycle.loopDirection === 'normal' ? cycle.sequence.slice() : cycle.sequence.slice().reverse();
    cycle.numberOfAnimationsToComplete = 0;
  }

  if (sequenceRunning && sequenceRunning[0]) {
    var length = sequenceRunning.length;
    var a = sequenceRunning.slice();
    var find = false;
    var index = 0;

    for (; index < length; index += 1) {
      var bucket = a[index];
      bucket.forEach(function (i) {
        if (!i.autoDestroy) {
          find = true;
          cycle.numberOfAnimationsToComplete += 1;
          runAnimation(i, direction);
        }
      });
      sequenceRunning.splice(0, index + 1);

      if (find) {
        break;
      }
    }

    cycle.sequenceRunning = sequenceRunning;
  }
}

function checkAmountOfAnimationsCompletedInCycle(cycleOptions) {
  var cycle = cycleOptions;
  cycle.countCompletedAnimations += 1;

  if (cycle.animationInstancesInCycle && cycle.countCompletedAnimations >= cycle.numberOfAnimationsToComplete) {
    repeatCycleExecution(cycle);
  }
}
function organizeTheExecutionOfCycleAnimations(animationPerformer, animation, instanceToLink, typeOfLink) {
  var cycleOptions = animationPerformer.$hidden.cycleOptions;

  if (cycleOptions && animation.isInCycle) {
    if (!cycleOptions.animationInstancesInCycle) {
      cycleOptions.animationInstancesInCycle = [];
    }

    cycleOptions.numberOfAnimationsToComplete += 1;
    cycleOptions.animationInstancesInCycle.unshift(animation);
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.addAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[11], function () {
      return checkAmountOfAnimationsCompletedInCycle(cycleOptions);
    }, animation);

    if (!cycleOptions.sequence) {
      cycleOptions.sequence = [];
    }

    var length = cycleOptions.sequence.length;

    if (instanceToLink && typeOfLink) {
      for (var index = 0; index < length; index += 1) {
        var bucket = cycleOptions.sequence[index];

        if (typeOfLink === 'together') {
          if (bucket.indexOf(instanceToLink) > -1) {
            bucket.push(animation);
            break;
          }
        } else if (typeOfLink === 'afterAnimation' && bucket.indexOf(instanceToLink) > -1) {
          cycleOptions.sequence.splice(index, 0, [animation]);
          break;
        }
      }
    } else {
      cycleOptions.sequence.push([animation]);
    }
  }
}

/***/ }),

/***/ "./src/animation-engine/perform-intercalation-of-the-animations.ts":
/*!*************************************************************************!*\
  !*** ./src/animation-engine/perform-intercalation-of-the-animations.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ performIntercalationOfTheAnimations; }
/* harmony export */ });
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _all_animation_targets_have_been_removed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./all-animation-targets-have-been-removed */ "./src/animation-engine/all-animation-targets-have-been-removed.ts");
/* harmony import */ var _animation_intercalation_completed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animation-intercalation-completed */ "./src/animation-engine/animation-intercalation-completed.ts");
/* harmony import */ var _crud_animations_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./crud-animations-style */ "./src/animation-engine/crud-animations-style.ts");







/**
 * Calls the functions that traverse the stack and applies the style to the elements, restarts the values of the mount stack, removes the items from the stack, and forwards the animation objects to be audited.
 */

function performIntercalationOfTheAnimations(animationsStack) {
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__.default)(animationsStack, function (animationAuxiliaryObject) {
    var aAuxiliaryObject = animationAuxiliaryObject;
    var animation = aAuxiliaryObject.animation,
        propertiesToBeAnimate = aAuxiliaryObject.propertiesToBeAnimate;
    var animationAlreadyStarted = aAuxiliaryObject.animationAlreadyStarted;

    if (!propertiesToBeAnimate[0]) {
      (0,_all_animation_targets_have_been_removed__WEBPACK_IMPORTED_MODULE_4__.default)(animation);
    }

    if (animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[1] && propertiesToBeAnimate[0]) {
      aAuxiliaryObject.propertiesToBeAnimate = (0,_crud_animations_style__WEBPACK_IMPORTED_MODULE_6__.applyAnimationsStyleToTargets)(propertiesToBeAnimate, aAuxiliaryObject);

      if (!animationAlreadyStarted) {
        (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[0], animation);
        animationAlreadyStarted = true;
        aAuxiliaryObject.animationAlreadyStarted = true;
      }

      if (typeof animation.progress === 'function') {
        animation.progress(animation.progressValue);
      }

      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_0__.LISTENERS_NAMES[9], animation);
    }
  });
  var dateLastIntercalation = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__.default)(animationsStack, function (a) {
    var animationAuxiliaryObject = a;
    animationAuxiliaryObject.dateLastIntercalation = dateLastIntercalation;
    (0,_animation_intercalation_completed__WEBPACK_IMPORTED_MODULE_5__.default)(animationAuxiliaryObject);
  });
}

/***/ }),

/***/ "./src/animation-engine/remove-animation-style.ts":
/*!********************************************************!*\
  !*** ./src/animation-engine/remove-animation-style.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ removeAnimationStyle; }
/* harmony export */ });
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");
/* harmony import */ var _utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities-style/get-vendor-css-property */ "./src/utilities-style/get-vendor-css-property.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/dom-attributes */ "./src/utilities/dom-attributes.ts");
/* harmony import */ var _utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/is-dom-element */ "./src/utilities/is-dom-element.ts");
/* harmony import */ var _crud_animations_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./crud-animations-style */ "./src/animation-engine/crud-animations-style.ts");
/* harmony import */ var _restart_animation_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./restart-animation-properties */ "./src/animation-engine/restart-animation-properties.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










function resetHTMLElement(target, beforeAnimating) {
  var t = target;
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__.default)(beforeAnimating.attr, function (value, name) {
    if (value) {
      (0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_4__.setAttr)(t, name, value);
    } else {
      (0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_4__.removeAttr)(t, name);
    }
  });
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__.default)(beforeAnimating.style, function (value, name) {
    if (value) {
      t.style[name] = value;
    } else {
      t.style[name] = '';
    }
  });
  var transformFunctionsObject = (0,_crud_animations_style__WEBPACK_IMPORTED_MODULE_6__.transformFunctionsToObject)(t);

  if (!(0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_1__.default)(beforeAnimating.transfromFns)) {
    var p = (0,_utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_2__.default)('transform');
    t.style[p] = (0,_crud_animations_style__WEBPACK_IMPORTED_MODULE_6__.transformFunctionsObjectToString)(_objectSpread(_objectSpread({}, transformFunctionsObject), beforeAnimating.transfromFns));
  }
}

function resetAnimationStyle(a) {
  var animation = a;
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_0__.getAnimationAuxiliaryObject)(animation.animationId);

  if (animationAuxiliaryObject) {
    (0,_restart_animation_properties__WEBPACK_IMPORTED_MODULE_7__.default)(animationAuxiliaryObject);
    (0,_crud_animations_style__WEBPACK_IMPORTED_MODULE_6__.applyAnimationsStyleToTargets)(animationAuxiliaryObject.propertiesToBeAnimate, animationAuxiliaryObject);
  }
}
/**
 * Removes the style added by the animation.
 */


function removeAnimationStyle(requiredAnimationProperties) {
  var animation = requiredAnimationProperties.animation,
      valuesOfThePropertiesBeforeAnimating = requiredAnimationProperties.valuesOfThePropertiesBeforeAnimating;

  if (!animation.removeChanges) {
    return;
  }

  resetAnimationStyle(animation);
  var targets = animation.targets;

  var _loop = function _loop(index) {
    var targetObject = targets[index];
    var target = targetObject.target;
    var beforeAnimating = valuesOfThePropertiesBeforeAnimating[index];

    if ((0,_utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_5__.default)(target)) {
      resetHTMLElement(target, beforeAnimating);
    }

    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__.default)(beforeAnimating.direct, function (value, name) {
      target[name] = value;
    });
  };

  for (var index = targets.length - 1; index > -1; index -= 1) {
    _loop(index);
  }
}

/***/ }),

/***/ "./src/animation-engine/reset-animation-progress.ts":
/*!**********************************************************!*\
  !*** ./src/animation-engine/reset-animation-progress.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ resetAnimationProgress; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _get_new_animation_progress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-new-animation-progress */ "./src/animation-engine/get-new-animation-progress.ts");


function resetAnimationProgress(animationAuxiliaryObject) {
  var animation = animationAuxiliaryObject.animation;
  Object.assign(animationAuxiliaryObject, {
    countDriveLoops: 0,
    animationAlreadyStarted: false
  });
  Object.assign(animation, {
    state: _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1],
    count: 0
  });
  var animationProgressObject = (0,_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_1__.default)(animationAuxiliaryObject);
  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: animation.progressValue,
    countDriveLoops: animationProgressObject.countDriveLoops
  });
  Object.assign(animation, {
    progressValue: animationProgressObject.progress,
    max: animationProgressObject.maxProgress
  });
  return animationAuxiliaryObject;
}

/***/ }),

/***/ "./src/animation-engine/reset-animation-time-properties.ts":
/*!*****************************************************************!*\
  !*** ./src/animation-engine/reset-animation-time-properties.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ resetAnimationTimeProperties; }
/* harmony export */ });
function resetAnimationTimeProperties(animationAuxiliaryObject) {
  var a = animationAuxiliaryObject;
  a.iterationInterlacations = {
    timeConsumed: 0,
    completed: 0,
    leftovers: 0
  };
  a.startTimeOfTheIteration = 0;
  a.timeRunningIteration = 0;
  return a;
}

/***/ }),

/***/ "./src/animation-engine/restart-animation-properties.ts":
/*!**************************************************************!*\
  !*** ./src/animation-engine/restart-animation-properties.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ restartAnimationProperties; }
/* harmony export */ });
/* harmony import */ var _reset_animation_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset-animation-progress */ "./src/animation-engine/reset-animation-progress.ts");
/* harmony import */ var _reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset-animation-time-properties */ "./src/animation-engine/reset-animation-time-properties.ts");


function restartAnimationProperties(animationAuxiliaryObject) {
  animationAuxiliaryObject.propertiesToBeAnimate.forEach(function (propertyObject) {
    var o = propertyObject;
    /**
     * Important to reset the property(lastKey).
     */

    o.lastKey = undefined;
  });
  (0,_reset_animation_time_properties__WEBPACK_IMPORTED_MODULE_1__.default)(animationAuxiliaryObject);
  (0,_reset_animation_progress__WEBPACK_IMPORTED_MODULE_0__.default)(animationAuxiliaryObject);
  return animationAuxiliaryObject;
}

/***/ }),

/***/ "./src/animation-engine/start-animation-execution-cycle.ts":
/*!*****************************************************************!*\
  !*** ./src/animation-engine/start-animation-execution-cycle.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ startAnimationExecutionCycle; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _mount_animations_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-new-values-for-animation-intercalation */ "./src/animation-engine/get-new-values-for-animation-intercalation.ts");
/* harmony import */ var _insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insert-animation-in-the-queue */ "./src/animation-engine/insert-animation-in-the-queue.ts");
/* harmony import */ var _timeout_for_stack_mounting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeout-for-stack-mounting */ "./src/animation-engine/timeout-for-stack-mounting.ts");





/* 
  eslint-disable @typescript-eslint/no-use-before-define 
*/

/**
 * Defines the function that will process the stack.
 */

(0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_1__.useTimeoutForStackMounting)(_timeout_for_stack_mounting__WEBPACK_IMPORTED_MODULE_4__.default);
function startAnimationExecutionCycle(animationAuxiliaryObject) {
  var jumpTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var a = animationAuxiliaryObject;

  if ((0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_1__.getAnimationInTheStack)(a.animationId)) {
    return;
  }
  /**
   * Gets the time that the animation took to complete the load.
   */


  var animationLoadingTime = a.animationLoadingTime;
  var newIntercalationObject = (0,_get_new_values_for_animation_intercalation__WEBPACK_IMPORTED_MODULE_2__.default)(a);
  Object.assign(a, newIntercalationObject.toAuxiliaryObject);
  a.animationLoadingTime = 0;
  a.animation.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1];
  a.animation.progressValue = newIntercalationObject.progress;
  (0,_insert_animation_in_the_queue__WEBPACK_IMPORTED_MODULE_3__.default)(a, jumpTimeout, animationLoadingTime);
}

/***/ }),

/***/ "./src/animation-engine/timeout-for-stack-mounting.ts":
/*!************************************************************!*\
  !*** ./src/animation-engine/timeout-for-stack-mounting.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ timeoutForStackMounting; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/manage-memory-collections */ "./src/sauce/manage-memory-collections.ts");
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _mount_animations_stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _perform_intercalation_of_the_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./perform-intercalation-of-the-animations */ "./src/animation-engine/perform-intercalation-of-the-animations.ts");






/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Indicates whether the stack mount is already started.
 */

var STARTED_STACK_MOUNT = false;
/**
 * Adds the execution queue  a "callbackfn" (through requestAnimationFrame or setTimeout). When invoked the same calls the function that unmount the stack and completes the cycle.
 */

function timeoutForStackMounting() {
  if (STARTED_STACK_MOUNT) {
    return;
  }

  var ANIMATIONS_STACK = (0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_4__.getCurrentAnimationsStac)();
  /**
   * Waits for animations so that each style is added together.
   */

  STARTED_STACK_MOUNT = true;
  timeoutForStackMounting();
  animationTimeout(function () {
    if ((0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_2__.default)(ANIMATIONS_STACK)) {
      STARTED_STACK_MOUNT = false;
      return;
    }

    var animationsStack = {};
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_3__.default)(ANIMATIONS_STACK, function (propertyValue, propertyName) {
      if (propertyValue) {
        animationsStack[propertyName] = propertyValue;
      }
    });
    (0,_sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_1__.sendToGarbageCollector)(animationsStack, ANIMATIONS_STACK);
    /*
     * Restarts the values of the mount stack.
     */

    STARTED_STACK_MOUNT = false;
    (0,_mount_animations_stack__WEBPACK_IMPORTED_MODULE_4__.resetAnimationsStack)();
    (0,_perform_intercalation_of_the_animations__WEBPACK_IMPORTED_MODULE_5__.default)(animationsStack);
  });
}
setInterval(function () {
  timeoutForStackMounting();
}, _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.BEST_FPS_TIMEOUT);
timeoutForStackMounting();
var hasRAf = typeof window.requestAnimationFrame === 'function';

function clearAnimationTimeout(id) {
  if (hasRAf) {
    return window.cancelAnimationFrame(id);
  }

  return window.clearTimeout(id);
}

function animationTimeout(callback, timeout) {
  if (hasRAf) {
    var requestAnimationFrameId = window.requestAnimationFrame(function () {
      callback();
      clearAnimationTimeout(requestAnimationFrameId);
    });
    return requestAnimationFrameId;
  }

  return setTimeout(function () {
    callback();
  }, timeout || 0);
}

/***/ }),

/***/ "./src/animation-engine/update-animation.ts":
/*!**************************************************!*\
  !*** ./src/animation-engine/update-animation.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateAnimation; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _animation_mount_create_animation_auxiliary_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/create-animation-auxiliary-object */ "./src/animation-mount/create-animation-auxiliary-object.ts");
/* harmony import */ var _get_new_animation_progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-new-animation-progress */ "./src/animation-engine/get-new-animation-progress.ts");




/**
 * Updates the animation with the new values of the properties.
 */

function updateAnimation(animationAuxiliaryObject) {
  var animation = animationAuxiliaryObject.animation;
  var progress = animation.progressValue;
  progress = Math.max(progress, 0);
  progress = Math.min(progress, _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME);
  var timeRunningIteration = Math.max((0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.toMs)(animation.dur), 1) / 100 * progress;
  Object.assign(animationAuxiliaryObject, {
    startTimeOfTheIteration: (0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.getTimeNow)() - timeRunningIteration,
    timeRunningIteration: timeRunningIteration,
    iterationInterlacations: {
      timeConsumed: timeRunningIteration,
      completed: Math.floor(timeRunningIteration / _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.INTERCALATION_TIME),
      leftovers: 0
    }
  });
  var animationProgressObject = (0,_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_3__.default)(animationAuxiliaryObject);
  Object.assign(animationAuxiliaryObject, {
    lastStartProgress: progress,
    countDriveLoops: animationAuxiliaryObject.countDriveLoops - 1
  });
  Object.assign(animation, {
    progress: progress,
    max: animationProgressObject.maxProgress
  });
  Object.assign(animationAuxiliaryObject, (0,_animation_mount_create_animation_auxiliary_object__WEBPACK_IMPORTED_MODULE_2__.propertiesForAnimationAuxiliaryObject)(animation));
  return animationAuxiliaryObject;
}

/***/ }),

/***/ "./src/animation-listeners/amount-of-animations-interested-in-event.ts":
/*!*****************************************************************************!*\
  !*** ./src/animation-listeners/amount-of-animations-interested-in-event.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ amountOfAnimationsInterestedInEvent; }
/* harmony export */ });
function amountOfAnimationsInterestedInEvent(animationInstances) {
  var countAnimationsInterested = 0;
  animationInstances.forEach(function (a) {
    switch (a.state) {
      case 'canceled':
      case 'destroyed':
        break;

      default:
        countAnimationsInterested += 1;
        break;
    }
  });
  return countAnimationsInterested;
}

/***/ }),

/***/ "./src/animation-listeners/animations-listeners-handlers.ts":
/*!******************************************************************!*\
  !*** ./src/animation-listeners/animations-listeners-handlers.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LISTENERS_NAMES": function() { return /* binding */ LISTENERS_NAMES; },
/* harmony export */   "addAnimationEventListener": function() { return /* binding */ addAnimationEventListener; },
/* harmony export */   "removeAnimationEventListener": function() { return /* binding */ removeAnimationEventListener; },
/* harmony export */   "removeAllAnimationEventListeners": function() { return /* binding */ removeAllAnimationEventListeners; },
/* harmony export */   "propagateAnimationPropertyEventListener": function() { return /* binding */ propagateAnimationPropertyEventListener; },
/* harmony export */   "propagateAnimationEventListener": function() { return /* binding */ propagateAnimationEventListener; }
/* harmony export */ });
/* harmony import */ var _utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");


var EVENTS_IN_OBSERVATION = {};
var LISTENERS_NAMES = ['start', 'loopEnd', 'end', 'load', 'cancel', 'destroy', 'play', '$-iteration-control-methods', 'ready', 'change', 'loopStart', '$-end-animation-in-cycle'];
function addAnimationEventListener(name, callback, animation) {
  var animationId = animation.animationId;

  if (!EVENTS_IN_OBSERVATION[animationId]) {
    EVENTS_IN_OBSERVATION[animationId] = {};
  }

  var animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];
  var eName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(name);

  if (eName) {
    if (animationObjectBuket[eName]) {
      animationObjectBuket[eName].push(callback);
    } else {
      animationObjectBuket[eName] = [callback];
    }
  }
}
function removeAnimationEventListener(name, callbackfnUsed, animation) {
  var animationId = animation.animationId;

  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return;
  }

  var animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];
  var eName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(name);

  if (eName && animationObjectBuket[eName]) {
    var index = animationObjectBuket[eName].indexOf(callbackfnUsed);

    if (index >= 0) {
      animationObjectBuket[eName].splice(index, 1);
    }
  }
}
function removeAllAnimationEventListeners(animationId) {
  delete EVENTS_IN_OBSERVATION[animationId];
}

function getBucket(name, animationId) {
  var eventName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.trimString)(name);
  var eventBucket;

  if (!EVENTS_IN_OBSERVATION[animationId]) {
    return false;
  }

  var animationObjectBuket = EVENTS_IN_OBSERVATION[animationId];

  if (animationObjectBuket[eventName]) {
    eventBucket = animationObjectBuket[eventName];
  } else if (animationObjectBuket[(0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.toCamelCase)(eventName)]) {
    eventName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_1__.toCamelCase)(eventName);
    eventBucket = animationObjectBuket[eventName];
  } else {
    eventName = (0,_utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__.default)(eventName);
    eventBucket = animationObjectBuket[eventName];
  }

  return {
    eventBucket: eventBucket,
    eventName: eventName
  };
}

function propagateAnimationPropertyEventListener(name, animation, propertyObject) {
  var bucket = getBucket(name, animation.animationId);
  var allowedToApplyStyle;

  if (bucket && bucket.eventBucket) {
    var eventBucket = bucket.eventBucket; // Copy the array to avoid side effects of the methods.

    eventBucket.slice().forEach(function (eventCallback) {
      allowedToApplyStyle = eventCallback.call(animation.performer, {
        propertyName: propertyObject.propertyName,
        value: propertyObject.newPropertyValue,
        target: propertyObject.target
      }, animation.performer);
    });
  }

  if (allowedToApplyStyle !== false) {
    allowedToApplyStyle = true;
  }

  return allowedToApplyStyle;
}
function propagateAnimationEventListener(name, animation, useSpecialCallback) {
  var bucket = getBucket(name, animation.animationId);

  if (bucket && bucket.eventBucket) {
    var eventBucket = bucket.eventBucket,
        eventName = bucket.eventName; // Copy the array to avoid side effects of the methods.

    eventBucket.slice().forEach(function (eventCallback) {
      if (useSpecialCallback) {
        useSpecialCallback(eventCallback, animation);
      } else {
        eventCallback.call(animation.performer, eventName, animation.performer);
      }
    });
  }
}

/***/ }),

/***/ "./src/animation-mount/create-animation-auxiliary-object.ts":
/*!******************************************************************!*\
  !*** ./src/animation-mount/create-animation-auxiliary-object.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "propertiesForAnimationAuxiliaryObject": function() { return /* binding */ propertiesForAnimationAuxiliaryObject; },
/* harmony export */   "default": function() { return /* binding */ CreateAnimationAuxiliaryObject; }
/* harmony export */ });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _based_implementations_easings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../based-implementations/easings */ "./src/based-implementations/easings.ts");
/* harmony import */ var _sauce_custom_easings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sauce/custom-easings */ "./src/sauce/custom-easings.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Sets the value of some properties For `AnimationAuxiliaryObject` from a `AnimationInstance`.
 */
function propertiesForAnimationAuxiliaryObject(animation) {
  var easing;

  if (typeof animation.easing === 'string' && (0,_sauce_custom_easings__WEBPACK_IMPORTED_MODULE_2__.getCustomEasing)(animation.easing)) {
    easing = (0,_sauce_custom_easings__WEBPACK_IMPORTED_MODULE_2__.getCustomEasing)(animation.easing);
  } else {
    easing = (0,_based_implementations_easings__WEBPACK_IMPORTED_MODULE_1__.parserEasings)(animation.easing, (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.toMs)(animation.dur));
  }

  return {
    easing: easing,
    duration: animation.dur,
    reverseExecution: function (direction) {
      switch (direction) {
        case 'reverse':
        case 'alternate-reverse':
          return true;

        default:
          return false;
      }
    }(animation.dir)
  };
}
function CreateAnimationAuxiliaryObject(animation) {
  return _objectSpread({
    propertiesToBeAnimate: [],
    keyframesKeys: [],
    remainingDelayAnimation: (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.toMs)(animation.delay),
    initialProgress: animation.progressValue,
    lastStartProgress: 0,
    animationId: animation.animationId,
    countDriveLoops: 0,
    dataLoadingState: 'loading',
    backRunning: false,
    startTimeOfTheIteration: 0,
    timeRunningIteration: 0,
    valuesOfThePropertiesBeforeAnimating: [],
    animationAlreadyStarted: false,
    iterationInterlacations: {
      timeConsumed: 0,
      completed: 0,
      leftovers: 0
    },
    animationLoadingTime: 0,
    dateLastIntercalation: 0,
    animation: animation
  }, propertiesForAnimationAuxiliaryObject(animation));
}

/***/ }),

/***/ "./src/animation-mount/crud-animation-objects.ts":
/*!*******************************************************!*\
  !*** ./src/animation-mount/crud-animation-objects.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllAnimationAuxiliaryObjects": function() { return /* binding */ getAllAnimationAuxiliaryObjects; },
/* harmony export */   "addAnimationAuxiliaryObject": function() { return /* binding */ addAnimationAuxiliaryObject; },
/* harmony export */   "getAnimationAuxiliaryObject": function() { return /* binding */ getAnimationAuxiliaryObject; },
/* harmony export */   "removeAnimationAuxiliaryObject": function() { return /* binding */ removeAnimationAuxiliaryObject; }
/* harmony export */ });
/* harmony import */ var _sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/manage-memory-collections */ "./src/sauce/manage-memory-collections.ts");

/**
 * A container for animations that saves the dedicated objects to each in pairs (the user animation instance and the built-in animation instance).
 */

var ANIMATION_AUXILIARY_OBJECTS = {};
function getAllAnimationAuxiliaryObjects() {
  return ANIMATION_AUXILIARY_OBJECTS;
}
function addAnimationAuxiliaryObject(animationAuxiliaryObject) {
  ANIMATION_AUXILIARY_OBJECTS[animationAuxiliaryObject.animationId] = animationAuxiliaryObject;
}
function getAnimationAuxiliaryObject(animationId) {
  return ANIMATION_AUXILIARY_OBJECTS[animationId] || false;
}
function removeAnimationAuxiliaryObject(animationId) {
  var animationAuxiliaryObject = ANIMATION_AUXILIARY_OBJECTS[animationId];

  if (animationAuxiliaryObject) {
    delete ANIMATION_AUXILIARY_OBJECTS[animationId];
    (0,_sauce_manage_memory_collections__WEBPACK_IMPORTED_MODULE_0__.sendToGarbageCollector)(animationAuxiliaryObject);
    return animationAuxiliaryObject;
  }

  return false;
}

/***/ }),

/***/ "./src/animation-mount/css-properties-to-animate.ts":
/*!**********************************************************!*\
  !*** ./src/animation-mount/css-properties-to-animate.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCancheColorValue": function() { return /* binding */ addToCancheColorValue; },
/* harmony export */   "getColorValueFromCanche": function() { return /* binding */ getColorValueFromCanche; },
/* harmony export */   "consultComputedStyle": function() { return /* binding */ consultComputedStyle; }
/* harmony export */ });
/* harmony import */ var _based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../based-implementations/colors */ "./src/based-implementations/colors.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");





var CANCHE_COLORS_VALUES = {};
var DIV_ELEMENT_STYLE = document.createElement('div').style;
function addToCancheColorValue(wrongValue, correctValue) {
  CANCHE_COLORS_VALUES[wrongValue] = correctValue;
}
function getColorValueFromCanche(value) {
  if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__.default)(CANCHE_COLORS_VALUES, value)) {
    return CANCHE_COLORS_VALUES[value];
  }

  return value;
}
function consultComputedStyle(kf) {
  return (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(kf, function (propertyValue, propertyName) {
    if (propertyValue) {
      DIV_ELEMENT_STYLE.cssText = '';
      var n = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.toCamelCase)(propertyName);
      var unit = (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_2__.default)(propertyValue);
      DIV_ELEMENT_STYLE[n] = propertyValue;
      var v1 = DIV_ELEMENT_STYLE[n] ? Number((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.trimString)(DIV_ELEMENT_STYLE[n])) : DIV_ELEMENT_STYLE[n];
      var v2 = Number((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.trimString)(propertyValue));

      if (DIV_ELEMENT_STYLE[n] && (unit === 'px' || (0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.isColor)(propertyValue) || DIV_ELEMENT_STYLE[n] === propertyValue && !Number.isNaN(v1) && v1 === v2)) {
        DIV_ELEMENT_STYLE[n] = '';
        return false;
      }

      DIV_ELEMENT_STYLE[n] = '';
    }

    return true;
  });
}

/***/ }),

/***/ "./src/animation-mount/elements-canche.ts":
/*!************************************************!*\
  !*** ./src/animation-mount/elements-canche.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useElementCanche": function() { return /* binding */ useElementCanche; }
/* harmony export */ });
/* harmony import */ var _utilities_style_get_easy_computed_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/get-easy-computed-style */ "./src/utilities-style/get-easy-computed-style.ts");
/* harmony import */ var _utilities_style_get_applied_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities-style/get-applied-style */ "./src/utilities-style/get-applied-style.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");



/* eslint-disable  import/prefer-default-export */

var ELEMENTS_CANCHE = {};

function bucketId(target) {
  return (target.tagName || target.nodeName).toLowerCase();
}

function getElementCanche(target) {
  var bucket = ELEMENTS_CANCHE[bucketId(target)];

  if (!bucket) {
    return false;
  }

  for (var counting = 0, length = bucket.length; counting < length; counting += 1) {
    if (bucket[counting].target === target) {
      return {
        data: bucket[counting].data,
        index: counting,
        bucket: bucket
      };
    }
  }

  return false;
}

function createElementCanche(target) {
  var hasBucket = bucketId(target);
  var bucket = ELEMENTS_CANCHE[hasBucket];
  var computedStyle = (0,_utilities_style_get_easy_computed_style__WEBPACK_IMPORTED_MODULE_0__.default)(target);
  var elementCancheObject = {
    target: target,
    data: {
      computedStyle: computedStyle,
      startComputedStyle: (0,_utilities_style_get_applied_style__WEBPACK_IMPORTED_MODULE_1__.default)(target, computedStyle),
      bestComputedStyle: function bestComputedStyle() {
        return (0,_utilities_style_get_applied_style__WEBPACK_IMPORTED_MODULE_1__.default)(target, computedStyle);
      }
    }
  };

  if (bucket) {
    bucket.push(elementCancheObject);
  } else {
    ELEMENTS_CANCHE[hasBucket] = [elementCancheObject];
  }

  return elementCancheObject.data;
}

function useElementCanche(target) {
  var elementCancheContainer = getElementCanche(target);
  var elementData = elementCancheContainer ? elementCancheContainer.data : createElementCanche(target);
  return elementData;
}
/**
 * Auto removes elements removed from the DOM.
 */

setInterval(function () {
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_2__.default)(ELEMENTS_CANCHE, function (bucket) {
    bucket.slice().forEach(function (o, index) {
      var target = o.target;

      if (!target.parentElement && !target.parentNode) {
        bucket.splice(index, 1);
      }
    });
  });
}, 500);

/***/ }),

/***/ "./src/animation-mount/flatten-keyframes.ts":
/*!**************************************************!*\
  !*** ./src/animation-mount/flatten-keyframes.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ flattenKeyframes; }
/* harmony export */ });
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _normalize_animation_object_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize-animation-object-properties */ "./src/animation-mount/normalize-animation-object-properties.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





function flattenOffsetProperty(offset, keyframe) {
  var newKeyframes = [];
  offset.forEach(function (value) {
    var newKeyframe = function () {
      var k = {};
      (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(keyframe, function (propertyValue, propertyName) {
        if (propertyName !== 'offset') {
          k[propertyName] = propertyValue;
        }
      });
      return k;
    }();

    newKeyframe.offset = value;
    newKeyframes.push(newKeyframe);
  });
  return newKeyframes;
}

function arrayKeyframesToObject(keyframes) {
  var keyframesObject = {};
  var keyframesArray = keyframes.slice();
  var leftovers = 100;
  var lastKey = 0;
  var keyframesArrayLength = keyframes.length;
  var leftoversIndexs = keyframesArrayLength;
  var newKeyframesArray = [];
  keyframesArray.slice().forEach(function (keyframe, index) {
    if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_1__.default)(keyframe, 'offset') && Array.isArray(keyframe.offset)) {
      keyframesArray.splice(index, 1);
      newKeyframesArray.push.apply(newKeyframesArray, _toConsumableArray(flattenOffsetProperty(keyframe.offset, keyframe)));
    } else {
      newKeyframesArray.push(keyframe);
    }
  });
  newKeyframesArray.forEach(function (keyframe, index) {
    var kf = keyframe;

    if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_1__.default)(keyframe, 'offset')) {
      lastKey = Math.max(Math.min(100 / 1 * kf.offset, 100), 0);
      delete kf.offset;
    } else {
      lastKey = index > 0 ? leftovers / leftoversIndexs + lastKey : 0;
    }

    if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_1__.default)(keyframesObject, lastKey)) {
      keyframesObject[lastKey] = _objectSpread(_objectSpread({}, keyframesObject[lastKey]), kf);
    } else {
      keyframesObject[lastKey] = kf;
    }

    leftovers = 100 - lastKey;
    leftoversIndexs -= 1;
    return true;
  });
  return keyframesObject;
}

function flattenKeyframes(keyframes, orderOfThePropertiesUsed) {
  var kframes = keyframes;
  var newKeyframes = {};
  var propertiesToAnimate = {};
  var propertiesUsed = orderOfThePropertiesUsed ? orderOfThePropertiesUsed.slice() : [];
  var propertiesUsedForThis = [];

  if (Array.isArray(kframes)) {
    newKeyframes = arrayKeyframesToObject(kframes);
  } else {
    kframes = _objectSpread({}, keyframes);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(kframes, function (propertyValue, propertyName) {
      if (Array.isArray(propertyValue)) {
        propertiesToAnimate[propertyName] = arrayKeyframesToObject(propertyValue);
        delete kframes[propertyName];
      }
    });

    newKeyframes[0] = function () {
      var keyframe = {};
      (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(kframes, function (_propertyValue, propertyName) {
        // Value to be set yet.
        keyframe[propertyName] = '?';
      });
      return keyframe;
    }();

    newKeyframes[100] = kframes;
  }

  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(newKeyframes, function (keyframe, key) {
    newKeyframes[key] = (0,_normalize_animation_object_properties__WEBPACK_IMPORTED_MODULE_2__.default)(keyframe);
  });
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(propertiesToAnimate, function (propertyValue, propertyName) {
    var n = propertyName;

    if (!Number.isNaN(parseFloat(n))) {
      n = propertiesUsed[Number(n)];
      propertiesToAnimate[n] = propertyValue;
      delete propertiesToAnimate[propertyName];
    }

    if (propertiesUsed.indexOf(n) === -1) {
      propertiesUsed.push(n);
    }
  });
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(newKeyframes, function (keyframe) {
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(keyframe, function (propertyValue, propertyName) {
      var f = keyframe;
      var n = propertyName;

      if (!Number.isNaN(parseFloat(n))) {
        n = propertiesUsed[Number(n)];
        /**
         * Replaces indexes by the property name.
         */

        f[n] = propertyValue;
        delete f[propertyName];
      }

      if (propertiesUsed.indexOf(n) === -1) {
        propertiesUsed.push(n);
      }

      if (propertiesUsedForThis.indexOf(n) === -1) {
        propertiesUsedForThis.push(n);
      }
    });
  });
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(newKeyframes, function (keyframe, key) {
    propertiesUsedForThis.forEach(function (propertyName) {
      var v = keyframe[propertyName];

      if (!propertiesToAnimate[propertyName]) {
        propertiesToAnimate[propertyName] = {};
      }

      if (key !== '0' && key !== '100') {
        if (keyframe[propertyName]) {
          propertiesToAnimate[propertyName][key] = v;
        }
      } else {
        propertiesToAnimate[propertyName][key] = typeof v === 'undefined' ? '?' : v;
      }
    });
  });
  return {
    keyframes: propertiesToAnimate,
    orderOfThePropertiesUsed: propertiesUsed
  };
}

/***/ }),

/***/ "./src/animation-mount/get-attr-properties-to-be-animated.ts":
/*!*******************************************************************!*\
  !*** ./src/animation-mount/get-attr-properties-to-be-animated.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAttrPropertiesToBeAnimated; }
/* harmony export */ });
/* harmony import */ var _utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _get_real_property_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-real-property-value */ "./src/animation-mount/get-real-property-value.ts");
/* harmony import */ var _treat_property_current_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./treat-property-current-value */ "./src/animation-mount/treat-property-current-value.ts");





function getAttrPropertiesToBeAnimated(attrProperties, target, index, length) {
  var keyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(attrProperties, function (propertyKeyframes, propertyName) {
    var attrName = (0,_utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__.default)(propertyName);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(propertyKeyframes, function (value, key) {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }

      var v = (0,_treat_property_current_value__WEBPACK_IMPORTED_MODULE_4__.default)((0,_get_real_property_value__WEBPACK_IMPORTED_MODULE_3__.getRealPropertyValue)(value, target, index, length), attrName, 'attr', target);
      keyframes[key][propertyName] = v;
    });
  });
  var propertiesKeyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(keyframes, function (keyframe, key) {
    var properties = keyframe;
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(properties, function (propertyValue, propertyName) {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = propertyValue;
    });
  });
  return (0,_property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__.default)(propertiesKeyframes, target, index, length, 'attr');
}

/***/ }),

/***/ "./src/animation-mount/get-css-properties-to-be-animated.ts":
/*!******************************************************************!*\
  !*** ./src/animation-mount/get-css-properties-to-be-animated.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCSSPropertiesToBeAnimated; }
/* harmony export */ });
/* harmony import */ var _based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../based-implementations/colors */ "./src/based-implementations/colors.ts");
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");
/* harmony import */ var _utilities_style_get_computed_values_after_change__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities-style/get-computed-values-after-change */ "./src/utilities-style/get-computed-values-after-change.ts");
/* harmony import */ var _utilities_style_get_linked_css_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities-style/get-linked-css-properties */ "./src/utilities-style/get-linked-css-properties.ts");
/* harmony import */ var _utilities_style_to_css_string_rules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities-style/to-css-string-rules */ "./src/utilities-style/to-css-string-rules.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
/* harmony import */ var _css_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css-properties-to-animate */ "./src/animation-mount/css-properties-to-animate.ts");
/* harmony import */ var _property_object_to_animate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _get_real_property_value__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./get-real-property-value */ "./src/animation-mount/get-real-property-value.ts");
/* harmony import */ var _get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./get-unit-of-measure-properties */ "./src/animation-mount/get-unit-of-measure-properties.ts");
/* harmony import */ var _treat_property_current_value__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./treat-property-current-value */ "./src/animation-mount/treat-property-current-value.ts");












function getCSSPropertiesToBeAnimated(CSSProperties, target, index, length) {
  var keyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(CSSProperties, function (propertyKeyframes, propertyName) {
    var pName = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_6__.toCamelCase)(propertyName);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(propertyKeyframes, function (value, key) {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }

      var v = (0,_get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_10__.getUnitOfMeasureForPropertyValue)(propertyName, (0,_treat_property_current_value__WEBPACK_IMPORTED_MODULE_11__.default)((0,_get_real_property_value__WEBPACK_IMPORTED_MODULE_9__.getRealPropertyValue)(value, target, index, length), propertyName, 'css', target));
      (0,_utilities_style_get_linked_css_properties__WEBPACK_IMPORTED_MODULE_3__.default)(propertyName).forEach(function (n) {
        var name = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_6__.toCamelCase)(n);

        if (typeof value === 'string' && value.indexOf('?') > -1) {
          var currentValue = (0,_get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_10__.getUnitOfMeasureForPropertyValue)(name, (0,_treat_property_current_value__WEBPACK_IMPORTED_MODULE_11__.default)(value, name, 'css', target));
          keyframes[key][name] = (0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.isColor)(currentValue) ? (0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(currentValue) : currentValue;
        } else {
          keyframes[key][name] = v;
        }
      });

      if (!keyframes[key][pName]) {
        keyframes[key][pName] = v;
      }
    });
  });
  var propertiesKeyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(keyframes, function (keyframe, key) {
    var kf = keyframe;
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(kf, function (propertyValue, propertyName) {
      kf[propertyName] = (0,_css_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__.getColorValueFromCanche)(propertyValue);
    });
    var properties = (0,_utilities_style_to_css_string_rules__WEBPACK_IMPORTED_MODULE_4__.default)(kf);
    var o;

    if (properties && (0,_css_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__.consultComputedStyle)(kf)) {
      var propertiesChanged = (0,_utilities_style_get_computed_values_after_change__WEBPACK_IMPORTED_MODULE_2__.default)(target, properties);
      o = (0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_1__.default)(propertiesChanged.after) ? propertiesChanged.before : propertiesChanged.after;
    } else {
      o = kf;
    }

    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(o, function (propertyValue, propertyName) {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = (0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.isColor)(propertyValue) ? (0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.colorToRgb)(propertyValue) : propertyValue;

      if ((0,_based_implementations_colors__WEBPACK_IMPORTED_MODULE_0__.isColor)(propertiesKeyframes[propertyName][key]) && propertiesKeyframes[propertyName][key] !== kf[propertyName] && (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_6__.trimString)(kf[propertyName]).split(' ').length === 1) {
        (0,_css_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__.addToCancheColorValue)(kf[propertyName], propertiesKeyframes[propertyName][key]);
      }
    });
  });
  return (0,_property_object_to_animate__WEBPACK_IMPORTED_MODULE_8__.default)(propertiesKeyframes, target, index, length, 'css');
}

/***/ }),

/***/ "./src/animation-mount/get-direct-properties-to-be-animated.ts":
/*!*********************************************************************!*\
  !*** ./src/animation-mount/get-direct-properties-to-be-animated.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDirectPropertiesToBeAnimated; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _get_real_property_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-real-property-value */ "./src/animation-mount/get-real-property-value.ts");
/* harmony import */ var _get_scroll_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-scroll-values */ "./src/animation-mount/get-scroll-values.ts");
/* harmony import */ var _treat_property_current_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./treat-property-current-value */ "./src/animation-mount/treat-property-current-value.ts");






function getDirectPropertiesToBeAnimated(targetProperties, target, index, length) {
  var keyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(targetProperties, function (propertyKeyframes, propertyName) {
    var scrollProperty = propertyName;
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(propertyKeyframes, function (value, key) {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }

      var v = (0,_treat_property_current_value__WEBPACK_IMPORTED_MODULE_5__.default)((0,_get_real_property_value__WEBPACK_IMPORTED_MODULE_3__.getRealPropertyValue)(value, target, index, length), scrollProperty, 'direct', target);
      keyframes[key][propertyName] = v;
    });
  });
  var propertiesKeyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(keyframes, function (keyframe, key) {
    var properties = keyframe;
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(properties, function (propertyValue, propertyName) {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      if (_sauce_constants__WEBPACK_IMPORTED_MODULE_0__.WIDE_SMILE_SCROLL_PROPERTIES.indexOf(propertyName) > -1) {
        propertiesKeyframes[propertyName][key] = (0,_get_scroll_values__WEBPACK_IMPORTED_MODULE_4__.default)(target, propertyValue)[propertyName];
      } else {
        propertiesKeyframes[propertyName][key] = propertyValue;
      }
    });
  });
  return (0,_property_object_to_animate__WEBPACK_IMPORTED_MODULE_2__.default)(propertiesKeyframes, target, index, length, 'direct');
}

/***/ }),

/***/ "./src/animation-mount/get-elements-in-the-dom.ts":
/*!********************************************************!*\
  !*** ./src/animation-mount/get-elements-in-the-dom.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getElementsInTheDOM; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getElementsInTheDOM(targets) {
  var elements = [];

  if (targets) {
    var targetForElements = targets;

    if (typeof targetForElements === 'string' || _typeof(targetForElements) === 'object' && !Array.isArray(targetForElements)) {
      targetForElements = [targetForElements];
    } else {
      targetForElements = [].slice.call(targetForElements);
    }

    targetForElements.forEach(function (elementOrSelector) {
      if (typeof elementOrSelector === 'string') {
        [].slice.call(document.querySelectorAll(elementOrSelector)).forEach(function (elt) {
          if (elements.indexOf(elt) === -1) {
            elements.push(elt);
          }
        });
      } else if (elements.indexOf(elementOrSelector) === -1) {
        if (elementOrSelector && _typeof(targetForElements) === 'object') {
          elements.push(elementOrSelector);
        }
      }
    });
  }

  return elements;
}

/***/ }),

/***/ "./src/animation-mount/get-properties-to-be-animated.ts":
/*!**************************************************************!*\
  !*** ./src/animation-mount/get-properties-to-be-animated.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getPropertiesToBeAnimated; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/custom-properties-for-animations */ "./src/sauce/custom-properties-for-animations.ts");
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");
/* harmony import */ var _utilities_style_get_linked_css_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities-style/get-linked-css-properties */ "./src/utilities-style/get-linked-css-properties.ts");
/* harmony import */ var _utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities-style/get-vendor-css-property */ "./src/utilities-style/get-vendor-css-property.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/dom-attributes */ "./src/utilities/dom-attributes.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _utilities_ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/ordernate-by-growing-values */ "./src/utilities/ordernate-by-growing-values.ts");
/* harmony import */ var _get_css_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./get-css-properties-to-be-animated */ "./src/animation-mount/get-css-properties-to-be-animated.ts");
/* harmony import */ var _get_direct_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./get-direct-properties-to-be-animated */ "./src/animation-mount/get-direct-properties-to-be-animated.ts");
/* harmony import */ var _get_transform_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./get-transform-properties-to-be-animated */ "./src/animation-mount/get-transform-properties-to-be-animated.ts");
/* harmony import */ var _get_attr_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./get-attr-properties-to-be-animated */ "./src/animation-mount/get-attr-properties-to-be-animated.ts");
/* harmony import */ var _utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utilities/is-dom-element */ "./src/utilities/is-dom-element.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















/* eslint-disable @typescript-eslint/no-use-before-define  */

function revealSpecialProperties(propertyName, propertyValue, target, index) {
  var pName = propertyName;
  var specialPropertyCallback = (0,_sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_1__.getCustomProperty)(pName, 'special');
  var propertiesFound = {};

  if (specialPropertyCallback) {
    var o = specialPropertyCallback(propertyValue, target, index);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(o, function (value, name) {
      if ((0,_sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_1__.getCustomProperty)(name, 'special')) {
        Object.assign(propertiesFound, revealSpecialProperties(name, value, target, index));
      } else {
        propertiesFound[name] = value;
      }
    });
  }

  return propertiesFound;
}

function treatEachTypeProperties(properties, type, target, index, length) {
  if (!(0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_2__.default)(properties)) {
    var fn;

    switch (type) {
      case 'attr':
        fn = _get_attr_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_12__.default;
        break;

      case 'transform':
        fn = _get_transform_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_11__.default;
        break;

      case 'direct':
        fn = _get_direct_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_10__.default;
        break;

      default:
        fn = _get_css_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_9__.default;
        break;
    }

    return fn(properties, target, index, length);
  }

  return false;
}

function organizePropertiesToBeAnimate(properties, target, index, originalArrayLength) {
  var DOMElement = (0,_utilities_is_dom_element__WEBPACK_IMPORTED_MODULE_13__.default)(target);
  var CSSProperties = {};
  var attrProperties = {};
  var transformProperties = {};
  var directProperties = {};
  var observedProperties = [];
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(properties, function (propertyValue, propertyName) {
    var keyframes = _objectSpread({}, propertyValue);

    var isCSSProperty = DOMElement ? (0,_utilities_style_get_linked_css_properties__WEBPACK_IMPORTED_MODULE_3__.default)((0,_utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_4__.default)(propertyName))[0] : false;

    if ((0,_sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_1__.getCustomProperty)(propertyName, 'observed')) {
      if (keyframes[0] === '?') {
        keyframes[0] = undefined;
      }

      if (keyframes[100] === '?') {
        keyframes[100] = keyframes[0];
      }

      observedProperties.push({
        keyframes: keyframes,
        keyframesKeys: (0,_utilities_ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_8__.default)(Object.keys(keyframes)),
        target: target,
        index: index,
        propertyName: propertyName,
        type: 'observed',
        originalArrayLength: originalArrayLength
      });
    } else if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_7__.default)(_sauce_constants__WEBPACK_IMPORTED_MODULE_0__.WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS, propertyName)) {
      transformProperties[propertyName] = keyframes;
    } else if (DOMElement && ((0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_6__.getAttr)(target, propertyName) !== null || !isCSSProperty)) {
      attrProperties[propertyName] = keyframes;
    } else if (isCSSProperty) {
      CSSProperties[(0,_utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_4__.default)(propertyName)] = keyframes;
    } else if (propertyName in target) {
      directProperties[propertyName] = keyframes;
    }
  });
  var objectsWithProperties = [[CSSProperties, 'css'], [attrProperties, 'attr'], [transformProperties, 'transform'], [directProperties, 'direct']];
  return {
    observedProperties: observedProperties,
    otherProperties: objectsWithProperties
  };
}

function getPropertiesToBeAnimated(targetObject, props, specials) {
  var propertiesToBeAnimate = [];
  var properties = props;
  var target = targetObject.target,
      index = targetObject.index,
      originalArrayLength = targetObject.originalArrayLength;
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(specials, function (o, propertyName) {
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(o, function (value, key) {
      (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_5__.default)(revealSpecialProperties(propertyName, value, target, index), function (v, n) {
        var newPropertyName = n;

        if (!properties[newPropertyName]) {
          properties[newPropertyName] = {};
        }

        if (value !== '?') {
          properties[newPropertyName][key] = v;
        } else {
          properties[newPropertyName][key] = value;
        }
      });
    });
  });
  var organizedProperties = organizePropertiesToBeAnimate(properties, target, index, originalArrayLength);
  propertiesToBeAnimate = propertiesToBeAnimate.concat(organizedProperties.observedProperties);
  organizedProperties.otherProperties.forEach(function (o) {
    var p = treatEachTypeProperties(o[0], o[1], target, index, originalArrayLength);

    if (p) {
      propertiesToBeAnimate = propertiesToBeAnimate.concat(p);
    }
  });
  return propertiesToBeAnimate;
}

/***/ }),

/***/ "./src/animation-mount/get-property-current-value.ts":
/*!***********************************************************!*\
  !*** ./src/animation-mount/get-property-current-value.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getPropertyCurrentValue; }
/* harmony export */ });
/* harmony import */ var _animation_engine_crud_animations_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-engine/crud-animations-style */ "./src/animation-engine/crud-animations-style.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities-style/get-vendor-css-property */ "./src/utilities-style/get-vendor-css-property.ts");
/* harmony import */ var _utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/dom-attributes */ "./src/utilities/dom-attributes.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _elements_canche__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements-canche */ "./src/animation-mount/elements-canche.ts");
/* harmony import */ var _get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get-unit-of-measure-properties */ "./src/animation-mount/get-unit-of-measure-properties.ts");
/* harmony import */ var _organize_transform_functions_values__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./organize-transform-functions-values */ "./src/animation-mount/organize-transform-functions-values.ts");









function computedStyle(target) {
  return (0,_elements_canche__WEBPACK_IMPORTED_MODULE_5__.useElementCanche)(target).computedStyle;
}

function getCurrentValueTransformFunction(target, transformFunction) {
  var current = target.style[(0,_utilities_style_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_2__.default)('transform')];

  if (current && current.indexOf(transformFunction) > -1) {
    var transformFunctionsObject = (0,_animation_engine_crud_animations_style__WEBPACK_IMPORTED_MODULE_0__.transformFunctionsToObject)(target) || {};

    if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__.default)(transformFunctionsObject, transformFunction) && transformFunctionsObject[transformFunction]) {
      return transformFunctionsObject[transformFunction];
    }
  }

  return _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[transformFunction];
}

function getPropertyCurrentValue(target, propertyName, type) {
  var currentValue;

  switch (type) {
    case 'attr':
      currentValue = (0,_utilities_dom_attributes__WEBPACK_IMPORTED_MODULE_3__.getAttr)(target, propertyName) || '0';
      break;

    case 'direct':
      currentValue = target[propertyName].toString();
      break;

    case 'transform':
      currentValue = (0,_get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_6__.getUnitOfMeasureForPropertyValue)(propertyName, (0,_organize_transform_functions_values__WEBPACK_IMPORTED_MODULE_7__.default)(propertyName, getCurrentValueTransformFunction(target, propertyName)));
      break;

    default:
      currentValue = computedStyle(target)[propertyName] || '';
      break;
  }

  return currentValue;
}

/***/ }),

/***/ "./src/animation-mount/get-real-property-value.ts":
/*!********************************************************!*\
  !*** ./src/animation-mount/get-real-property-value.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRealPropertyValue": function() { return /* binding */ getRealPropertyValue; }
/* harmony export */ });
/* harmony import */ var _based_implementations_stagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../based-implementations/stagger */ "./src/based-implementations/stagger.ts");
/* harmony import */ var _parser_string_stagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser-string-stagger */ "./src/animation-mount/parser-string-stagger.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function getRealPropertyValue(propertyValue, target, index, length) {
  var value = typeof propertyValue === 'string' ? function (v) {
    return _typeof(v) === 'object' ? (0,_based_implementations_stagger__WEBPACK_IMPORTED_MODULE_0__.default)(v) : v;
  }((0,_parser_string_stagger__WEBPACK_IMPORTED_MODULE_1__.default)(propertyValue)) : propertyValue;

  switch (_typeof(value)) {
    case 'number':
      return value.toString();

    case 'function':
      return value(target, index, length).toString();

    default:
      return value;
  }
}

/***/ }),

/***/ "./src/animation-mount/get-relative-value.ts":
/*!***************************************************!*\
  !*** ./src/animation-mount/get-relative-value.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getRelativeValue; }
/* harmony export */ });
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _get_property_current_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-property-current-value */ "./src/animation-mount/get-property-current-value.ts");


function getRelativeValue(to, propertyName, type, target) {
  var operator = /^(\*=|\+=|-=)/.exec(to);

  if (!operator) {
    return to;
  }

  var from = (0,_get_property_current_value__WEBPACK_IMPORTED_MODULE_1__.default)(target, propertyName, type);
  var u = (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_0__.default)(to) || '';
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  var v;

  switch (operator[0][0]) {
    case '-':
      v = x - y;
      break;

    case '*':
      v = x * y;
      break;

    default:
      v = x + y;
  }

  return v + u;
}

/***/ }),

/***/ "./src/animation-mount/get-scroll-values.ts":
/*!**************************************************!*\
  !*** ./src/animation-mount/get-scroll-values.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollValues; }
/* harmony export */ });
function getScrollValues(target, to) {
  var scrollHeight = target.scrollHeight;
  var scrollWidth = target.scrollWidth;
  var clientHeight = target.clientHeight;
  var clientWidth = target.clientWidth;

  var scrollValues = function scrollValues(value, maxValue) {
    var v = value;
    v = typeof v === 'number' ? v.toString() : v;
    var r = parseFloat(v);

    if (v.indexOf('%') > -1) {
      r = maxValue / 100 * Math.floor(parseFloat(v));
    }

    v = r > maxValue || v.indexOf('max') > -1 ? maxValue : r;
    return v.toString();
  };

  return {
    scrollTop: scrollValues(to, scrollHeight - clientHeight),
    scrollLeft: scrollValues(to, scrollWidth - clientWidth)
  };
}

/***/ }),

/***/ "./src/animation-mount/get-transform-properties-to-be-animated.ts":
/*!************************************************************************!*\
  !*** ./src/animation-mount/get-transform-properties-to-be-animated.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getTransformPropertiesToBeAnimated; }
/* harmony export */ });
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _property_object_to_animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-object-to-animate */ "./src/animation-mount/property-object-to-animate.ts");
/* harmony import */ var _get_real_property_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-real-property-value */ "./src/animation-mount/get-real-property-value.ts");
/* harmony import */ var _get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-unit-of-measure-properties */ "./src/animation-mount/get-unit-of-measure-properties.ts");
/* harmony import */ var _organize_transform_functions_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./organize-transform-functions-values */ "./src/animation-mount/organize-transform-functions-values.ts");
/* harmony import */ var _treat_property_current_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./treat-property-current-value */ "./src/animation-mount/treat-property-current-value.ts");






function getTransformPropertiesToBeAnimated(transformProperties, target, index, length) {
  var keyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(transformProperties, function (propertyKeyframes, propertyName) {
    var transformFnName = propertyName;
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(propertyKeyframes, function (value, key) {
      if (!keyframes[key]) {
        keyframes[key] = {};
      }

      var v = (0,_treat_property_current_value__WEBPACK_IMPORTED_MODULE_5__.default)((0,_get_real_property_value__WEBPACK_IMPORTED_MODULE_2__.getRealPropertyValue)(value, target, index, length), transformFnName, 'transform', target);
      keyframes[key][propertyName] = v;
    });
  });
  var propertiesKeyframes = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(keyframes, function (keyframe, key) {
    var properties = (0,_get_unit_of_measure_properties__WEBPACK_IMPORTED_MODULE_3__.getUnitOfMeasureForPropertiesValues)(keyframe);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(properties, function (propertyValue, propertyName) {
      if (!propertiesKeyframes[propertyName]) {
        propertiesKeyframes[propertyName] = {};
      }

      propertiesKeyframes[propertyName][key] = (0,_organize_transform_functions_values__WEBPACK_IMPORTED_MODULE_4__.default)(propertyName, propertyValue);
    });
  });
  return (0,_property_object_to_animate__WEBPACK_IMPORTED_MODULE_1__.default)(propertiesKeyframes, target, index, length, 'transform');
}

/***/ }),

/***/ "./src/animation-mount/get-unit-of-measure-properties.ts":
/*!***************************************************************!*\
  !*** ./src/animation-mount/get-unit-of-measure-properties.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUnitOfMeasureForPropertyValue": function() { return /* binding */ getUnitOfMeasureForPropertyValue; },
/* harmony export */   "getUnitOfMeasureForPropertiesValues": function() { return /* binding */ getUnitOfMeasureForPropertiesValues; }
/* harmony export */ });
/* harmony import */ var _utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");





var DIV_ELEMENT_STYLE = document.createElement('div').style;
var possibleUnits = ['px', 'deg'];
var possibleUnitsLength = possibleUnits.length;
var knownProperties = {
  perspective: 'px',
  rotate: 'deg',
  rotate3d: '',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  translate: 'px',
  translate3d: 'px',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px',
  scale: '',
  scale3d: '',
  scaleX: '',
  scaleY: '',
  scaleZ: '',
  skew: 'deg',
  skewX: 'deg',
  skewY: 'deg',
  scrollLeft: '',
  scrollTop: '',
  scrollTo: '',
  opacity: ''
};
function getUnitOfMeasureForPropertyValue(propertyName, propertyValue) {
  var propertyNameCSS = (0,_utilities_style_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__.default)(propertyName);

  if (typeof propertyValue === 'string') {
    return propertyValue.split(' ').map(function (value) {
      var v = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.trimString)(value);
      var valueNumber = parseFloat(v);

      if (!(0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_2__.default)(v) && typeof valueNumber === 'number' && !Number.isNaN(valueNumber)) {
        if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_4__.default)(knownProperties, propertyName)) {
          return valueNumber + knownProperties[propertyName] + (v.indexOf(',') > -1 ? ',' : '');
        }

        for (var index = 0; index < possibleUnitsLength; index += 1) {
          var u = possibleUnits[index];
          DIV_ELEMENT_STYLE[propertyNameCSS] = v + u;

          if (DIV_ELEMENT_STYLE.item(0)) {
            knownProperties[propertyName] = u;
            DIV_ELEMENT_STYLE[propertyNameCSS] = '';
            return v + u;
          }
        }

        DIV_ELEMENT_STYLE[propertyNameCSS] = '';
      }

      return value;
    }).join(' ');
  }

  return propertyValue;
}
function getUnitOfMeasureForPropertiesValues(keyframe) {
  var k = keyframe;
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(k, function (propertyValue, propertyName) {
    k[propertyName] = getUnitOfMeasureForPropertyValue(propertyName, propertyValue);
  });
  return k;
}

/***/ }),

/***/ "./src/animation-mount/is-dir-value.ts":
/*!*********************************************!*\
  !*** ./src/animation-mount/is-dir-value.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isDirValue; }
/* harmony export */ });
function isDirValue(s) {
  switch (s) {
    case 'normal':
    case 'reverse':
    case 'alternate':
    case 'alternate-reverse':
      return true;

    default:
      return false;
  }
}

/***/ }),

/***/ "./src/animation-mount/load-animation.ts":
/*!***********************************************!*\
  !*** ./src/animation-mount/load-animation.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoadAnimation; },
/* harmony export */   "startAnimationIfItIsLoaded": function() { return /* binding */ startAnimationIfItIsLoaded; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_engine_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-engine/get-new-animation-progress */ "./src/animation-engine/get-new-animation-progress.ts");
/* harmony import */ var _crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _create_animation_auxiliary_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-animation-auxiliary-object */ "./src/animation-mount/create-animation-auxiliary-object.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation-engine/start-animation-execution-cycle */ "./src/animation-engine/start-animation-execution-cycle.ts");
/* harmony import */ var _load_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./load-properties-to-animate */ "./src/animation-mount/load-properties-to-animate.ts");
/* harmony import */ var _flatten_keyframes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flatten-keyframes */ "./src/animation-mount/flatten-keyframes.ts");
/* harmony import */ var _animation_engine_reset_animation_progress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../animation-engine/reset-animation-progress */ "./src/animation-engine/reset-animation-progress.ts");











function getKeyframesKeys(keyframes) {
  var keys = [];
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.customForIn)(keyframes, function (propertyKeyframes) {
    (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.customForIn)(propertyKeyframes, function (_v, key) {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
      }
    });
  });
  return (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.ordernateByGrowingValues)(keys);
}

function forwardAnimation(animationAuxiliaryObject, animationArrivalTime, callbackLoaded) {
  var aAuxiliaryObject = animationAuxiliaryObject;
  var animation = aAuxiliaryObject.animation;
  var fKeyframes = (0,_flatten_keyframes__WEBPACK_IMPORTED_MODULE_8__.default)(animation.keyframes, animation.performer.$hidden.orderOfThePropertiesUsed);
  animation.performer.$hidden.orderOfThePropertiesUsed = fKeyframes.orderOfThePropertiesUsed;
  var keyframes = fKeyframes.keyframes;
  aAuxiliaryObject.keyframesKeys = getKeyframesKeys(keyframes);
  var animationProgressObject = (0,_animation_engine_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_1__.default)(aAuxiliaryObject);
  aAuxiliaryObject.lastStartProgress = animationProgressObject.progress;
  aAuxiliaryObject.countDriveLoops = animationProgressObject.countDriveLoops;
  animation.progressValue = animationProgressObject.progress;
  animation.max = animationProgressObject.maxProgress;
  (0,_load_properties_to_animate__WEBPACK_IMPORTED_MODULE_7__.default)(aAuxiliaryObject, keyframes, function (result, propertiesToAnimate) {
    var currentTime = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.getTimeNow)();
    var animationLoadingTime = currentTime - animationArrivalTime;
    aAuxiliaryObject.dataLoadingState = result ? 'load' : 'stoped';
    aAuxiliaryObject.animationLoadingTime = animationLoadingTime;
    aAuxiliaryObject.propertiesToBeAnimate = propertiesToAnimate;
    callbackLoaded(aAuxiliaryObject);
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.LISTENERS_NAMES[3], aAuxiliaryObject.animation);
  });
}
/**
 * Creates an object with the properties of the user's animation instance, and adds control-related properties and the execution of the animation, thus maintaining hidden complexity.
 */


function LoadAnimation(animation, callbackLoaded) {
  var hasAnimationAuxiliaryObject = (0,_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.getAnimationAuxiliaryObject)(animation.animationId);

  if (!hasAnimationAuxiliaryObject) {
    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.LISTENERS_NAMES[6], animation);
  }

  if (animation.state !== _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0] || hasAnimationAuxiliaryObject) {
    if (hasAnimationAuxiliaryObject) {
      if (hasAnimationAuxiliaryObject.dataLoadingState === 'loading') {
        var setTimeoutId = setTimeout(function () {
          clearTimeout(setTimeoutId);

          if (animation.state !== _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
            LoadAnimation(animation, callbackLoaded);
          }
        });
      } else if (hasAnimationAuxiliaryObject.dataLoadingState === 'load' && hasAnimationAuxiliaryObject.animation.state === _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[5]) {
        (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_6__.default)(hasAnimationAuxiliaryObject);
      } else {
        (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_6__.default)((0,_animation_engine_reset_animation_progress__WEBPACK_IMPORTED_MODULE_9__.default)(hasAnimationAuxiliaryObject), true);
      }

      return;
    }
  }

  var currentTime = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.getTimeNow)();
  var animationAuxiliaryObject = (0,_create_animation_auxiliary_object__WEBPACK_IMPORTED_MODULE_3__.default)(animation);
  (0,_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.addAnimationAuxiliaryObject)(animationAuxiliaryObject);
  Object.assign(animationAuxiliaryObject.animation, {
    state: _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[6],
    delay: animation.delay
  });
  forwardAnimation(animationAuxiliaryObject, currentTime, callbackLoaded);
}
function startAnimationIfItIsLoaded(animationAuxiliaryObject) {
  if (animationAuxiliaryObject.dataLoadingState === 'load' && animationAuxiliaryObject.animation.state !== _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[3]) {
    var a = animationAuxiliaryObject;
    a.animation.state = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1];
    (0,_animation_engine_start_animation_execution_cycle__WEBPACK_IMPORTED_MODULE_6__.default)(animationAuxiliaryObject);
  }
}

/***/ }),

/***/ "./src/animation-mount/load-properties-to-animate.ts":
/*!***********************************************************!*\
  !*** ./src/animation-mount/load-properties-to-animate.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ loadPropertiesToAnimate; }
/* harmony export */ });
/* harmony import */ var _animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-engine/mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sauce/custom-properties-for-animations */ "./src/sauce/custom-properties-for-animations.ts");
/* harmony import */ var _utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _get_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./get-properties-to-be-animated */ "./src/animation-mount/get-properties-to-be-animated.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







/* eslint-disable @typescript-eslint/no-use-before-define  */

var ANIMATIONS_FOR_LOAD = [];
var IS_BUSY_LOADER = false;

var loadNextAnimation = function loadNextAnimation(a) {
  if (a) {
    loadPropertiesToAnimate.apply(void 0, _toConsumableArray(a));
  }
};

function loadPropertiesToAnimate(animationAuxiliaryObject, props, callbackLoaded) {
  var animation = animationAuxiliaryObject.animation;
  var targets = animation.targets;

  if (animation.creator.global.asyncLoading) {
    IS_BUSY_LOADER = false;
  }
  /**
   * There's an animation currently loading.
   */


  if (IS_BUSY_LOADER && !animation.skip) {
    ANIMATIONS_FOR_LOAD.push([animationAuxiliaryObject, props, callbackLoaded]);
    return;
  }

  IS_BUSY_LOADER = true;
  var length = targets.length;

  var properties = _objectSpread({}, props);

  var specials = function () {
    var o = {};
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_4__.default)(properties, function (propertyValue, propertyName) {
      if ((0,_sauce_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.getCustomProperty)(propertyName, 'special')) {
        o[propertyName] = propertyValue;
      }
    });
    return o;
  }();

  var propertiesToBeAnimate = [];
  var count = 0;
  var startTime = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__.default)();
  var releaseTheExecutionStack = false;

  (function repeat() {
    propertiesToBeAnimate = propertiesToBeAnimate.concat((0,_get_properties_to_be_animated__WEBPACK_IMPORTED_MODULE_5__.default)(targets[count], properties, specials));
    var timePassed = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__.default)() - startTime;
    count += 1;

    switch (animation.state) {
      case _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[2]:
      case _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[3]:
      case _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[4]:
      case _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_STATES[7]:
        IS_BUSY_LOADER = false;
        callbackLoaded(false, propertiesToBeAnimate);
        loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        return;

      default:
        if (count < length) {
          if (animation.skip || !releaseTheExecutionStack && !(0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_0__.hasAnimationInTheStack)() || timePassed < _sauce_constants__WEBPACK_IMPORTED_MODULE_1__.TIME_OUT_FOR_SMART_LOADING) {
            releaseTheExecutionStack = true;
            repeat();
          } else {
            releaseTheExecutionStack = false;
            startTime = (0,_utilities_get_time_now__WEBPACK_IMPORTED_MODULE_3__.default)();
            var setTimeoutId = setTimeout(function () {
              clearTimeout(setTimeoutId);
              repeat();
            }, 0);
          }
        } else {
          IS_BUSY_LOADER = false;
          callbackLoaded(true, propertiesToBeAnimate);
          loadNextAnimation(ANIMATIONS_FOR_LOAD.shift());
        }

        break;
    }
  })();
}

/***/ }),

/***/ "./src/animation-mount/normalize-animation-object-properties.ts":
/*!**********************************************************************!*\
  !*** ./src/animation-mount/normalize-animation-object-properties.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizePastedProperties": function() { return /* binding */ normalizePastedProperties; },
/* harmony export */   "default": function() { return /* binding */ normalizePastedAnimationProperties; }
/* harmony export */ });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function toArray(o) {
  if (!o || _typeof(o) !== 'object') {
    return false;
  }

  var c = Array.isArray(o) ? o : [].slice.call(o);
  return c && c.length > 0 ? c : false;
}

function normalizePastedProperties(obj, loopObject) {
  var o = obj;
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.customForIn)(obj, function (propertyValue, propertyName) {
    var splitedPropertyName = propertyName.split('_');

    if (splitedPropertyName.length > 1) {
      splitedPropertyName.forEach(function (pName) {
        var n = pName;

        if (pName) {
          if (o[n] && _typeof(propertyValue) === 'object') {
            var v = toArray(propertyValue);

            if (v) {
              o[n] = o[n].concat(v);
            } else {
              Object.assign(o[n], propertyValue);
            }
          } else {
            o[n] = propertyValue;
          }
        }
      });
      delete o[propertyName];
    }

    if (loopObject && propertyValue && _typeof(propertyValue) === 'object' && !toArray(propertyValue)) {
      normalizePastedProperties(propertyValue);
    }
  });
  return o;
}
/**
 * Normalize object properties that have been pasted to be able to share the same value.
 * @example
 * input = {
 *  firstname_lastname: 'Neves'
 * }
 *
 * output = {
 *  firstname: 'Neves'
 *  lastname: 'Neves'
 * }
 *
 */

function normalizePastedAnimationProperties(animation) {
  var aInstance = normalizePastedProperties(animation);
  return aInstance;
}

/***/ }),

/***/ "./src/animation-mount/organize-transform-functions-values.ts":
/*!********************************************************************!*\
  !*** ./src/animation-mount/organize-transform-functions-values.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ organizeTransformFunctionsValues; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");


function organizeTransformFunctionsValues(propertyName, propertyValue) {
  var propertyValues = propertyValue.split(',');
  var transformFnValues = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS[propertyName].split(',');
  var unitOfMeasureInUse = '';
  var lastRealValue = '';
  var newPropertyValues = transformFnValues.map(function (defaultValue, index) {
    var value = propertyValues[index];

    if (value) {
      lastRealValue = value;
    } else {
      value = lastRealValue || defaultValue;
    }

    unitOfMeasureInUse = value ? (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_1__.default)(value) : unitOfMeasureInUse;
    return value;
  });
  return newPropertyValues.join(',').replace(/( {2})/g, ' ');
}

/***/ }),

/***/ "./src/animation-mount/parser-string-stagger.ts":
/*!******************************************************!*\
  !*** ./src/animation-mount/parser-string-stagger.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ parserStringStagger; }
/* harmony export */ });
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
/* harmony import */ var _utilities_remove_spaces_char__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/remove-spaces-char */ "./src/utilities/remove-spaces-char.ts");



function stringToArray(v) {
  return v.split(',').map(function (n) {
    return parseFloat((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(n));
  });
}

function getPropertyValue(v) {
  var value = /\[(.*)\]/.exec(v);

  if (value && value[1]) {
    return stringToArray(value[1]);
  }

  return v;
}

function parserStringStagger(stringStagger) {
  var value = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(stringStagger);

  if (value.indexOf('<') > -1 && value.indexOf('>') > -1) {
    var splitValue = value.split('<');
    var propertyValue = getPropertyValue((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(splitValue[0]));
    var form = /<(.*)>/.exec(value);
    var getGrid = /\[(.*)\]/.exec(splitValue[1]);
    var getOtherValue = splitValue[1].replace(/(.*)>/, '').replace(/\[(.*)\]/, '');
    var grid = getGrid ? stringToArray((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(getGrid[1])) : false;
    var staggerParams = {};

    if (grid) {
      staggerParams.grid = grid;
    }

    if (form && (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(form[1])) {
      var v = parseFloat((0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(form[1]));
      staggerParams.from = Number.isNaN(v) ? (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(form[1]) : v;
    }

    getOtherValue.split(' ').forEach(function (a) {
      var v = (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(a);

      if (v) {
        if (Number.isNaN(parseFloat(v))) {
          switch (v) {
            case 'x':
            case 'y':
            case 'both':
              staggerParams.axis = v;
              break;

            case 'normal':
            case 'reverse':
              staggerParams.dir = v;
              break;

            default:
              staggerParams.easing = v;
              break;
          }
        } else {
          staggerParams.start = (0,_utilities_remove_spaces_char__WEBPACK_IMPORTED_MODULE_1__.default)(v);
        }
      }
    });
    staggerParams.value = Array.isArray(propertyValue) ? propertyValue.map(function (v) {
      return v.toString();
    }) : propertyValue;
    return staggerParams;
  }

  return stringStagger;
}

/***/ }),

/***/ "./src/animation-mount/property-object-to-animate.ts":
/*!***********************************************************!*\
  !*** ./src/animation-mount/property-object-to-animate.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recyclePropertyObjectToAnimate": function() { return /* binding */ recyclePropertyObjectToAnimate; },
/* harmony export */   "recyclePropertyObjectsToAnimate": function() { return /* binding */ recyclePropertyObjectsToAnimate; },
/* harmony export */   "default": function() { return /* binding */ getPropertyObjectToAnimate; }
/* harmony export */ });
/* harmony import */ var _utilities_style_split_css_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities-style/split-css-properties */ "./src/utilities-style/split-css-properties.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _utilities_ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/ordernate-by-growing-values */ "./src/utilities/ordernate-by-growing-values.ts");




var POOL_PROPERTY_OBJECTS = [];
function recyclePropertyObjectToAnimate(propertyObject) {
  var u = undefined;
  var o = propertyObject;
  o.target = u;
  o.index = u;
  o.keyframes = u;
  o.keyframesKeys = u;
  o.propertyName = u;
  o.newPropertyValue = u;
  o.lastKey = u;
  o.type = u;
  o.originalArrayLength = u;
  POOL_PROPERTY_OBJECTS.push(o);
}
function recyclePropertyObjectsToAnimate(propertiesToBeAnimate) {
  if (POOL_PROPERTY_OBJECTS.length < 2000
  /** Maximum objects in the dumpster. */
  ) {
      propertiesToBeAnimate.forEach(function (obj) {
        recyclePropertyObjectToAnimate(obj);
      });
    }
}

function removeSpaces(a) {
  return a.filter(function (v) {
    return v !== ' ';
  });
}

function splitKeyframePropertyValue(keyframes) {
  var n = {};
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(keyframes, function (keyframeValue, key) {
    n[key] = removeSpaces((0,_utilities_style_split_css_properties__WEBPACK_IMPORTED_MODULE_0__.default)(keyframeValue));
  });
  return n;
}

function getPropertyObjectToAnimate(propertiesKeyframes, target, index, originalArrayLength, type) {
  var propertiesToBeAnimate = [];
  (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(propertiesKeyframes, function (kf, propertyName) {
    var differentValues = false;
    var lastkey = '0';
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(kf, function (value, key) {
      differentValues = value !== kf[lastkey];

      if (differentValues) {
        return true;
      }

      lastkey = key;
      return false;
    });

    if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__.default)(kf, '0') && (0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__.default)(kf, '100') && differentValues) {
      var o = POOL_PROPERTY_OBJECTS.shift() || {};
      o.target = target;
      o.index = index;
      o.keyframes = splitKeyframePropertyValue(kf);
      o.keyframesKeys = (0,_utilities_ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_3__.default)(Object.keys(kf));
      o.propertyName = propertyName;
      o.type = type;
      o.originalArrayLength = originalArrayLength;
      propertiesToBeAnimate.push(o);
    }
  });
  return propertiesToBeAnimate;
}

/***/ }),

/***/ "./src/animation-mount/treat-property-current-value.ts":
/*!*************************************************************!*\
  !*** ./src/animation-mount/treat-property-current-value.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ treatPropertyCurrentValue; }
/* harmony export */ });
/* harmony import */ var _get_property_current_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-property-current-value */ "./src/animation-mount/get-property-current-value.ts");
/* harmony import */ var _get_relative_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-relative-value */ "./src/animation-mount/get-relative-value.ts");


function treatPropertyCurrentValue(propertyValue, propertyName, type, target) {
  var v;

  if (typeof propertyValue === 'string') {
    v = propertyValue;

    if (v.indexOf('?') > -1) {
      v = v.replace(/\?/, (0,_get_property_current_value__WEBPACK_IMPORTED_MODULE_0__.default)(target, propertyName, type));
    }

    v = (0,_get_relative_value__WEBPACK_IMPORTED_MODULE_1__.default)(v, propertyName, type, target);
  }

  return v;
}

/***/ }),

/***/ "./src/based-implementations/colors.ts":
/*!*********************************************!*\
  !*** ./src/based-implementations/colors.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isHex": function() { return /* binding */ isHex; },
/* harmony export */   "isRgb": function() { return /* binding */ isRgb; },
/* harmony export */   "isHsl": function() { return /* binding */ isHsl; },
/* harmony export */   "isColor": function() { return /* binding */ isColor; },
/* harmony export */   "rgbToRgba": function() { return /* binding */ rgbToRgba; },
/* harmony export */   "hexToRgba": function() { return /* binding */ hexToRgba; },
/* harmony export */   "hslToRgba": function() { return /* binding */ hslToRgba; },
/* harmony export */   "colorToRgb": function() { return /* binding */ colorToRgb; }
/* harmony export */ });
/* harmony import */ var _utilities_remove_spaces_char__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/remove-spaces-char */ "./src/utilities/remove-spaces-char.ts");
/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */
 // Colors

function isHex(a) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
}
function isRgb(a) {
  return /^rgb/.test(a);
}
function isHsl(a) {
  return /^hsl/.test(a);
}
function isColor(a) {
  var c = (0,_utilities_remove_spaces_char__WEBPACK_IMPORTED_MODULE_0__.default)(a).split(')');

  if (c.length > 1 && c[1] !== '') {
    return false;
  }

  return isHex(a) || isRgb(a) || isHsl(a);
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(".concat(rgb[1], ",1)") : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",1)");
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;

  function hue2rgb(p, q, t) {
    var tt = t;

    if (tt < 0) {
      tt += 1;
    }

    if (tt > 1) {
      tt -= 1;
    }

    if (tt < 1 / 6) {
      return p + (q - p) * 6 * tt;
    }

    if (tt < 1 / 2) {
      return q;
    }

    if (tt < 2 / 3) {
      return p + (q - p) * (2 / 3 - tt) * 6;
    }

    return p;
  }

  var r;
  var g;
  var b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return "rgba(".concat(r * 255, ",").concat(g * 255, ",").concat(b * 255, ",").concat(a, ")");
}
function colorToRgb(value) {
  var val = (0,_utilities_remove_spaces_char__WEBPACK_IMPORTED_MODULE_0__.default)(value);

  if (isRgb(val)) {
    return rgbToRgba(val);
  }

  if (isHex(val)) {
    return hexToRgba(val);
  }

  if (isHsl(val)) {
    return hslToRgba(val);
  }

  return val;
}

/***/ }),

/***/ "./src/based-implementations/easings.ts":
/*!**********************************************!*\
  !*** ./src/based-implementations/easings.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyArguments": function() { return /* binding */ applyArguments; },
/* harmony export */   "parserEasings": function() { return /* binding */ parserEasings; }
/* harmony export */ });
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */

/* eslint-disable no-plusplus  */

/* eslint-disable no-cond-assign */

/* eslint-disable no-constant-condition */


function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function mathPow(x, y) {
  return Math.pow(x, y);
}

function isUnd(v) {
  return typeof v === 'undefined';
} // Easings


function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) {
    return parseFloat(p);
  }) : [];
} // Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js


function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(isUnd(params[0]) ? 1 : params[0], 0.1, 100);
  var stiffness = minMax(isUnd(params[1]) ? 100 : params[1], 0.1, 100);
  var damping = minMax(isUnd(params[2]) ? 10 : params[2], 0.1, 100);
  var velocity = minMax(isUnd(params[3]) ? 0 : params[3], 0.1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? duration * t / 1000 : t;

    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }

    if (t === 0 || t === 1) {
      return t;
    }

    return 1 - progress;
  }

  function getDuration() {
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;

    while (true) {
      elapsed += frame;

      if (solver(elapsed) === 1) {
        rest++;

        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }

    return elapsed * frame * 1000;
  }

  return duration ? solver : getDuration;
} // Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function


function steps(stps) {
  var s = stps;
  if (s === undefined) s = 10;
  return function (t) {
    return Math.ceil(minMax(t, 0.000001, 1) * s) * (1 / s);
  };
}

var penner = function () {
  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)
  var eases = {
    linear: function linear() {
      return function (t) {
        return t;
      };
    }
  };
  var functionEasings = {
    Sine: function Sine() {
      return function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Circ: function Circ() {
      return function (t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function Back() {
      return function (t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function Bounce() {
      return function (t) {
        var pow2;
        var b = 4;

        while (t < ((pow2 = mathPow(2, --b)) - 1) / 11) {
          ;
        }

        return 1 / mathPow(4, 3 - b) - 7.5625 * mathPow((pow2 * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function Elastic(amplitude, period) {
      var amp = amplitude;
      var per = period;
      if (amp === undefined) amp = 1;
      if (period === undefined) per = 0.5;
      var a = minMax(amp, 1, 10);
      var p = minMax(per, 0.1, 2);
      return function (t) {
        return t === 0 || t === 1 ? t : -a * mathPow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
      };
    }
  };
  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () {
      return function (t) {
        return mathPow(t, i + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases["easeIn".concat(name)] = easeIn;

    eases["easeOut".concat(name)] = function (a, b) {
      return function (t) {
        return 1 - easeIn(a, b)(1 - t);
      };
    };

    eases["easeInOut".concat(name)] = function (a, b) {
      return function (t) {
        return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    };

    eases["easeOutIn".concat(name)] = function (a, b) {
      return function (t) {
        return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}(); // BezierEasing https://github.com/gre/bezier-easing


var bezier = function () {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }

  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }

  function C(aA1) {
    return 3.0 * aA1;
  }

  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX;
    var currentT;
    var i = 0;
    var ab = aB;
    var aa = aA;

    do {
      currentT = aa + (ab - aa) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;

      if (currentX > 0.0) {
        ab = currentT;
      } else {
        aa = currentT;
      }

      i += 1;
    } while (Math.abs(currentX) > 0.0000001 && i < 10);

    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    var aG = aGuessT;

    for (var i = 0; i < 4; i += 1) {
      var currentSlope = getSlope(aG, mX1, mX2);

      if (currentSlope === 0.0) {
        return aG;
      }

      var currentX = calcBezier(aG, mX1, mX2) - aX;
      aG -= currentX / currentSlope;
    }

    return aG;
  }

  function bz(mX1, mY1, mX2, mY2) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      return undefined;
    }

    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      }

      if (initialSlope === 0.0) {
        return guessForT;
      }

      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }

      if (x === 0 || x === 1) {
        return x;
      }

      return calcBezier(getTForX(x), mY1, mY2);
    };
  }

  return bz;
}();

function applyArguments(func, args) {
  return func.apply(void 0, _toConsumableArray(args));
}
function parserEasings(easing, duration) {
  if (typeof easing === 'function') {
    return easing;
  }

  var name = easing.split('(')[0];
  var ease = penner[(0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(name)];
  var args = parseEasingParameters(easing);

  switch (name) {
    case 'spring':
      return spring(easing, duration);

    case 'cubicBezier':
      return applyArguments(bezier, args);

    case 'steps':
      return applyArguments(steps, args);

    default:
      return applyArguments(ease, args);
  }
}

/***/ }),

/***/ "./src/based-implementations/stagger.ts":
/*!**********************************************!*\
  !*** ./src/based-implementations/stagger.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stagger; }
/* harmony export */ });
/* harmony import */ var _sauce_custom_easings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/custom-easings */ "./src/sauce/custom-easings.ts");
/* harmony import */ var _utilities_get_unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _easings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./easings */ "./src/based-implementations/easings.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */



function stagger(params) {
  var value = params.value;
  var p = params;
  var val = typeof value === 'number' ? value.toString() : value;
  var easing;
  var grid = p.grid;
  var axis = p.axis;
  var fromIndex = p.from || 0;

  if (fromIndex === 'edges') {
    fromIndex = 'center';

    if (!p.dir || p.dir === 'normal') {
      p.dir = 'reverse';
    } else {
      p.dir = 'normal';
    }
  }

  var dir = p.dir || 'normal';
  var fromCenter = fromIndex === 'center';
  var isRange = Array.isArray(val);
  var val1;
  var val2;
  var unit;

  if (params && params.easing && typeof params.easing === 'string') {
    easing = (0,_sauce_custom_easings__WEBPACK_IMPORTED_MODULE_0__.getCustomEasing)(params.easing) || (0,_easings__WEBPACK_IMPORTED_MODULE_2__.parserEasings)(params.easing);
  } else {
    easing = null;
  }

  if (Array.isArray(val)) {
    val1 = parseFloat(val[0]);
    val2 = parseFloat(val[1]);
    unit = (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_1__.default)(val[1]) || '';
  } else {
    val1 = parseFloat(val);
    val2 = 0;
    unit = (0,_utilities_get_unit__WEBPACK_IMPORTED_MODULE_1__.default)(val) || '';
  }

  var start = parseFloat(p.start) || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    var fIndex;

    switch (fromIndex) {
      case 'first':
        fIndex = 0;
        break;

      case 'center':
        fIndex = (t - 1) / 2;
        break;

      case 'last':
        fIndex = t - 1;
        break;

      case 'random':
        fIndex = Math.floor(Math.random() * (t + 1));
        break;

      default:
        fIndex = fromIndex;
        break;
    }

    if (!values.length) {
      for (var index = 0; index < t; index += 1) {
        if (!grid) {
          values.push(Math.abs(fIndex - index));
        } else {
          var fromX = !fromCenter ? fIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;

          var _r = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (axis === 'x') {
            _r = -distanceX;
          }

          if (axis === 'y') {
            _r = -distanceY;
          }

          values.push(_r);
        }

        maxValue = Math.max.apply(Math, _toConsumableArray(values));
      }

      if (easing) {
        values = values.map(function (v) {
          return easing(v / maxValue, el, i, t) * maxValue;
        });
      }

      if (dir === 'reverse') {
        values = values.map(function (v) {
          if (axis) {
            return v < 0 ? v * -1 : -v;
          }

          return Math.abs(maxValue - v);
        });
      }
    }

    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    var r = start + spacing * (Math.round(values[i] * 100) / 100);
    return unit ? r + unit : r;
  };
}

/***/ }),

/***/ "./src/creator-fn.ts":
/*!***************************!*\
  !*** ./src/creator-fn.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sauce_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sauce/polyfills */ "./src/sauce/polyfills.ts");
/* harmony import */ var _sauce_polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sauce_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _animation_engine_handle_visibility_change__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation-engine/handle-visibility-change */ "./src/animation-engine/handle-visibility-change.ts");
/* harmony import */ var _sauce_new_creator_fn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sauce/new-creator-fn */ "./src/sauce/new-creator-fn.ts");
/* harmony import */ var _sauce_creators_global_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sauce/creators-global-property */ "./src/sauce/creators-global-property.ts");




/* eslint-disable @typescript-eslint/no-use-before-define */

/* harmony default export */ __webpack_exports__["default"] = ((0,_sauce_new_creator_fn__WEBPACK_IMPORTED_MODULE_2__.default)(_sauce_creators_global_property__WEBPACK_IMPORTED_MODULE_3__.default));

/***/ }),

/***/ "./src/sauce/animation-constructor.ts":
/*!********************************************!*\
  !*** ./src/sauce/animation-constructor.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AnimationConstructor; }
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A simple counter that helps to mark animation objects through the `animationId` property to avoid collisions and also indicates the skip of the animation instance's style insertion.
 */
var ANIMATIONS_ID = -1;
function AnimationConstructor(animation, creator) {
  var D_A_P = creator.dfs;
  ANIMATIONS_ID += 1;
  return _objectSpread(_objectSpread(_objectSpread({}, D_A_P), animation), {
    creator: creator,
    targets: animation.targets,
    loop: animation.loop,
    count: 0,
    animationId: ANIMATIONS_ID
  });
}

/***/ }),

/***/ "./src/sauce/animation.ts":
/*!********************************!*\
  !*** ./src/sauce/animation.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/load-animation */ "./src/animation-mount/load-animation.ts");
/* harmony import */ var _animation_mount_normalize_animation_object_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/normalize-animation-object-properties */ "./src/animation-mount/normalize-animation-object-properties.ts");
/* harmony import */ var _animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation-engine/mount-animations-stack */ "./src/animation-engine/mount-animations-stack.ts");
/* harmony import */ var _animation_constructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animation-constructor */ "./src/sauce/animation-constructor.ts");
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _iteration_control_methods__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./iteration-control-methods */ "./src/sauce/iteration-control-methods.ts");
/* harmony import */ var _utilities_multiply_value__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/multiply-value */ "./src/utilities/multiply-value.ts");
/* harmony import */ var _animation_engine_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../animation-engine/get-new-animation-progress */ "./src/animation-engine/get-new-animation-progress.ts");
/* harmony import */ var _animation_actions_resume_animation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../animation-actions/resume-animation */ "./src/animation-actions/resume-animation.ts");
/* harmony import */ var _animation_actions_restart_animation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../animation-actions/restart-animation */ "./src/animation-actions/restart-animation.ts");
/* harmony import */ var _animation_engine_update_animation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../animation-engine/update-animation */ "./src/animation-engine/update-animation.ts");
/* harmony import */ var _animation_actions_destroy_animation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../animation-actions/destroy-animation */ "./src/animation-actions/destroy-animation.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _animation_engine_remove_animation_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../animation-engine/remove-animation-style */ "./src/animation-engine/remove-animation-style.ts");
/* harmony import */ var _push_performer_again_to_the_creator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./push-performer-again-to-the-creator */ "./src/sauce/push-performer-again-to-the-creator.ts");
/* harmony import */ var _animation_actions_remove_from_animation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../animation-actions/remove-from-animation */ "./src/animation-actions/remove-from-animation.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



















var AnimationWS = /*#__PURE__*/function () {
  function AnimationWS(animation, creator) {
    _classCallCheck(this, AnimationWS);

    var U_A_O = (0,_animation_mount_normalize_animation_object_properties__WEBPACK_IMPORTED_MODULE_2__.default)(animation);
    Object.assign(this, (0,_animation_constructor__WEBPACK_IMPORTED_MODULE_4__.default)(U_A_O, creator));
    (0,_push_performer_again_to_the_creator__WEBPACK_IMPORTED_MODULE_15__.default)(this);
    return this;
  }

  _createClass(AnimationWS, [{
    key: "load",
    value: function load() {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (!animationAuxiliaryObject) {
        (0,_animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__.default)(this, function (aAuxiliaryObject) {
          var a = aAuxiliaryObject;

          if (a.dataLoadingState === 'load' && a.animation.state !== _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[3]) {
            a.animation.state = _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[5];
          }
        });
      }

      return this;
    }
  }, {
    key: "play",
    value: function play() {
      if (this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0] || this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[5] || this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[6]) {
        (0,_animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__.default)(this, _animation_mount_load_animation__WEBPACK_IMPORTED_MODULE_1__.startAnimationIfItIsLoaded);
      }

      return this;
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
        this.state = _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[3];
        (0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_3__.removeAnimationFromStack)(this.animationId);
      }

      return this;
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[3]) {
        (0,_animation_actions_resume_animation__WEBPACK_IMPORTED_MODULE_9__.default)(this);
      }

      return this;
    }
  }, {
    key: "restart",
    value: function restart() {
      (0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_3__.removeAnimationFromStack)(this.animationId);
      (0,_animation_actions_restart_animation__WEBPACK_IMPORTED_MODULE_10__.default)(this);
      return this;
    }
  }, {
    key: "end",
    value: function end() {
      var _this = this;

      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (this.state !== _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
        if (this.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[6]) {
          var setTimeoutId = setTimeout(function () {
            clearTimeout(setTimeoutId);

            _this.end();
          }, 0);
        }

        return this;
      }

      if (animationAuxiliaryObject) {
        if (typeof this.loop === 'number') {
          this.count = this.loop - 1;
          var animationProgressObject = (0,_animation_engine_get_new_animation_progress__WEBPACK_IMPORTED_MODULE_8__.default)(animationAuxiliaryObject);
          animationAuxiliaryObject.countDriveLoops = animationProgressObject.countDriveLoops;
          this.max = animationProgressObject.maxProgress;
        }

        this.progressValue = this.max;
        (0,_animation_engine_update_animation__WEBPACK_IMPORTED_MODULE_11__.default)(animationAuxiliaryObject);
      }

      return this;
    }
  }, {
    key: "go",
    value: function go(part) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        (0,_iteration_control_methods__WEBPACK_IMPORTED_MODULE_6__.default)(animationAuxiliaryObject.duration, undefined, part, this);
      }

      return this;
    }
  }, {
    key: "back",
    value: function back(part) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        animationAuxiliaryObject.backRunning = true;
        (0,_iteration_control_methods__WEBPACK_IMPORTED_MODULE_6__.default)(animationAuxiliaryObject.duration, undefined, part, this);
      }

      return this;
    }
  }, {
    key: "jump",
    value: function jump(part) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);
      var toProgress = _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME / 1 * Math.min(Math.max(part, 0), 1);

      if (animationAuxiliaryObject) {
        var reverseExecution = animationAuxiliaryObject.reverseExecution;
        var newProgress = reverseExecution ? _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME - toProgress : toProgress;
        this.progressValue = newProgress;
        this.max = newProgress;
        (0,_animation_engine_update_animation__WEBPACK_IMPORTED_MODULE_11__.default)(animationAuxiliaryObject);
      }

      return this;
    }
  }, {
    key: "speed",
    value: function speed(multiply) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        (0,_iteration_control_methods__WEBPACK_IMPORTED_MODULE_6__.default)(animationAuxiliaryObject.duration, (0,_utilities_multiply_value__WEBPACK_IMPORTED_MODULE_7__.default)(this.dur, multiply), 1 / _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME * this.max, this);
      }

      return this;
    }
  }, {
    key: "revert",
    value: function revert(endIteration) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        var lastStartProgress = animationAuxiliaryObject.lastStartProgress || 0;

        if (!endIteration) {
          animationAuxiliaryObject.backRunning = true;
        }

        (0,_iteration_control_methods__WEBPACK_IMPORTED_MODULE_6__.default)(animationAuxiliaryObject.duration, undefined, 1 / _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_KEYFRAME * lastStartProgress, this);
      }

      return this;
    }
  }, {
    key: "dirTo",
    value: function dirTo(dir) {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        var direction;

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
        (0,_animation_engine_update_animation__WEBPACK_IMPORTED_MODULE_11__.default)(animationAuxiliaryObject);
      }

      return this;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_13__.getAnimationAuxiliaryObject)(this.animationId);

      if (animationAuxiliaryObject) {
        var removeChanges = this.removeChanges;
        (0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_3__.removeAnimationFromStack)(this.animationId);
        this.removeChanges = true;
        (0,_animation_engine_remove_animation_style__WEBPACK_IMPORTED_MODULE_14__.default)(animationAuxiliaryObject);
        this.removeChanges = removeChanges;
        (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.LISTENERS_NAMES[4], this);
      }

      this.state = _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[7];
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy(removeChanges) {
      if (removeChanges) {
        this.removeChanges = true;
      }

      (0,_animation_engine_mount_animations_stack__WEBPACK_IMPORTED_MODULE_3__.removeAnimationFromStack)(this.animationId);
      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.propagateAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.LISTENERS_NAMES[5], this);
      (0,_animation_actions_destroy_animation__WEBPACK_IMPORTED_MODULE_12__.default)(this);
      /**
       * Important ! Set the property state to avoid side effects of timeouts.
       */

      this.state = _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[4];
      return true;
    }
  }, {
    key: "on",
    value: function on(eventName, callbackfn) {
      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.addAnimationEventListener)(eventName, callbackfn, this);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, callbackfnUsed) {
      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_5__.removeAnimationEventListener)(eventName, callbackfnUsed, this);
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }

      (0,_animation_actions_remove_from_animation__WEBPACK_IMPORTED_MODULE_16__.removePropertyFromAnimation)(names, this);
      return this;
    }
  }, {
    key: "removeTarget",
    value: function removeTarget(targets) {
      (0,_animation_actions_remove_from_animation__WEBPACK_IMPORTED_MODULE_16__.removeTargetFromAnimation)(targets, this);
      return this;
    }
  }]);

  return AnimationWS;
}();

/* harmony default export */ __webpack_exports__["default"] = (AnimationWS);

/***/ }),

/***/ "./src/sauce/apply-callback-for-future-animations.ts":
/*!***********************************************************!*\
  !*** ./src/sauce/apply-callback-for-future-animations.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ applyCallbackForFutureAnimations; }
/* harmony export */ });
/* harmony import */ var _organize_animation_creations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./organize-animation-creations */ "./src/sauce/organize-animation-creations.ts");

function applyCallbackForFutureAnimations(performer, callback) {
  var animationSketches = (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_0__.getCurrentAnimationSketches)(performer);

  if (animationSketches) {
    (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_0__.runCallbacksAfterBuildingAnimations)(function () {
      performer.$hidden.animationInstances.forEach(function (animation) {
        if (animation.originalAnimationOptions && animationSketches.indexOf(animation.originalAnimationOptions) > -1) {
          callback(animation);
        }
      });
    }, performer);
  }
}

/***/ }),

/***/ "./src/sauce/constants.ts":
/*!********************************!*\
  !*** ./src/sauce/constants.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANIMATION_STATES": function() { return /* binding */ ANIMATION_STATES; },
/* harmony export */   "ANIMATION_DIRECTIONS": function() { return /* binding */ ANIMATION_DIRECTIONS; },
/* harmony export */   "WIDE_SMILE_VERSION": function() { return /* binding */ WIDE_SMILE_VERSION; },
/* harmony export */   "CSS_VENDORS": function() { return /* binding */ CSS_VENDORS; },
/* harmony export */   "CSS_VENDORS_LENGTH": function() { return /* binding */ CSS_VENDORS_LENGTH; },
/* harmony export */   "MAX_KEYFRAME": function() { return /* binding */ MAX_KEYFRAME; },
/* harmony export */   "INTERCALATION_TIME": function() { return /* binding */ INTERCALATION_TIME; },
/* harmony export */   "BEST_FPS_TIMEOUT": function() { return /* binding */ BEST_FPS_TIMEOUT; },
/* harmony export */   "TIME_OUT_FOR_SMART_LOADING": function() { return /* binding */ TIME_OUT_FOR_SMART_LOADING; },
/* harmony export */   "WIDE_SMILE_SCROLL_PROPERTIES": function() { return /* binding */ WIDE_SMILE_SCROLL_PROPERTIES; },
/* harmony export */   "WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS": function() { return /* binding */ WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS; }
/* harmony export */ });
var ANIMATION_STATES = ['waiting', 'running', 'completed', 'paused', 'destroyed', 'loaded', 'loading', 'canceled'];
var ANIMATION_DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse', 'random-keys', 'random-offset', 'fluid-random-keys', 'fluid-random-offset'];
var WIDE_SMILE_VERSION = '0.1.0';
var CSS_VENDORS = ['moz', 'ms', 'o', 'webkit'];
var CSS_VENDORS_LENGTH = CSS_VENDORS.length;
var MAX_KEYFRAME = 100;
/**
 * Defines the time taken for each animation intercalation.
 */

var INTERCALATION_TIME = 18;
var BEST_FPS_TIMEOUT = 13;
var TIME_OUT_FOR_SMART_LOADING = 50;
var WIDE_SMILE_SCROLL_PROPERTIES = ['scrollLeft', 'scrollTop'];
/**
 * Initial values of the transformation functions.
 */

var WIDE_SMILE_CSS_TRANSFORM_FUNCTIONS = {
  matrix: '1, 0, 0, 1, 0, 0',
  matrix3d: '1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1',
  perspective: '0',
  rotate: '0',
  rotate3d: '0, 0, 0, 0',
  rotateX: '0',
  rotateY: '0',
  rotateZ: '0',
  translate: '0, 0',
  translate3d: '0, 0, 0',
  translateX: '0',
  translateY: '0',
  translateZ: '0',
  scale: '1, 1',
  scale3d: '1, 1, 1',
  scaleX: '1',
  scaleY: '1',
  scaleZ: '1',
  skew: '0, 0',
  skewX: '0',
  skewY: '0'
};

/***/ }),

/***/ "./src/sauce/create-animation-objects-from-staggers.ts":
/*!*************************************************************!*\
  !*** ./src/sauce/create-animation-objects-from-staggers.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createAnimationObjectsFromStaggers; }
/* harmony export */ });
/* harmony import */ var _animation_mount_parser_string_stagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/parser-string-stagger */ "./src/animation-mount/parser-string-stagger.ts");
/* harmony import */ var _based_implementations_stagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../based-implementations/stagger */ "./src/based-implementations/stagger.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function createAnimationObjectsFromStaggers(animationOptions) {
  var animationPropertiesObjects = [];

  if (animationOptions.targets) {
    animationOptions.targets.forEach(function (targetObject) {
      var target = targetObject.target,
          index = targetObject.index,
          originalArrayLength = targetObject.originalArrayLength;
      var newAnimationProperties = {};
      var checkCreateNewObject = false;
      ['delay', 'drive', 'endDelay', 'dur', 'loop'].forEach(function (propertyName) {
        var fn = animationOptions[propertyName];

        if (typeof fn === 'string') {
          var c = (0,_animation_mount_parser_string_stagger__WEBPACK_IMPORTED_MODULE_0__.default)(fn);

          if (_typeof(c) === 'object') {
            fn = (0,_based_implementations_stagger__WEBPACK_IMPORTED_MODULE_1__.default)(c);
          }
        }

        if (typeof fn === 'function') {
          newAnimationProperties[propertyName] = fn(target, index, originalArrayLength);
          checkCreateNewObject = true;
        }
      });

      if (checkCreateNewObject) {
        animationPropertiesObjects.push(_objectSpread(_objectSpread(_objectSpread({}, animationOptions), newAnimationProperties), {}, {
          targets: [targetObject]
        }));
      }
    });
  }

  if (!animationPropertiesObjects[0]) {
    return false;
  }

  return animationPropertiesObjects;
}

/***/ }),

/***/ "./src/sauce/create-animation-properties-object.ts":
/*!*********************************************************!*\
  !*** ./src/sauce/create-animation-properties-object.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANIMATION_PERFORMER_PROPERTIES": function() { return /* binding */ ANIMATION_PERFORMER_PROPERTIES; },
/* harmony export */   "default": function() { return /* binding */ createAnimationPropertiesObject; }
/* harmony export */ });
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _animation_mount_is_dir_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-mount/is-dir-value */ "./src/animation-mount/is-dir-value.ts");
/* harmony import */ var _defaults_animation_properties_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults-animation-properties-values */ "./src/sauce/defaults-animation-properties-values.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

var ANIMATION_PERFORMER_PROPERTIES = ['dir', 'loop', 'dur', 'easing', 'delay', 'endDelay', 'drive', 'autoDestroy', 'autoPlay', 'pauseDocHidden', 'round', 'progress', 'reset', 'skip'];

function parametersToAnimateShortcuts(v) {
  var obj = {};

  switch (_typeof(v)) {
    case 'string':
      if ((0,_animation_mount_is_dir_value__WEBPACK_IMPORTED_MODULE_1__.default)(v)) {
        obj.dir = v;
      } else {
        obj.easing = v;
      }

      break;

    case 'function':
      obj.easing = v;
      break;

    case 'number':
      obj.dur = v;
      break;

    case 'boolean':
      obj.autoDestroy = v;
      break;

    default:
      break;
  }

  return obj;
}

function createAnimationPropertiesObject(animationPerformer, animate, parametersToAnimateOrPropertyValue, parametersToAnimateOrDurOrAutoDestroy) {
  var parametersToAnimationProperties = parametersToAnimateOrPropertyValue;
  var propertiesToBeAnimate;

  if (typeof animate === 'string' || typeof animate === 'number') {
    parametersToAnimationProperties = _typeof(parametersToAnimateOrDurOrAutoDestroy) === 'object' ? parametersToAnimateOrDurOrAutoDestroy : parametersToAnimateShortcuts(parametersToAnimateOrDurOrAutoDestroy);

    propertiesToBeAnimate = function () {
      var o = {};
      o[animate] = parametersToAnimateOrPropertyValue;
      return o;
    }();
  } else {
    parametersToAnimationProperties = _typeof(parametersToAnimationProperties) === 'object' ? parametersToAnimationProperties : parametersToAnimateShortcuts(parametersToAnimateOrPropertyValue);
    propertiesToBeAnimate = animate;
  }

  var targets = parametersToAnimationProperties.targets || animationPerformer.$hidden.targets;
  var length = targets.length;
  var t = targets.map(function (target, i) {
    return {
      originalArrayLength: length,
      target: target,
      index: i
    };
  });

  var animationProperties = _objectSpread(_objectSpread({
    keyframes: propertiesToBeAnimate
  }, parametersToAnimationProperties), {}, {
    targets: t,
    performer: animationPerformer
  });

  ANIMATION_PERFORMER_PROPERTIES.forEach(function (propertyName) {
    if (!(0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_0__.default)(animationProperties, propertyName)) {
      animationProperties[propertyName] = animationPerformer.$hidden[propertyName];
    }
  });

  if (animationProperties.drive && animationProperties.drive !== 'normal' && animationProperties.loop === _defaults_animation_properties_values__WEBPACK_IMPORTED_MODULE_2__.default.loop) {
    if (Array.isArray(animationProperties.drive)) {
      var l = animationProperties.drive.length;

      if (typeof animationProperties.drive[l - 1] === 'string') {
        animationProperties.loop = true;
      } else {
        animationProperties.loop = l;
      }
    } else {
      animationProperties.loop = true;
    }
  }

  if (animationProperties.dir && animationProperties.loop === _defaults_animation_properties_values__WEBPACK_IMPORTED_MODULE_2__.default.loop) {
    if (animationProperties.dir.indexOf('alternate') > -1) {
      animationProperties.loop = 2;
    }
  }

  return animationProperties;
}

/***/ }),

/***/ "./src/sauce/creators-fns-methods.ts":
/*!*******************************************!*\
  !*** ./src/sauce/creators-fns-methods.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var CREATORS_FN_METHODS = {
  play: function play() {
    this.performers.forEach(function (i) {
      i.play();
    });
    return this;
  },
  load: function load() {
    this.performers.forEach(function (i) {
      i.load();
    });
    return this;
  },
  ready: function ready() {
    this.performers.forEach(function (i) {
      i.ready();
    });
    return this;
  },
  pause: function pause() {
    this.performers.forEach(function (i) {
      i.pause();
    });
    return this;
  },
  resume: function resume() {
    this.performers.forEach(function (i) {
      i.resume();
    });
    return this;
  },
  restart: function restart() {
    this.performers.forEach(function (i) {
      i.restart();
    });
    return this;
  },
  end: function end() {
    this.performers.forEach(function (i) {
      i.end();
    });
    return this;
  },
  go: function go(part) {
    this.performers.forEach(function (i) {
      i.go(part);
    });
    return this;
  },
  back: function back(part) {
    this.performers.forEach(function (i) {
      i.back(part);
    });
    return this;
  },
  jump: function jump(part) {
    this.performers.forEach(function (i) {
      i.jump(part);
    });
    return this;
  },
  revert: function revert(endIteration) {
    this.performers.forEach(function (i) {
      i.revert(endIteration);
    });
    return this;
  },
  speed: function speed(multiply) {
    this.performers.forEach(function (i) {
      i.speed(multiply);
    });
    return this;
  },
  dirTo: function dirTo(dir) {
    this.performers.forEach(function (i) {
      i.dirTo(dir);
    });
    return this;
  },
  destroy: function destroy() {
    this.performers.forEach(function (i) {
      i.destroy();
    });
    this.performers = [];
    return this;
  },
  cancel: function cancel() {
    this.performers.forEach(function (i) {
      i.cancel();
    });
    return this;
  },
  on: function on(eventName, callbackfn) {
    this.performers.forEach(function (i) {
      i.on(eventName, callbackfn);
    });
    return this;
  },
  off: function off(eventName, callbackfnUsed) {
    this.performers.forEach(function (i) {
      i.off(eventName, callbackfnUsed);
    });
    return this;
  },
  now: function now() {
    this.performers.forEach(function (i) {
      i.now();
    });
    return this;
  },
  set: function set(properties, propertyValue) {
    this.performers.forEach(function (i) {
      i.set(properties, propertyValue);
    });
    return this;
  },
  get: function get(name) {
    var properties = [];
    this.performers.forEach(function (i) {
      var v = i.get(name);

      if (v) {
        properties.push(v);
      }
    });
    return properties;
  },
  remove: function remove() {
    for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    this.performers.forEach(function (i) {
      i.remove.apply(i, _toConsumableArray(names));
    });
    return this;
  },
  removeTarget: function removeTarget(targets) {
    this.performers.forEach(function (i) {
      i.removeTarget(targets);
    });
    return this;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CREATORS_FN_METHODS);

/***/ }),

/***/ "./src/sauce/creators-global-property.ts":
/*!***********************************************!*\
  !*** ./src/sauce/creators-global-property.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
/* harmony import */ var _custom_easings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-easings */ "./src/sauce/custom-easings.ts");
/* harmony import */ var _custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-properties-for-animations */ "./src/sauce/custom-properties-for-animations.ts");
/* harmony import */ var _new_creator_fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./new-creator-fn */ "./src/sauce/new-creator-fn.ts");




var CREATORS_FN_GLOBAL_PROPERTY = {
  new: function _new() {
    var c = (0,_new_creator_fn__WEBPACK_IMPORTED_MODULE_3__.default)(CREATORS_FN_GLOBAL_PROPERTY);
    CREATORS_FN_GLOBAL_PROPERTY.all.push(c);
    return c;
  },
  version: _constants__WEBPACK_IMPORTED_MODULE_0__.WIDE_SMILE_VERSION,
  asyncLoading: false,
  specials: _custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.CUSTOM_SPECIAL_PROPERTIES,
  observeds: _custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.OBSERVER_PROPERTIES,
  all: [],
  newEasing: function newEasing(name, callback) {
    (0,_custom_easings__WEBPACK_IMPORTED_MODULE_1__.registerCustomEasing)(name, callback);
    return this;
  },
  newSpecialProperty: function newSpecialProperty(propertyOrProperties, callbackfn) {
    (0,_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.createCustomProperty)(propertyOrProperties, callbackfn, 'special');
    return this;
  },
  deleteSpecialProperty: function deleteSpecialProperty() {
    for (var _len = arguments.length, propertiesNames = new Array(_len), _key = 0; _key < _len; _key++) {
      propertiesNames[_key] = arguments[_key];
    }

    (0,_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.removeCustomProperty)(propertiesNames, 'special');
    return this;
  },
  newObservedProperty: function newObservedProperty(propertyOrProperties, callbackfn) {
    (0,_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.createCustomProperty)(propertyOrProperties, callbackfn, 'observed');
    return this;
  },
  deleteObservedProperty: function deleteObservedProperty() {
    for (var _len2 = arguments.length, propertiesNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      propertiesNames[_key2] = arguments[_key2];
    }

    (0,_custom_properties_for_animations__WEBPACK_IMPORTED_MODULE_2__.removeCustomProperty)(propertiesNames, 'observed');
    return this;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CREATORS_FN_GLOBAL_PROPERTY);

/***/ }),

/***/ "./src/sauce/custom-easings.ts":
/*!*************************************!*\
  !*** ./src/sauce/custom-easings.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerCustomEasing": function() { return /* binding */ registerCustomEasing; },
/* harmony export */   "getCustomEasing": function() { return /* binding */ getCustomEasing; }
/* harmony export */ });
var CUSTOM_EASINGS = {};
function registerCustomEasing(name, callback) {
  CUSTOM_EASINGS[name] = callback;
}
function getCustomEasing(name) {
  return CUSTOM_EASINGS[name];
}

/***/ }),

/***/ "./src/sauce/custom-properties-for-animations.ts":
/*!*******************************************************!*\
  !*** ./src/sauce/custom-properties-for-animations.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CUSTOM_SPECIAL_PROPERTIES": function() { return /* binding */ CUSTOM_SPECIAL_PROPERTIES; },
/* harmony export */   "OBSERVER_PROPERTIES": function() { return /* binding */ OBSERVER_PROPERTIES; },
/* harmony export */   "createCustomProperty": function() { return /* binding */ createCustomProperty; },
/* harmony export */   "removeCustomProperty": function() { return /* binding */ removeCustomProperty; },
/* harmony export */   "getCustomProperty": function() { return /* binding */ getCustomProperty; }
/* harmony export */ });
/* harmony import */ var _wide_smile_debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wide-smile-debug */ "./src/sauce/wide-smile-debug.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/has-own-property */ "./src/utilities/has-own-property.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var CUSTOM_SPECIAL_PROPERTIES = {};
var OBSERVER_PROPERTIES = {};

function getObject(type) {
  switch (type) {
    case 'observed':
      return OBSERVER_PROPERTIES;

    default:
      return CUSTOM_SPECIAL_PROPERTIES;
  }
}

function createCustomProperty(propertyOrProperties, callbackfn, type) {
  var object = getObject(type);

  var debugHelper = function () {
    if (typeof propertyOrProperties === 'string' && (0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__.default)(object, propertyOrProperties)) {
      return propertyOrProperties;
    }

    var p = '';
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_1__.default)(propertyOrProperties, function (_propertyValue, propertyName) {
      if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__.default)(object, propertyName)) {
        p = propertyName;
        return true;
      }

      return false;
    });
    return p;
  }();

  (0,_wide_smile_debug__WEBPACK_IMPORTED_MODULE_0__.default)('createProperty Method', "There's already a property with that name \"".concat(debugHelper, "\" on it."), function () {
    return !!debugHelper;
  });

  if (_typeof(propertyOrProperties) === 'object') {
    Object.assign(object, propertyOrProperties);
  } else {
    object[propertyOrProperties] = callbackfn;
  }
}
function removeCustomProperty(names, type) {
  var object = getObject(type);
  names.forEach(function (name) {
    delete object[name];
  });
}
function getCustomProperty(name, type) {
  var object = getObject(type);

  if ((0,_utilities_has_own_property__WEBPACK_IMPORTED_MODULE_2__.default)(object, name)) {
    return object[name];
  }

  return false;
}

/***/ }),

/***/ "./src/sauce/defaults-animation-properties-values.ts":
/*!***********************************************************!*\
  !*** ./src/sauce/defaults-animation-properties-values.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");

var DEFAULTS_ANIMATION_PROPERTIES_VALUES = {
  targets: undefined,
  dir: 'normal',
  loop: 1,
  dur: 1,
  easing: 'linear',
  progressValue: undefined,
  progress: undefined,
  delay: -1,
  endDelay: -1,
  state: _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0],
  drive: 'normal',
  autoDestroy: false,
  autoPlay: true,
  removeChanges: false,
  pauseDocHidden: true,
  round: 0,
  reset: false
};
/* harmony default export */ __webpack_exports__["default"] = (DEFAULTS_ANIMATION_PROPERTIES_VALUES);

/***/ }),

/***/ "./src/sauce/fns-to-create-animations.ts":
/*!***********************************************!*\
  !*** ./src/sauce/fns-to-create-animations.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createIndependentAnimations": function() { return /* binding */ createIndependentAnimations; },
/* harmony export */   "createDependentAnimations": function() { return /* binding */ createDependentAnimations; },
/* harmony export */   "addFinalKeyframeInTheAnimation": function() { return /* binding */ addFinalKeyframeInTheAnimation; }
/* harmony export */ });
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./organize-animation-creations */ "./src/sauce/organize-animation-creations.ts");
/* harmony import */ var _wide_smile_debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wide-smile-debug */ "./src/sauce/wide-smile-debug.ts");
/* harmony import */ var _create_animation_properties_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-animation-properties-object */ "./src/sauce/create-animation-properties-object.ts");
/* harmony import */ var _last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./last-added-animation-object */ "./src/sauce/last-added-animation-object.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

var createIndependentAnimations = function a(animate, parametersToAnimateOrPropertyValue, parametersToAnimate) {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;
  var animationProperties = (0,_create_animation_properties_object__WEBPACK_IMPORTED_MODULE_3__.default)(this, animate, parametersToAnimateOrPropertyValue, parametersToAnimate);
  (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.addLastAnimationObjectAddedToPerformer)(this, animationProperties);
  (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(this, animationProperties);
  return this;
};
var createDependentAnimations = function a(animate, parametersToAnimateOrPropertyValue, parametersToAnimate) {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;
  var animationProperties = (0,_create_animation_properties_object__WEBPACK_IMPORTED_MODULE_3__.default)(this, animate, parametersToAnimateOrPropertyValue, parametersToAnimate);
  var lastAnimationObjectAdded = (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.getLastAnimationObjectAddedToPerformer)(this);
  (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.addLastAnimationObjectAddedToPerformer)(this, animationProperties);

  if (lastAnimationObjectAdded) {
    (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(this, animationProperties, lastAnimationObjectAdded, 'afterAnimation');
  } else {
    var lastAnimationCreated = this.$hidden.animationInstances[this.$hidden.animationInstances.length - 1];

    if (lastAnimationCreated) {
      (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(this, animationProperties, lastAnimationCreated, 'afterAnimation');
    } else {
      (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(this, animationProperties);
    }
  }

  return this;
};
function addFinalKeyframeInTheAnimation(animate, parametersToAnimateOrPropertyValue, parametersToAnimateOrDurOrAutoDestroy) {
  /* important!, removes the numeric value stored in the property. */
  this.$hidden.currentAfterIterations = undefined;
  var objectExpectingSideEffects = (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.getLastAnimationObjectAddedToPerformer)(this);

  if (objectExpectingSideEffects) {
    var lastAnimationObjectAdded = objectExpectingSideEffects;
    var initialKeyframe = false;
    var animateProps = animate;

    if (_typeof(animate) !== 'object' && parametersToAnimateOrPropertyValue === undefined) {
      animateProps = [animateProps];
    }

    if (Array.isArray(animateProps)) {
      initialKeyframe = {};
      var count = 0;
      (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(lastAnimationObjectAdded.keyframes, function (_propertyValue, propertyName) {
        var array = animateProps;
        var v = array[count];
        initialKeyframe[propertyName] = v;

        if (typeof array[count + 1] !== 'undefined') {
          count += 1;
        }
      });
    }

    var animationProperties = (0,_create_animation_properties_object__WEBPACK_IMPORTED_MODULE_3__.default)(this, initialKeyframe || animateProps, parametersToAnimateOrPropertyValue, parametersToAnimateOrDurOrAutoDestroy);
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_0__.default)(animationProperties, function (propertyValue, propertyName) {
      var v = propertyValue;

      if (propertyName === 'keyframes') {
        lastAnimationObjectAdded.keyframes = [lastAnimationObjectAdded.keyframes, v];
      } else {
        lastAnimationObjectAdded[propertyName] = v;
      }
    });
  } else {
    (0,_wide_smile_debug__WEBPACK_IMPORTED_MODULE_2__.default)('Call at an improper moment.', 'To use the "to" method you should call it right after the animation call to which it will be applied.');
  }

  return this;
}

/***/ }),

/***/ "./src/sauce/get-performer-animations-running.ts":
/*!*******************************************************!*\
  !*** ./src/sauce/get-performer-animations-running.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAnimationsRunning; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function getAnimationsRunning(performerFn) {
  var $hidden = performerFn.$hidden;
  var animations = $hidden.animationInstances;

  if ($hidden.cycleOptions) {
    return [].concat(_toConsumableArray($hidden.cycleOptions.animationInstancesInCycle.filter(function (a) {
      return a.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1];
    })), _toConsumableArray(animations.filter(function (a) {
      return !a.isInCycle;
    })));
  }

  return animations;
}

/***/ }),

/***/ "./src/sauce/get-property-name.ts":
/*!****************************************!*\
  !*** ./src/sauce/get-property-name.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getPropertyName; }
/* harmony export */ });
function getPropertyName(performer, name) {
  var n = parseFloat(name.toString());

  if (performer.$hidden.orderOfThePropertiesUsed[n]) {
    return performer.$hidden.orderOfThePropertiesUsed[n];
  }

  return name.toString();
}

/***/ }),

/***/ "./src/sauce/iteration-control-methods.ts":
/*!************************************************!*\
  !*** ./src/sauce/iteration-control-methods.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ iterationControlMethods; }
/* harmony export */ });
/* harmony import */ var _animation_actions_progress_animation_go_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-actions/progress-animation-go-to */ "./src/animation-actions/progress-animation-go-to.ts");
/* harmony import */ var _animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-listeners/animations-listeners-handlers */ "./src/animation-listeners/animations-listeners-handlers.ts");
/* harmony import */ var _animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-mount/crud-animation-objects */ "./src/animation-mount/crud-animation-objects.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");




function iterationControlMethods(realDuration, newDuration, part, animation, applyDelay) {
  var aInstance = animation;
  var animationAuxiliaryObject = (0,_animation_mount_crud_animation_objects__WEBPACK_IMPORTED_MODULE_2__.getAnimationAuxiliaryObject)(aInstance.animationId);
  var toProgress = _constants__WEBPACK_IMPORTED_MODULE_3__.MAX_KEYFRAME / 1 * Math.min(Math.max(part, 0), 1);

  if (animationAuxiliaryObject) {
    var dur = newDuration;
    var checkDur = typeof dur === 'number';
    var offset = Math.abs(aInstance.progressValue - toProgress);

    if (checkDur && dur > 0) {
      var c = 100 / offset;
      dur *= c + c / 100 * (100 / (100 - offset) - 1);
    }

    (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__.addAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__.LISTENERS_NAMES[7], function a() {
      if (dur === animation.dur) {
        aInstance.dur = realDuration;
      }

      (0,_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__.removeAnimationEventListener)(_animation_listeners_animations_listeners_handlers__WEBPACK_IMPORTED_MODULE_1__.LISTENERS_NAMES[7], a, animation);
    }, animation);

    if (checkDur && dur <= 0) {
      aInstance.jump(toProgress);
    } else {
      if (checkDur) {
        aInstance.dur = dur;
      }

      (0,_animation_actions_progress_animation_go_to__WEBPACK_IMPORTED_MODULE_0__.default)(aInstance.animationId, toProgress, applyDelay);
    }
  }
}

/***/ }),

/***/ "./src/sauce/last-added-animation-object.ts":
/*!**************************************************!*\
  !*** ./src/sauce/last-added-animation-object.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetArrayOfLastAddedAnimationObjects": function() { return /* binding */ resetArrayOfLastAddedAnimationObjects; },
/* harmony export */   "removeLastAnimationObjectAddedToPerformer": function() { return /* binding */ removeLastAnimationObjectAddedToPerformer; },
/* harmony export */   "addLastAnimationObjectAddedToPerformer": function() { return /* binding */ addLastAnimationObjectAddedToPerformer; },
/* harmony export */   "getLastAnimationObjectAddedToPerformer": function() { return /* binding */ getLastAnimationObjectAddedToPerformer; }
/* harmony export */ });
var LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS = [];

function getIndex(animationPerformer) {
  for (var index = 0, l = LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.length; index < l; index += 1) {
    if (LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS[index][0] === animationPerformer) {
      return index;
    }
  }

  return -1;
}

function resetArrayOfLastAddedAnimationObjects() {
  LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.length = 0;
}
function removeLastAnimationObjectAddedToPerformer(animationPerformer) {
  var index = getIndex(animationPerformer);

  if (index > -1) {
    LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.splice(index, 1);
  }
}
function addLastAnimationObjectAddedToPerformer(animationPerformer, animationObject) {
  LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS.unshift([animationPerformer, animationObject]);
}
function getLastAnimationObjectAddedToPerformer(animationPerformer) {
  var index = getIndex(animationPerformer);
  return index > -1 ? LAST_ANIMATION_OBJECTS_ADDED_TO_PERFORMERS[index][1] : undefined;
}

/***/ }),

/***/ "./src/sauce/logic-to-play-animations.ts":
/*!***********************************************!*\
  !*** ./src/sauce/logic-to-play-animations.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playAnimationsTogether": function() { return /* binding */ playAnimationsTogether; },
/* harmony export */   "playAnimationsAfterIterations": function() { return /* binding */ playAnimationsAfterIterations; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
/* harmony import */ var _animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation-engine/organize-the-execution-of-cycle-animations */ "./src/animation-engine/organize-the-execution-of-cycle-animations.ts");



function runTogetherAnimations(animationToLink, playTogether) {
  var performerFn = animationToLink.performer;
  animationToLink.on('ready', function g() {
    playTogether.forEach(function (a) {
      (0,_animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_1__.default)(performerFn, a, animationToLink, 'together');
      a.play();
    });
    animationToLink.off('ready', g);
  });

  if (animationToLink.autoPlay) {
    animationToLink.play();
  }
}

function playAnimationsTogether(animationToLink, playTogether) {
  if (!playTogether) {
    return;
  }

  var performerFn = animationToLink.performer;
  var length = playTogether.length;
  var countLoadedAnimations = 0;

  if (animationToLink.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0]) {
    animationToLink.on('load', function f() {
      playTogether.forEach(function (animation) {
        animation.on('load', function d() {
          countLoadedAnimations += 1;

          if (countLoadedAnimations >= length) {
            runTogetherAnimations(animationToLink, playTogether);
          }

          animation.off('load', d);
        });
        animation.load();
      });
      animationToLink.off('load', f);
    });

    if (animationToLink.autoPlay) {
      animationToLink.load();
    }
  } else {
    animationToLink.on('ready', function g() {
      playTogether.forEach(function (animation) {
        (0,_animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_1__.default)(performerFn, animation, animationToLink, 'together');
        animation.play();
      });
      animationToLink.off('ready', g);
    });

    if (animationToLink.autoPlay) {
      animationToLink.play();
    }
  }
}
function playAnimationsAfterIterations(animationToLink, playAfterIterations) {
  if (!playAfterIterations) {
    return;
  }

  var performerFn = animationToLink.performer;
  var amountOfIterations = playAfterIterations.amountOfIterations;
  playAfterIterations.animations.forEach(function (a) {
    var animation = a;
    var countCompletedIterations = 1;
    animationToLink.on('loopEnd', function f() {
      if (countCompletedIterations >= amountOfIterations) {
        animationToLink.off('loopEnd', f);

        if (performerFn.$hidden.cycleOptions) {
          (0,_animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_1__.default)(performerFn, animation, animationToLink, 'together');
          animation.play();
        } else {
          animation.play();
        }
      }

      countCompletedIterations += 1;
    });
  });
}

/***/ }),

/***/ "./src/sauce/manage-memory-collections.ts":
/*!************************************************!*\
  !*** ./src/sauce/manage-memory-collections.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendToGarbageCollector": function() { return /* binding */ sendToGarbageCollector; },
/* harmony export */   "releasesGarbageFromAnimations": function() { return /* binding */ releasesGarbageFromAnimations; }
/* harmony export */ });
/* eslint-disable prefer-rest-params */
var REFERENCES_TO_USELESS_OBJECTS = [];
/**
 * Is sent to a memory that is maintained to prevent the garbage collector from occupy thread for long periods.
 */

function sendToGarbageCollector() {
  for (var _len = arguments.length, u = new Array(_len), _key = 0; _key < _len; _key++) {
    u[_key] = arguments[_key];
  }

  REFERENCES_TO_USELESS_OBJECTS.push(u);
}
var setTimeoutId;
/**
 * Removes the few elements of the array that keeps references to objects that are no longer in use.
 */

function releasesGarbageFromAnimations() {
  if (REFERENCES_TO_USELESS_OBJECTS.length > 0) {
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(function () {
      releasesGarbageFromAnimations();
    }, 400);
    REFERENCES_TO_USELESS_OBJECTS.splice(0, Math.max(1, Math.floor(REFERENCES_TO_USELESS_OBJECTS.length / 100 * 50)));
  }
}

/***/ }),

/***/ "./src/sauce/new-creator-fn.ts":
/*!*************************************!*\
  !*** ./src/sauce/new-creator-fn.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NewCreatorFn; }
/* harmony export */ });
/* harmony import */ var _animation_mount_is_dir_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/is-dir-value */ "./src/animation-mount/is-dir-value.ts");
/* harmony import */ var _creators_fns_methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creators-fns-methods */ "./src/sauce/creators-fns-methods.ts");
/* harmony import */ var _defaults_animation_properties_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults-animation-properties-values */ "./src/sauce/defaults-animation-properties-values.ts");
/* harmony import */ var _new_performer_fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./new-performer-fn */ "./src/sauce/new-performer-fn.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

function creatorFnProperties(global) {
  return _objectSpread({
    dfs: _objectSpread({}, _defaults_animation_properties_values__WEBPACK_IMPORTED_MODULE_2__.default),
    performers: [],
    global: global
  }, _creators_fns_methods__WEBPACK_IMPORTED_MODULE_1__.default);
}

function pureCreatorFn() {
  var creator = Creator;

  function Creator(performerProperties) {
    if (performerProperties) {
      var performerFn = {
        targets: performerProperties.targets ? performerProperties.targets : performerProperties
      };

      if (performerProperties.targets) {
        Object.assign(performerFn, performerProperties);
      }

      var countNumbers = 0;

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      props.forEach(function (v) {
        switch (_typeof(v)) {
          case 'number':
            if (countNumbers === 0) {
              performerFn.dur = v;
              countNumbers += 1;
            } else {
              performerFn.loop = v;
            }

            break;

          case 'string':
            if ((0,_animation_mount_is_dir_value__WEBPACK_IMPORTED_MODULE_0__.default)(v)) {
              performerFn.dir = v;
            } else {
              performerFn.easing = v;
            }

            break;

          case 'function':
            performerFn.easing = v;
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
      return (0,_new_performer_fn__WEBPACK_IMPORTED_MODULE_3__.default)(performerFn, creator);
    }

    return creator.global;
  }

  return Creator;
}

function NewCreatorFn(global) {
  return Object.assign(pureCreatorFn(), creatorFnProperties(global));
}

/***/ }),

/***/ "./src/sauce/new-performer-fn.ts":
/*!***************************************!*\
  !*** ./src/sauce/new-performer-fn.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation_mount_get_elements_in_the_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation-mount/get-elements-in-the-dom */ "./src/animation-mount/get-elements-in-the-dom.ts");
/* harmony import */ var _organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./organize-animation-creations */ "./src/sauce/organize-animation-creations.ts");
/* harmony import */ var _create_animation_properties_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-animation-properties-object */ "./src/sauce/create-animation-properties-object.ts");
/* harmony import */ var _performer_fns_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./performer-fns-methods */ "./src/sauce/performer-fns-methods.ts");
/* harmony import */ var _last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./last-added-animation-object */ "./src/sauce/last-added-animation-object.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

var COUNT_PERFORMER_ID = 0;

function getNewPerformerFn(creator, animationPerformerProperties) {
  var performerFn = function Performer(animate, parametersToAnimateOrPropertyValue, parametersToAnimate) {
    var animationProperties = (0,_create_animation_properties_object__WEBPACK_IMPORTED_MODULE_2__.default)(performerFn, animate, parametersToAnimateOrPropertyValue, parametersToAnimate);
    var lastAnimationParametersAdded = (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.getLastAnimationObjectAddedToPerformer)(performerFn);
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.addLastAnimationObjectAddedToPerformer)(performerFn, animationProperties);

    if (performerFn.$hidden.currentAfterIterations) {
      (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(performerFn, animationProperties, lastAnimationParametersAdded, 'afterIterations', performerFn.$hidden.currentAfterIterations);
      performerFn.$hidden.currentAfterIterations = undefined;
    } else if (lastAnimationParametersAdded) {
      (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(performerFn, animationProperties, lastAnimationParametersAdded, 'together');
    } else {
      (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_1__.addAnimationObjectToTheConstructionStack)(performerFn, animationProperties);
    }

    return performerFn;
  };

  COUNT_PERFORMER_ID += 1;
  Object.assign(performerFn, _performer_fns_methods__WEBPACK_IMPORTED_MODULE_3__.default, {
    id: COUNT_PERFORMER_ID,
    $hidden: animationPerformerProperties,
    creator: creator
  });
  return performerFn;
}

var NewPerformerFn = function NewPerformerFn(performerProperties, creator) {
  var performerProps = performerProperties;
  var creatorDefaults = creator.dfs;
  var defaults = {
    animationInstances: [],
    independentAnimations: [],
    orderOfThePropertiesUsed: []
  };
  _create_animation_properties_object__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_PERFORMER_PROPERTIES.forEach(function (propertyName) {
    defaults[propertyName] = creatorDefaults[propertyName];
  });

  if (performerProps.targets) {
    performerProps.targets = (0,_animation_mount_get_elements_in_the_dom__WEBPACK_IMPORTED_MODULE_0__.default)(performerProps.targets);
  }

  var performerFn = getNewPerformerFn(creator, _objectSpread(_objectSpread({}, defaults), performerProps));
  creator.performers.push(performerFn);
  return performerFn;
};

/* harmony default export */ __webpack_exports__["default"] = (NewPerformerFn);

/***/ }),

/***/ "./src/sauce/organize-animation-creations.ts":
/*!***************************************************!*\
  !*** ./src/sauce/organize-animation-creations.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildAnimationsForSpecificPerformer": function() { return /* binding */ buildAnimationsForSpecificPerformer; },
/* harmony export */   "getCurrentAnimationSketches": function() { return /* binding */ getCurrentAnimationSketches; },
/* harmony export */   "runCallbacksAfterBuildingAnimations": function() { return /* binding */ runCallbacksAfterBuildingAnimations; },
/* harmony export */   "addAnimationObjectToTheConstructionStack": function() { return /* binding */ addAnimationObjectToTheConstructionStack; }
/* harmony export */ });
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "./src/sauce/animation.ts");
/* harmony import */ var _logic_to_play_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic-to-play-animations */ "./src/sauce/logic-to-play-animations.ts");
/* harmony import */ var _animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-engine/organize-the-execution-of-cycle-animations */ "./src/animation-engine/organize-the-execution-of-cycle-animations.ts");
/* harmony import */ var _create_animation_objects_from_staggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-animation-objects-from-staggers */ "./src/sauce/create-animation-objects-from-staggers.ts");
/* harmony import */ var _last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./last-added-animation-object */ "./src/sauce/last-added-animation-object.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/is-empty-object */ "./src/utilities/is-empty-object.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









/* eslint-disable @typescript-eslint/no-use-before-define  */

var STACK_OF_ANIMATIONS_SKETCHES = {};
var CALLBACKS_CALLED_DURING_STRUCTURING = [];

function pushSketcheInPerformerBucket(performer, sketche) {
  var performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  if (performerBucket) {
    performerBucket.sketches.push(sketche);
  } else {
    STACK_OF_ANIMATIONS_SKETCHES[performer.id] = {
      sketches: [sketche],
      performerFn: performer
    };
  }
}

function buildAnimationsForSpecificPerformer(performer, setProperties) {
  var organizedAnimationInstances = [];
  var performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];
  delete STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  if (performerBucket) {
    if (setProperties) {
      performerBucket.sketches.forEach(function (sketche) {
        Object.assign(sketche.animationOptions, setProperties);
      });
    }

    organizedAnimationInstances = organizedAnimationInstances.concat(organizeAnimationInstances(createAnimationInstances(performer, performerBucket.sketches)));

    if (performerBucket.callbacksCalledDuringStructuring) {
      performerBucket.callbacksCalledDuringStructuring.forEach(function (fn) {
        fn();
      });
    }
  }

  CALLBACKS_CALLED_DURING_STRUCTURING.forEach(function (a) {
    a();
  });

  if (organizedAnimationInstances) {
    applyRulesForTheExecutionOfAnimations(organizedAnimationInstances);
  }
}
function getCurrentAnimationSketches(performer) {
  var performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  if (performerBucket) {
    return performerBucket.sketches.map(function (o) {
      return o.animationOptions;
    });
  }

  return undefined;
}

function addToLinkedAnimationObject(organizedAnimations, animation, linkedAnimation) {
  var l = organizedAnimations.length;

  for (var index = 0; index < l; index += 1) {
    var o = organizedAnimations[index];

    if (linkedAnimation === o.animation) {
      if (o.playTogether) {
        o.playTogether.push(animation);
      } else {
        o.playTogether = [animation];
      }

      return true;
    }

    var i = -1;
    var a = o.playTogether;

    if (a) {
      i = a.indexOf(linkedAnimation);
    }

    if (i > -1 && a) {
      a.splice(i, 0, animation);
      return true;
    }
  }

  return false;
}

function organizeAnimationInstances(animationInstances) {
  var organizedAnimations = [];
  animationInstances.forEach(function (o, _index, array) {
    var linkedAnimation = typeof o.indexOrAnimation === 'number' ? array[o.indexOrAnimation].animation : o.indexOrAnimation;

    if (!linkedAnimation || o.typeOfLink === 'afterAnimation' || o.typeOfLink === 'afterIterations' || linkedAnimation && !addToLinkedAnimationObject(organizedAnimations, o.animation, linkedAnimation)) {
      if (o.typeOfLink === 'afterIterations') {
        organizedAnimations.push({
          typeOfLink: o.typeOfLink,
          linkedAnimation: linkedAnimation,
          animation: o.animation,
          afterIterations: {
            animations: [o.animation],
            amountOfIterations: o.amountOfIterations
          }
        });
      } else {
        organizedAnimations.push({
          typeOfLink: o.typeOfLink,
          linkedAnimation: linkedAnimation,
          animation: o.animation
        });
      }
    }
  });
  return organizedAnimations;
}

function applyRulesForTheExecutionOfAnimations(organizedAnimationInstances) {
  organizedAnimationInstances.forEach(function (o) {
    var animation = o.animation,
        linkedAnimation = o.linkedAnimation,
        typeOfLink = o.typeOfLink,
        playTogether = o.playTogether,
        afterIterations = o.afterIterations;
    var performerFn = animation.performer;

    if (typeOfLink === 'afterIterations' && linkedAnimation) {
      if (playTogether && afterIterations) {
        afterIterations.animations = afterIterations.animations.concat(playTogether);
      }

      (0,_logic_to_play_animations__WEBPACK_IMPORTED_MODULE_1__.playAnimationsAfterIterations)(linkedAnimation, afterIterations);
    } else if (typeOfLink === 'afterAnimation' && linkedAnimation) {
      linkedAnimation.on('end', function f() {
        (0,_animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_2__.default)(performerFn, animation);

        if (playTogether) {
          (0,_logic_to_play_animations__WEBPACK_IMPORTED_MODULE_1__.playAnimationsTogether)(animation, playTogether);
        } else if (animation.autoPlay) {
          animation.play();
        }

        linkedAnimation.off('end', f);
      });
    } else {
      performerFn.$hidden.independentAnimations.push(animation);
      (0,_animation_engine_organize_the_execution_of_cycle_animations__WEBPACK_IMPORTED_MODULE_2__.default)(performerFn, animation);

      if (playTogether) {
        (0,_logic_to_play_animations__WEBPACK_IMPORTED_MODULE_1__.playAnimationsTogether)(animation, playTogether);
      }
    }

    if (!linkedAnimation && (!playTogether || !playTogether[0]) && (!afterIterations || !afterIterations.animations[0])) {
      if (animation.autoPlay && animation.state === _constants__WEBPACK_IMPORTED_MODULE_5__.ANIMATION_STATES[0]) {
        animation.play();
      }
    }
  });
}

function createAnimationInstances(performer, sketches) {
  var s = sketches;
  s.slice().forEach(function (obj, index) {
    var o = obj;
    var fromStaggers = (0,_create_animation_objects_from_staggers__WEBPACK_IMPORTED_MODULE_3__.default)(o.animationOptions);

    if (fromStaggers) {
      fromStaggers.forEach(function (newAnimationOptions, i) {
        var a = newAnimationOptions;

        if (i === 0) {
          o.animationOptions = a;
          s[index] = o;
        } else {
          s.push({
            indexOrAnimation: index,
            typeOfLink: 'together',
            animationOptions: a,
            originalAnimationOptions: o.animationOptions
          });
        }
      });
    }
  });
  var animationInstances = s.map(function (o) {
    var creator = performer.creator;
    var animation = new _animation__WEBPACK_IMPORTED_MODULE_0__.default(o.animationOptions, creator);
    animation.originalAnimationOptions = o.originalAnimationOptions ? o.originalAnimationOptions : o.animationOptions;
    performer.$hidden.animationInstances.push(animation);
    return _objectSpread(_objectSpread({}, o), {}, {
      animation: animation
    });
  });
  return animationInstances;
}

function buildAnimations() {
  var organizedAnimationInstances = [];

  if (!(0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_7__.default)(STACK_OF_ANIMATIONS_SKETCHES)) {
    (0,_utilities_custom_for_in__WEBPACK_IMPORTED_MODULE_6__.default)(STACK_OF_ANIMATIONS_SKETCHES, function (bucket) {
      organizedAnimationInstances = organizedAnimationInstances.concat(organizeAnimationInstances(createAnimationInstances(bucket.performerFn, bucket.sketches)));

      if (bucket.callbacksCalledDuringStructuring) {
        bucket.callbacksCalledDuringStructuring.forEach(function (fn) {
          fn();
        });
      }
    });
  }

  return organizedAnimationInstances;
}

var runCallbacksAfterBuildingAnimations = function () {
  var alreadyInProcess = false;
  return function (callbackfn, performer) {
    if (!performer) {
      CALLBACKS_CALLED_DURING_STRUCTURING.push(callbackfn);
    } else {
      var performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];

      if (performerBucket) {
        if (!performerBucket.callbacksCalledDuringStructuring) {
          performerBucket.callbacksCalledDuringStructuring = [];
        }

        performerBucket.callbacksCalledDuringStructuring.push(callbackfn);
      }
    }

    if (!alreadyInProcess) {
      var setTimeoutId = setTimeout(function () {
        var organizedAnimationInstances = buildAnimations();
        CALLBACKS_CALLED_DURING_STRUCTURING.forEach(function (a) {
          a();
        });

        if (organizedAnimationInstances) {
          applyRulesForTheExecutionOfAnimations(organizedAnimationInstances);
        }

        CALLBACKS_CALLED_DURING_STRUCTURING.length = 0;
        alreadyInProcess = false;
        clearTimeout(setTimeoutId);
      }, 0);
      alreadyInProcess = true;
    }
  };
}();

function fireTimeout() {
  if ((0,_utilities_is_empty_object__WEBPACK_IMPORTED_MODULE_7__.default)(STACK_OF_ANIMATIONS_SKETCHES)) {
    runCallbacksAfterBuildingAnimations(function () {
      STACK_OF_ANIMATIONS_SKETCHES = {};
      (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_4__.resetArrayOfLastAddedAnimationObjects)();
    });
  }
}

function getlinkedAnimationIndex(performer, linkedAnimation) {
  var performerBucket = STACK_OF_ANIMATIONS_SKETCHES[performer.id];

  if (performerBucket) {
    return performerBucket.sketches.findIndex(function (o) {
      return o.animationOptions === linkedAnimation;
    });
  }

  return undefined;
}

function addAnimationObjectToTheConstructionStack(performerFn, animationOptions, linkedAnimation, typeOfLink, amountOfIterations) {
  if (performerFn.$hidden.ignorePerformer) {
    performerFn.$hidden.animationInstances.push(new _animation__WEBPACK_IMPORTED_MODULE_0__.default(animationOptions, performerFn.creator));
    return;
  }

  fireTimeout();
  var aOptions = animationOptions;
  var lAnimation = linkedAnimation;

  if (performerFn.$hidden.cycleOptions) {
    aOptions.isInCycle = true;

    if (lAnimation && !lAnimation.isInCycle) {
      /**
       * Do not allow link  with out-of-cycle animations.
       */
      lAnimation = undefined;
    }
  }

  if (lAnimation) {
    var indexOrAnimation = lAnimation.play ? lAnimation : getlinkedAnimationIndex(performerFn, lAnimation);

    if (indexOrAnimation !== null) {
      pushSketcheInPerformerBucket(performerFn, {
        indexOrAnimation: indexOrAnimation,
        typeOfLink: typeOfLink,
        amountOfIterations: amountOfIterations,
        animationOptions: animationOptions
      });
      return;
    }
  }

  pushSketcheInPerformerBucket(performerFn, {
    animationOptions: animationOptions
  });
}

/***/ }),

/***/ "./src/sauce/performer-fns-methods.ts":
/*!********************************************!*\
  !*** ./src/sauce/performer-fns-methods.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/sauce/constants.ts");
/* harmony import */ var _get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-performer-animations-running */ "./src/sauce/get-performer-animations-running.ts");
/* harmony import */ var _animation_listeners_amount_of_animations_interested_in_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation-listeners/amount-of-animations-interested-in-event */ "./src/animation-listeners/amount-of-animations-interested-in-event.ts");
/* harmony import */ var _utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/handle-string */ "./src/utilities/handle-string.ts");
/* harmony import */ var _fns_to_create_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fns-to-create-animations */ "./src/sauce/fns-to-create-animations.ts");
/* harmony import */ var _apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./apply-callback-for-future-animations */ "./src/sauce/apply-callback-for-future-animations.ts");
/* harmony import */ var _last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./last-added-animation-object */ "./src/sauce/last-added-animation-object.ts");
/* harmony import */ var _organize_animation_creations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./organize-animation-creations */ "./src/sauce/organize-animation-creations.ts");
/* harmony import */ var _animation_actions_get_current_properties_value__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../animation-actions/get-current-properties-value */ "./src/animation-actions/get-current-properties-value.ts");
/* harmony import */ var _get_property_name__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./get-property-name */ "./src/sauce/get-property-name.ts");
/* harmony import */ var _animation_actions_set_property_value__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../animation-actions/set-property-value */ "./src/animation-actions/set-property-value.ts");
/* harmony import */ var _animation_actions_load_animations_and_play_when_ready__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../animation-actions/load-animations-and-play-when-ready */ "./src/animation-actions/load-animations-and-play-when-ready.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }













/* eslint-disable @typescript-eslint/no-this-alias  */

function playAnimations(animationPerformer) {
  animationPerformer.$hidden.animationInstances.forEach(function (animation) {
    var i = animation;

    if (i.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0] || i.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[5]) {
      if (animationPerformer.$hidden.independentAnimations && animationPerformer.$hidden.independentAnimations.indexOf(i) > -1) {
        i.play();
      } else {
        i.autoPlay = true;
      }
    }
  });
}

function applyWhenTheAnimationIsRunning(animation, callback) {
  if (animation.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[1]) {
    callback();
  } else {
    animation.on('loopStart', function fn() {
      callback();
      animation.off('loopStart', fn);
    });
  }
}

var PERFORMER_FNS_METHODS = {
  $: _fns_to_create_animations__WEBPACK_IMPORTED_MODULE_4__.createIndependentAnimations,
  _: _fns_to_create_animations__WEBPACK_IMPORTED_MODULE_4__.createDependentAnimations,
  to: _fns_to_create_animations__WEBPACK_IMPORTED_MODULE_4__.addFinalKeyframeInTheAnimation,
  cycle: function cycle(loopOrDir) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__.removeLastAnimationObjectAddedToPerformer)(this);
    var loop;
    var d;

    if (typeof loopOrDir === 'string') {
      loop = 2;
      d = loopOrDir;
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
      loopDirection: 'normal'
    };
    return this;
  },
  after: function after() {
    var amountIterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    this.$hidden.currentAfterIterations = amountIterations;
    return this;
  },
  now: function now() {
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__.removeLastAnimationObjectAddedToPerformer)(this);
    (0,_organize_animation_creations__WEBPACK_IMPORTED_MODULE_7__.buildAnimationsForSpecificPerformer)(this, {
      skip: true,
      firstRunImmediately: true
    });
    return this;
  },
  ready: function ready() {
    (0,_animation_actions_load_animations_and_play_when_ready__WEBPACK_IMPORTED_MODULE_11__.default)(this);
    return this;
  },
  set: function set(properties, propertyValue) {
    var userPerformer = this;
    (0,_animation_actions_set_property_value__WEBPACK_IMPORTED_MODULE_10__.default)(this, properties, propertyValue);
    return userPerformer;
  },
  get: function get(name) {
    return (0,_animation_actions_get_current_properties_value__WEBPACK_IMPORTED_MODULE_8__.default)(this, name);
  },
  load: function load() {
    this.$hidden.animationInstances.forEach(function (animation) {
      animation.load();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.load();
    });
    return this;
  },
  play: function play() {
    var _this = this;

    playAnimations(this);
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      var a = animation;

      if (a.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[0] || a.state === _constants__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_STATES[5]) {
        if (_this.$hidden.independentAnimations && _this.$hidden.independentAnimations.indexOf(a) > -1) {
          a.play();
        } else {
          a.autoPlay = true;
        }
      }
    });
    return this;
  },
  pause: function pause() {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.pause();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.pause();
      });
    });
    return this;
  },
  resume: function resume() {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.resume();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.resume();
      });
    });
    return this;
  },
  restart: function restart() {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.restart();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.restart();
      });
    });
    return this;
  },
  end: function end() {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.end();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.end();
      });
    });
    return this;
  },
  go: function go(part) {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.go(part);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.go(part);
      });
    });
    return this;
  },
  back: function back(part) {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.back(part);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.back(part);
      });
    });
    return this;
  },
  jump: function jump(part) {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.jump(part);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.jump(part);
      });
    });
    return this;
  },
  speed: function speed(multiply) {
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__.removeLastAnimationObjectAddedToPerformer)(this);
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.speed(multiply);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.speed(multiply);
      });
    });
    return this;
  },
  revert: function revert(endIteration) {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.revert(endIteration);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      applyWhenTheAnimationIsRunning(animation, function () {
        animation.revert(endIteration);
      });
    });
    return this;
  },
  dirTo: function dirTo(dir) {
    (0,_get_performer_animations_running__WEBPACK_IMPORTED_MODULE_1__.default)(this).forEach(function (animation) {
      return animation.dirTo(dir);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.dirTo(dir);
    });
    return this;
  },
  cancel: function cancel() {
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__.removeLastAnimationObjectAddedToPerformer)(this);
    this.$hidden.animationInstances.forEach(function (animation) {
      animation.cancel();
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.cancel();
    });
    return this;
  },
  destroy: function destroy(removeChanges) {
    (0,_last_added_animation_object__WEBPACK_IMPORTED_MODULE_6__.removeLastAnimationObjectAddedToPerformer)(this);
    this.$hidden.animationInstances.forEach(function (animation) {
      animation.destroy(removeChanges);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.destroy(removeChanges);
    });
    return this;
  },
  on: function on(eventName, callbackfn) {
    var eName = (0,_get_property_name__WEBPACK_IMPORTED_MODULE_9__.default)(this, (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.toCamelCase)(eventName));
    var performer = this;
    var countingEventShots = 0;
    var countAnimationsInterestedInEvent = 0;
    var animationInstances = performer.$hidden.animationInstances.slice();

    var eventCallback = function eventCallback(item) {
      countingEventShots += 1;
      countAnimationsInterestedInEvent = (0,_animation_listeners_amount_of_animations_interested_in_event__WEBPACK_IMPORTED_MODULE_2__.default)(animationInstances);

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
    animationInstances.forEach(function (animation) {
      countAnimationsInterestedInEvent += 1;
      animation.on(eventName, eventCallback);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animationInstances.push(animation);
      animation.on(eventName, eventCallback);
    });

    if (!this.$hidden.eventsCallbacks) {
      this.$hidden.eventsCallbacks = {};
    }

    var eventBucket = this.$hidden.eventsCallbacks[eName] || [];

    if (!this.$hidden.eventsCallbacks[eName]) {
      this.$hidden.eventsCallbacks[eName] = eventBucket;
    }

    eventBucket.push([callbackfn, eventCallback]);
    return this;
  },
  off: function off(eventName, callbackfnUsed) {
    var eName = (0,_get_property_name__WEBPACK_IMPORTED_MODULE_9__.default)(this, (0,_utilities_handle_string__WEBPACK_IMPORTED_MODULE_3__.toCamelCase)(eventName));

    if (this.$hidden.eventsCallbacks && this.$hidden.eventsCallbacks[eName]) {
      var eventBucket = this.$hidden.eventsCallbacks[eName];
      var eventCallback = false;
      this.$hidden.eventsCallbacks[eName] = eventBucket.filter(function (fns) {
        if (fns[0] !== callbackfnUsed) {
          return true;
        }

        eventCallback = fns[1];
        return false;
      });

      if (eventCallback) {
        this.$hidden.animationInstances.forEach(function (animation) {
          return animation.off(eName, eventCallback);
        });
        (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
          animation.off(eName, eventCallback);
        });
      }
    }

    return this;
  },
  remove: function remove() {
    var _this2 = this;

    for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    var propertiesNames = names.map(function (name) {
      var n = parseFloat(name.toString());

      if (_this2.$hidden.orderOfThePropertiesUsed[n]) {
        return _this2.$hidden.orderOfThePropertiesUsed[n];
      }

      return name;
    });
    this.$hidden.animationInstances.forEach(function (animation) {
      animation.remove.apply(animation, _toConsumableArray(propertiesNames));
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.remove.apply(animation, _toConsumableArray(propertiesNames));
    });
    return this;
  },
  removeTarget: function removeTarget(targets) {
    this.$hidden.animationInstances.forEach(function (animation) {
      animation.removeTarget(targets);
    });
    (0,_apply_callback_for_future_animations__WEBPACK_IMPORTED_MODULE_5__.default)(this, function (animation) {
      animation.removeTarget(targets);
    });
    return this;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PERFORMER_FNS_METHODS);

/***/ }),

/***/ "./src/sauce/polyfills.ts":
/*!********************************!*\
  !*** ./src/sauce/polyfills.ts ***!
  \********************************/
/***/ (function() {

/* eslint-disable */
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);

      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];

        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        nextSource = Object(nextSource);
        var keysArray = Object.keys(Object(nextSource));

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }

      return to;
    }
  });
}

(function () {
  var CSS_VENDORS = 'ms moz webkit o'.split(' ');

  for (var x = 0; x < CSS_VENDORS.length && !window.requestAnimationFrame; x += 1) {
    if (window["".concat(CSS_VENDORS[x], "RequestAnimationFrame")]) {
      window.requestAnimationFrame = window["".concat(CSS_VENDORS[x], "RequestAnimationFrame")];
    }

    if (window["".concat(CSS_VENDORS[x], "CancelAnimationFrame")]) {
      window.cancelAnimationFrame = window["".concat(CSS_VENDORS[x], "CancelAnimationFrame")];
    } else if (window["".concat(CSS_VENDORS[x], "CancelRequestAnimationFrame")]) {
      window.cancelAnimationFrame = window["".concat(CSS_VENDORS[x], "CancelRequestAnimationFrame")];
    }
  }
})();

Number.isNaN = Number.isNaN || function isNaN(input) {
  return typeof input === 'number' && input !== input;
};

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];

      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }

    return -1;
  };
}

/***/ }),

/***/ "./src/sauce/push-performer-again-to-the-creator.ts":
/*!**********************************************************!*\
  !*** ./src/sauce/push-performer-again-to-the-creator.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ pushPerformerAgainToTheCreator; }
/* harmony export */ });
function pushPerformerAgainToTheCreator(animationInstance) {
  var performer = animationInstance.performer;

  if (performer.$hidden.removedFromTheCreator) {
    animationInstance.creator.performers.push(performer);
    performer.$hidden.removedFromTheCreator = false;
  }
}

/***/ }),

/***/ "./src/sauce/remove-reference-in-creator-to-performer.ts":
/*!***************************************************************!*\
  !*** ./src/sauce/remove-reference-in-creator-to-performer.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ removeReferenceInCreatorToPerformer; }
/* harmony export */ });
function removeReferenceInCreatorToPerformer(performerFn) {
  var performer = performerFn;

  if (performer.$hidden.animationInstances.length === 0) {
    var index = performer.creator.performers.indexOf(performer);

    if (index > -1) {
      performer.creator.performers.splice(index, 1);
      performer.$hidden.removedFromTheCreator = true;
    }
  }
}

/***/ }),

/***/ "./src/sauce/wide-smile-debug.ts":
/*!***************************************!*\
  !*** ./src/sauce/wide-smile-debug.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WideSmileDebug; }
/* harmony export */ });
function WideSmileDebug(type, message, callbackTest) {
  var check = callbackTest ? callbackTest() : true;
  if (check) throw new Error("\n\n<WideSmile>: \n\n| Where or what happened: ".concat(type, " | \n\n--> ").concat(message, "\n\n"));
}

/***/ }),

/***/ "./src/utilities-style/apply-css-transition.ts":
/*!*****************************************************!*\
  !*** ./src/utilities-style/apply-css-transition.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ applyCSSTransition; }
/* harmony export */ });
/* harmony import */ var _get_vendor_css_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-vendor-css-property */ "./src/utilities-style/get-vendor-css-property.ts");

/**
 * Applies a transition to certain CSS properties.
 * @param element
 * An HTML element
 *
 * @param transitionValue
 *
 * @param CSSStyleRules
 * A value for the "transition" CSS property.
 */

function applyCSSTransition(element, transitionValue, CSSStyleRules) {
  var elementStyle = element.style;
  elementStyle.cssText = "".concat(elementStyle.cssText + (0,_get_vendor_css_property__WEBPACK_IMPORTED_MODULE_0__.default)('transition', transitionValue), ":").concat(transitionValue, ";").concat(CSSStyleRules);
}

/***/ }),

/***/ "./src/utilities-style/css-properties-important.ts":
/*!*********************************************************!*\
  !*** ./src/utilities-style/css-properties-important.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CSSPropertiesImportant; }
/* harmony export */ });
/* harmony import */ var _removes_important_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removes-important-string */ "./src/utilities-style/removes-important-string.ts");

/**
 * Adds the CSS string "!important" to all properties.
 */

function CSSPropertiesImportant(CSSStringRules) {
  return (0,_removes_important_string__WEBPACK_IMPORTED_MODULE_0__.default)(CSSStringRules).split(';').join(' !important;');
}

/***/ }),

/***/ "./src/utilities-style/css-string-rules-to-object.ts":
/*!***********************************************************!*\
  !*** ./src/utilities-style/css-string-rules-to-object.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CSSStringRulesToObject; }
/* harmony export */ });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");

/**
 * Converts CSS string rules to object.
 */

function CSSStringRulesToObject(CSSStringRules) {
  var CSSProperties = "".concat(CSSStringRules, ";").split(';');
  var styleObject = {};
  CSSProperties.forEach(function (value) {
    var property = value;
    var propertyIndex = property.indexOf(':') + 1;
    var propertyName = property.substring(0, propertyIndex - 1);

    if (propertyName) {
      styleObject[(0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.removeSpacesChar)((0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(propertyName))] = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.trimString)(property.substring(propertyIndex, property.length));
    }
  });
  return styleObject;
}

/***/ }),

/***/ "./src/utilities-style/get-applied-style.ts":
/*!**************************************************!*\
  !*** ./src/utilities-style/get-applied-style.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAppliedStyle; }
/* harmony export */ });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");


function augmentDimension(name, elementStyleObject) {
  var isBorderBox = elementStyleObject.boxSizing.toString().toLowerCase() === 'border-box';

  if (isBorderBox) {
    var sides = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
    var fields = ["padding".concat(sides[0]), "padding".concat(sides[1]), "border".concat(sides[0], "Width"), "border".concat(sides[1], "Width")];
    var augment = 0;
    fields.forEach(function (field) {
      var value = parseFloat(elementStyleObject[field]);

      if (!Number.isNaN(value)) {
        augment += value;
      }
    });
    return -augment;
  }

  return 0;
}

function getWidthHeight(element, property, elementStyleObject) {
  return "".concat(element.getBoundingClientRect()[property] + augmentDimension(property, elementStyleObject), "px");
}
/**
 * Normalizes some CSS properties that have not had a set value.
 *
 * @example
 * [ 'top', 'left', 'bottom', 'right', 'width', 'height' ]
 */


function computePropertiesValue(element, computedStyle) {
  var elementStyle = element.style;
  var elementCSSText = elementStyle.cssText;
  var currentComputedStyleForUse = computedStyle;
  var currentComputedStyle = currentComputedStyleForUse;
  var inDisplayNone = currentComputedStyle.getPropertyValue('display') === 'none';

  if (inDisplayNone) {
    elementStyle.display = 'initial';
    elementStyle.cssText = elementCSSText;
  }

  var propertiesToBeHandled = {};
  ['top', 'left', 'bottom', 'right', 'width', 'height'].forEach(function (propertyName) {
    var computedValue = 0;

    if (inDisplayNone && (propertyName === 'width' || propertyName === 'height')) {
      elementStyle.display = 'initial';
      computedValue = getWidthHeight(element, propertyName, currentComputedStyleForUse);
      elementStyle.cssText = elementCSSText;
      propertiesToBeHandled[propertyName] = String(computedValue);
    } else {
      computedValue = currentComputedStyle[propertyName];

      if (!computedValue) {
        computedValue = element.style[propertyName];
      }

      if (computedValue === 'auto') {
        if (propertyName === 'width' || propertyName === 'height') {
          computedValue = getWidthHeight(element, propertyName, currentComputedStyle);
        } else {
          var checkProperty;

          switch (propertyName) {
            case 'top':
            case 'left':
              checkProperty = 1;
              break;

            case 'right':
            case 'bottom':
              checkProperty = 2;
              break;

            default:
              checkProperty = 0;
              break;
          }

          if (checkProperty) {
            var position = currentComputedStyle.position;

            if (position === 'fixed' || checkProperty === 1 && position === 'absolute') {
              if (inDisplayNone) {
                elementStyle.display = 'initial';
              }

              computedValue = "".concat(element.getBoundingClientRect()[propertyName], "px");
              elementStyle.cssText = elementCSSText;
            } else {
              computedValue = '0px';
            }
          }
        }
      }

      propertiesToBeHandled[propertyName] = computedValue ? String(computedValue) : '';
    }
  });
  return propertiesToBeHandled;
}
/**
 * Gets the computed style of the element. Only properties that actually have value, shorthand properties, or with empty value are discarded.
 */


function getAppliedStyle(element, computedStyle) {
  var bestStyleComputed = computePropertiesValue(element, computedStyle);
  var appliedStyle = {};
  var counting = 0;
  var propertyName = computedStyle.item(counting);

  while (propertyName !== '') {
    var propertyNameInCamelCase = (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(propertyName);
    var propertyValue = computedStyle.getPropertyValue(propertyName);

    if (propertyValue !== '') {
      appliedStyle[propertyNameInCamelCase] = bestStyleComputed[propertyNameInCamelCase] || propertyValue;
    }

    counting += 1;
    propertyName = computedStyle.item(counting);
  }

  return appliedStyle;
}

/***/ }),

/***/ "./src/utilities-style/get-computed-values-after-change.ts":
/*!*****************************************************************!*\
  !*** ./src/utilities-style/get-computed-values-after-change.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getComputedValuesAfterChange; }
/* harmony export */ });
/* harmony import */ var _apply_css_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply-css-transition */ "./src/utilities-style/apply-css-transition.ts");
/* harmony import */ var _property_in_style_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-in-style-object */ "./src/utilities-style/property-in-style-object.ts");
/* harmony import */ var _removes_important_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./removes-important-string */ "./src/utilities-style/removes-important-string.ts");
/* harmony import */ var _css_properties_important__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css-properties-important */ "./src/utilities-style/css-properties-important.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _animation_mount_elements_canche__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation-mount/elements-canche */ "./src/animation-mount/elements-canche.ts");
/* harmony import */ var _css_string_rules_to_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css-string-rules-to-object */ "./src/utilities-style/css-string-rules-to-object.ts");
/* harmony import */ var _get_linked_css_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get-linked-css-properties */ "./src/utilities-style/get-linked-css-properties.ts");
/* harmony import */ var _reduce_css_string_rules__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reduce-css-string-rules */ "./src/utilities-style/reduce-css-string-rules.ts");









/**
 * Gets the CSS properties that would be changed in the element if there was the application of a determined style.
 *
 * @param element
 * An HTML element.
 *
 * @param CSSStringRules
 * The style to be applied.
 *
 * @param getTheseProperties
 * Indicates which properties should be read.
 *
 * @param initialStyle
 * Save the style as the initial style for the properties.
 */

function getComputedValuesAfterChange(element, CSSStringRules) {
  var elementCSSText = element.style.cssText;
  var elementStyle = element.style;
  var elementCanche = (0,_animation_mount_elements_canche__WEBPACK_IMPORTED_MODULE_5__.useElementCanche)(element);
  var affectedCSSProperties = {};
  var affectedCSSPropertiesInitialValues = {};
  var bestCSSStringRules = (0,_reduce_css_string_rules__WEBPACK_IMPORTED_MODULE_8__.default)(CSSStringRules);
  var beforeComputedStyle = elementCanche.bestComputedStyle();
  (0,_apply_css_transition__WEBPACK_IMPORTED_MODULE_0__.default)(element, 'all linear 0s', (0,_css_properties_important__WEBPACK_IMPORTED_MODULE_3__.default)("".concat(bestCSSStringRules)));
  var afterComputedStyle = elementCanche.bestComputedStyle();
  var linkedCSSProperties = {};
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.customForIn)((0,_css_string_rules_to_object__WEBPACK_IMPORTED_MODULE_6__.default)(bestCSSStringRules), function (propertyValue, propertyName) {
    (0,_get_linked_css_properties__WEBPACK_IMPORTED_MODULE_7__.default)(propertyName, propertyValue).forEach(function (property) {
      linkedCSSProperties[(0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.toCamelCase)(property)] = propertyValue;
    });
  });
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.customForIn)(linkedCSSProperties, function (_value, propertyName) {
    var pName = propertyName;

    if (!(0,_property_in_style_object__WEBPACK_IMPORTED_MODULE_1__.default)(pName, affectedCSSProperties)) {
      if (afterComputedStyle[pName] && pName !== 'cssText') {
        affectedCSSProperties[pName] = afterComputedStyle[pName];
        affectedCSSPropertiesInitialValues[pName] = beforeComputedStyle[pName];
      }
    }
  });
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.customForIn)(affectedCSSProperties, function (propertyValue, propertyName) {
    affectedCSSProperties[propertyName] = (0,_removes_important_string__WEBPACK_IMPORTED_MODULE_2__.default)(propertyValue);
    affectedCSSPropertiesInitialValues[propertyName] = (0,_removes_important_string__WEBPACK_IMPORTED_MODULE_2__.default)(beforeComputedStyle[propertyName]);
  });
  elementStyle.cssText = elementCSSText;
  return {
    before: affectedCSSPropertiesInitialValues,
    after: affectedCSSProperties,
    beforeComputedStyle: beforeComputedStyle,
    afterComputedStyle: afterComputedStyle
  };
}

/***/ }),

/***/ "./src/utilities-style/get-easy-computed-style.ts":
/*!********************************************************!*\
  !*** ./src/utilities-style/get-easy-computed-style.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getEasyComputedStyle; }
/* harmony export */ });
/**
 * Gets the calculated style of the element.
 */
function getEasyComputedStyle(element) {
  var view = element.ownerDocument.defaultView;

  if (!view || !view.opener) {
    view = window;
  }

  return view.getComputedStyle(element);
}

/***/ }),

/***/ "./src/utilities-style/get-linked-css-properties.ts":
/*!**********************************************************!*\
  !*** ./src/utilities-style/get-linked-css-properties.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getLinkedCSSProperties; }
/* harmony export */ });
/* harmony import */ var _hack_to_set_css_property_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hack-to-set-css-property-value */ "./src/utilities-style/hack-to-set-css-property-value.ts");
/* harmony import */ var _to_css_kebab_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var DIV_ELEMENT_STYLE = document.createElement('div').style;
var KNOWN_PROPERTIES = {};
function getLinkedCSSProperties(propertyName, propertyValue) {
  if (KNOWN_PROPERTIES[propertyName]) {
    return KNOWN_PROPERTIES[propertyName];
  }

  DIV_ELEMENT_STYLE.cssText = '';
  var propertyNameCSS = (0,_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_1__.default)(propertyName);
  var linkedCSSPropertiesList = [];
  var counting = 0;
  var values = [propertyValue].concat(_toConsumableArray(_hack_to_set_css_property_value__WEBPACK_IMPORTED_MODULE_0__.default));
  var l = values.length;
  var property = '';

  for (var index = 0; index < l; index += 1) {
    var value = values[index];

    if (value) {
      DIV_ELEMENT_STYLE[propertyNameCSS] = value;
      property = DIV_ELEMENT_STYLE.item(counting);

      if (property) {
        break;
      }
    }
  }

  while (property !== '') {
    linkedCSSPropertiesList.push(property);
    counting += 1;
    property = DIV_ELEMENT_STYLE.item(counting);
  }

  KNOWN_PROPERTIES[propertyName] = linkedCSSPropertiesList;
  return KNOWN_PROPERTIES[propertyName];
}

/***/ }),

/***/ "./src/utilities-style/get-vendor-css-property.ts":
/*!********************************************************!*\
  !*** ./src/utilities-style/get-vendor-css-property.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getVendorCSSProperty; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _hack_to_set_css_property_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hack-to-set-css-property-value */ "./src/utilities-style/hack-to-set-css-property-value.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




/**
 * Gets the vendor for a determined CSS property.
 *
 * @param propertyName
 * The propertyName
 *
 * @returns {string}
 *
 * The CSS property( with the vendor prefix).
 */

var DIV_ELEMENT_STYLE = document.createElement('div').style;
var KNOWN_PROPERTIES = {};
function getVendorCSSProperty(propertyName, propertyValue) {
  if (KNOWN_PROPERTIES[propertyName]) {
    return KNOWN_PROPERTIES[propertyName];
  }

  DIV_ELEMENT_STYLE.cssText = '';
  var name = propertyName;
  var values = [propertyValue].concat(_toConsumableArray(_hack_to_set_css_property_value__WEBPACK_IMPORTED_MODULE_2__.default));
  var l = values.length;

  for (var index = 0; index < l; index += 1) {
    var value = values[index];

    if (value) {
      if (name.substring(0, 1) === '-') {
        name = name.replace(/-[^>](.*?)-/, '');
      }

      DIV_ELEMENT_STYLE[(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.toCamelCase)(name)] = value;

      if (DIV_ELEMENT_STYLE.cssText) {
        KNOWN_PROPERTIES[propertyName] = name;
        return name;
      }

      for (var count = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_VENDORS_LENGTH - 1; count >= 0; count -= 1) {
        var n = "-".concat(_sauce_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_VENDORS[count], "-").concat(name);
        DIV_ELEMENT_STYLE[(0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.toCamelCase)(n)] = value;

        if (DIV_ELEMENT_STYLE.cssText) {
          KNOWN_PROPERTIES[propertyName] = n;
          return n;
        }
      }
    }
  }

  KNOWN_PROPERTIES[propertyName] = propertyName;
  return propertyName;
}

/***/ }),

/***/ "./src/utilities-style/hack-to-set-css-property-value.ts":
/*!***************************************************************!*\
  !*** ./src/utilities-style/hack-to-set-css-property-value.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var HACK_CSS_PROPERTY_VALUES = ['inherit', 'initial', '1px', '#000'];
/* harmony default export */ __webpack_exports__["default"] = (HACK_CSS_PROPERTY_VALUES);

/***/ }),

/***/ "./src/utilities-style/index.ts":
/*!**************************************!*\
  !*** ./src/utilities-style/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyCSSTransition": function() { return /* reexport safe */ _apply_css_transition__WEBPACK_IMPORTED_MODULE_0__.default; },
/* harmony export */   "getAppliedStyle": function() { return /* reexport safe */ _get_applied_style__WEBPACK_IMPORTED_MODULE_1__.default; },
/* harmony export */   "toCSSStringRules": function() { return /* reexport safe */ _to_css_string_rules__WEBPACK_IMPORTED_MODULE_2__.default; },
/* harmony export */   "getVendorCSSProperty": function() { return /* reexport safe */ _get_vendor_css_property__WEBPACK_IMPORTED_MODULE_3__.default; },
/* harmony export */   "CSSPropertiesImportant": function() { return /* reexport safe */ _css_properties_important__WEBPACK_IMPORTED_MODULE_4__.default; },
/* harmony export */   "reduceCSSStringRules": function() { return /* reexport safe */ _reduce_css_string_rules__WEBPACK_IMPORTED_MODULE_5__.default; },
/* harmony export */   "removesImportantString": function() { return /* reexport safe */ _removes_important_string__WEBPACK_IMPORTED_MODULE_6__.default; },
/* harmony export */   "splitCSSProperties": function() { return /* reexport safe */ _split_css_properties__WEBPACK_IMPORTED_MODULE_7__.default; },
/* harmony export */   "CSSStringRulesToObject": function() { return /* reexport safe */ _css_string_rules_to_object__WEBPACK_IMPORTED_MODULE_8__.default; },
/* harmony export */   "toCSSKebabCase": function() { return /* reexport safe */ _to_css_kebab_case__WEBPACK_IMPORTED_MODULE_9__.default; },
/* harmony export */   "getEasyComputedStyle": function() { return /* reexport safe */ _get_easy_computed_style__WEBPACK_IMPORTED_MODULE_10__.default; },
/* harmony export */   "getLinkedCSSProperties": function() { return /* reexport safe */ _get_linked_css_properties__WEBPACK_IMPORTED_MODULE_11__.default; }
/* harmony export */ });
/* harmony import */ var _apply_css_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply-css-transition */ "./src/utilities-style/apply-css-transition.ts");
/* harmony import */ var _get_applied_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-applied-style */ "./src/utilities-style/get-applied-style.ts");
/* harmony import */ var _to_css_string_rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./to-css-string-rules */ "./src/utilities-style/to-css-string-rules.ts");
/* harmony import */ var _get_vendor_css_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-vendor-css-property */ "./src/utilities-style/get-vendor-css-property.ts");
/* harmony import */ var _css_properties_important__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css-properties-important */ "./src/utilities-style/css-properties-important.ts");
/* harmony import */ var _reduce_css_string_rules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce-css-string-rules */ "./src/utilities-style/reduce-css-string-rules.ts");
/* harmony import */ var _removes_important_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./removes-important-string */ "./src/utilities-style/removes-important-string.ts");
/* harmony import */ var _split_css_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./split-css-properties */ "./src/utilities-style/split-css-properties.ts");
/* harmony import */ var _css_string_rules_to_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css-string-rules-to-object */ "./src/utilities-style/css-string-rules-to-object.ts");
/* harmony import */ var _to_css_kebab_case__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
/* harmony import */ var _get_easy_computed_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./get-easy-computed-style */ "./src/utilities-style/get-easy-computed-style.ts");
/* harmony import */ var _get_linked_css_properties__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./get-linked-css-properties */ "./src/utilities-style/get-linked-css-properties.ts");













/***/ }),

/***/ "./src/utilities-style/property-in-style-object.ts":
/*!*********************************************************!*\
  !*** ./src/utilities-style/property-in-style-object.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ propertyInStyleObject; }
/* harmony export */ });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");
/* harmony import */ var _same_css_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./same-css-property */ "./src/utilities-style/same-css-property.ts");


/**
 * Checks that a specific property exists in a style object, vendors are not taken into account
 * ([moz, ms, webkit, o]-opacity is equal opacity).
 */

function propertyInStyleObject(property, styleObject) {
  return (0,_utilities_index__WEBPACK_IMPORTED_MODULE_0__.customForIn)(styleObject, function (_value, propertyName) {
    if ((0,_same_css_property__WEBPACK_IMPORTED_MODULE_1__.default)(propertyName, property)) {
      return true;
    }

    return false;
  });
}

/***/ }),

/***/ "./src/utilities-style/reduce-css-string-rules.ts":
/*!********************************************************!*\
  !*** ./src/utilities-style/reduce-css-string-rules.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Attempts to reduce CSS string rules by applying to an element outside of the document and returning the result.
 */
var reduceCSSStringRules = function () {
  var DIV_ELEMENT_STYLE = document.createElement('div').style;
  return function (CSSStringRules) {
    DIV_ELEMENT_STYLE.cssText = CSSStringRules;
    return DIV_ELEMENT_STYLE.cssText;
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (reduceCSSStringRules);

/***/ }),

/***/ "./src/utilities-style/removes-important-string.ts":
/*!*********************************************************!*\
  !*** ./src/utilities-style/removes-important-string.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ removesImportantString; }
/* harmony export */ });
/**
 * Removes the CSS string "!important" from all properties.
 */
function removesImportantString(CSSStringRules) {
  return CSSStringRules.split('!important').join('');
}

/***/ }),

/***/ "./src/utilities-style/same-css-property.ts":
/*!**************************************************!*\
  !*** ./src/utilities-style/same-css-property.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ sameCSSProperty; }
/* harmony export */ });
/* harmony import */ var _sauce_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sauce/constants */ "./src/sauce/constants.ts");
/* harmony import */ var _to_css_kebab_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");


/**
 * Compares whether the properties are the same despite the vendor.
 */

function sameCSSProperty(property, propertyVendor) {
  var CSSProperty = (0,_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_1__.default)(property);
  var CSSPropertyVendor = (0,_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_1__.default)(propertyVendor);

  if (CSSProperty === CSSPropertyVendor) {
    return true;
  }

  for (var counting = _sauce_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_VENDORS_LENGTH - 1; counting > -1; counting -= 1) {
    if ("-".concat(_sauce_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_VENDORS[counting], "-").concat(CSSProperty) === CSSPropertyVendor) {
      return true;
    }
  }

  return false;
}

/***/ }),

/***/ "./src/utilities-style/split-css-properties.ts":
/*!*****************************************************!*\
  !*** ./src/utilities-style/split-css-properties.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ splitCSSProperties; }
/* harmony export */ });
/**
 * Splits the CSS properties and their values into a array.
 */
function splitCSSProperties(CSSStringRules) {
  var lastIndex = 0;
  var propertiesSplited = [];
  var style = CSSStringRules.replace(/(;)/g, '; ').replace(/( {2})/g, ' ');
  style.replace(/[:()[\] ,=]/g, function (a, b) {
    var s = style.substring(lastIndex, b);

    if (s) {
      propertiesSplited.push(s);
    }

    propertiesSplited.push(a);
    lastIndex = b + 1;
    return a;
  });
  propertiesSplited.push(style.substring(lastIndex, Infinity));
  return propertiesSplited;
}

/***/ }),

/***/ "./src/utilities-style/to-css-kebab-case.ts":
/*!**************************************************!*\
  !*** ./src/utilities-style/to-css-kebab-case.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toCSSKebabCase; }
/* harmony export */ });
/**
 * Converts the string to a CSS valid.
 */
function toCSSKebabCase(string) {
  var rdashAlpha = /([A-Z])/g;
  return string.replace(rdashAlpha, function (_all, letter) {
    return "-".concat(letter).toLowerCase();
  });
}

/***/ }),

/***/ "./src/utilities-style/to-css-string-rules.ts":
/*!****************************************************!*\
  !*** ./src/utilities-style/to-css-string-rules.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toCSSStringRules; }
/* harmony export */ });
/* harmony import */ var _to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-css-kebab-case */ "./src/utilities-style/to-css-kebab-case.ts");
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index */ "./src/utilities/index.ts");


/**
 * Converts a style object to a style string.
 */

function toCSSStringRules(styleObject) {
  var string = '';
  (0,_utilities_index__WEBPACK_IMPORTED_MODULE_1__.customForIn)(styleObject, function (_value, propertyName) {
    string = "".concat(string, " ").concat(propertyName, ": ").concat(styleObject[propertyName], ";");
  });
  return (0,_to_css_kebab_case__WEBPACK_IMPORTED_MODULE_0__.default)(string);
}

/***/ }),

/***/ "./src/utilities/custom-for-in.ts":
/*!****************************************!*\
  !*** ./src/utilities/custom-for-in.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ customForIn; }
/* harmony export */ });
/* harmony import */ var _has_own_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./has-own-property */ "./src/utilities/has-own-property.ts");

/**
 * Very similar to a "for in", however, it is optional go through the "prototype" and is more controllable.
 * @param objectForLoop
 * The object.
 *
 * @param callbackfn
 * A function that accepts up to three arguments. Calls the callbackfn function one time for each element in the array. If callbackfn returns any value that, if converted to boolean equals "true" the looping and terminating.
 *
 * @param avoid
 * A drive of "key" to jump or the key to start counting. The default value is "prototype" - ( avoiding the object's prototype reading ).
 *
 * @param thisArg
 * An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 */

function customForIn(objectForLoop, callbackfn) {
  var avoid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'prototype';
  var thisArg = arguments.length > 3 ? arguments[3] : undefined;
  var isInPrototype = Array.isArray(objectForLoop) ? function (key) {
    return Number.isNaN(Number(key));
  } : function (key) {
    return !(0,_has_own_property__WEBPACK_IMPORTED_MODULE_0__.default)(objectForLoop, key);
  };
  var avoidItems = Array.isArray(avoid);
  var jumps = avoidItems ? avoid.join(' ') : '';
  var pass = avoidItems || !avoid || avoid === 'prototype';
  var getPrototype = avoid.toString().indexOf('prototype') !== -1; // eslint-disable-next-line

  for (var propertyName in objectForLoop) {
    if (!(getPrototype && isInPrototype(propertyName)) && jumps.indexOf(propertyName) === -1 && pass === true) {
      var callbackfnCalled = callbackfn.call(thisArg, objectForLoop[propertyName], propertyName, objectForLoop);
      if (callbackfnCalled) return true;
    }

    if (!pass) pass = propertyName === avoid;
  }

  return false;
}

/***/ }),

/***/ "./src/utilities/dom-attributes.ts":
/*!*****************************************!*\
  !*** ./src/utilities/dom-attributes.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAttr": function() { return /* binding */ getAttr; },
/* harmony export */   "setAttr": function() { return /* binding */ setAttr; },
/* harmony export */   "removeAttr": function() { return /* binding */ removeAttr; }
/* harmony export */ });
function getAttr(element, attrName) {
  return element.getAttribute(attrName);
}
function setAttr(element, attrName, attrValue) {
  return element.setAttribute(attrName, attrValue);
}
function removeAttr(element, attrName) {
  return element.removeAttribute(attrName);
}

/***/ }),

/***/ "./src/utilities/get-random-key.ts":
/*!*****************************************!*\
  !*** ./src/utilities/get-random-key.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getRandomKey; }
/* harmony export */ });
/**
 * Gets a random key.
 * @param keys
 * The array of numeric values.
 *
 * @param lastkey
 * The array of numeric values.
 */
function getRandomKey(keys) {
  var lastkey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var selected = Math.floor(Math.random() * keys.length);
  return keys[selected] === lastkey ? keys[selected - 1 >= 0 ? selected - 1 : selected + 1] : keys[selected];
}

/***/ }),

/***/ "./src/utilities/get-time-now.ts":
/*!***************************************!*\
  !*** ./src/utilities/get-time-now.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getTimeNow; }
/* harmony export */ });
function getTimeNow() {
  return Date.now ? Date.now() : new Date().getTime();
}

/***/ }),

/***/ "./src/utilities/get-unit.ts":
/*!***********************************!*\
  !*** ./src/utilities/get-unit.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getUnit; }
/* harmony export */ });
/* harmony import */ var _handle_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handle-string */ "./src/utilities/handle-string.ts");

/**
 * Gets the unit of measure present in the string.
 */

function getUnit(val) {
  var propertyValue = (0,_handle_string__WEBPACK_IMPORTED_MODULE_0__.trimString)(val);
  var n = parseFloat(propertyValue);

  if (Number.isNaN(n) || propertyValue.indexOf(',') > -1 || propertyValue.indexOf(' ') > -1) {
    return '';
  }

  return propertyValue.split(n.toString()).join('').replace(/([0-9 .])/g, '');
}

/***/ }),

/***/ "./src/utilities/handle-string.ts":
/*!****************************************!*\
  !*** ./src/utilities/handle-string.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trimString": function() { return /* binding */ trimString; },
/* harmony export */   "toCamelCase": function() { return /* binding */ toCamelCase; }
/* harmony export */ });
/**
 * Removes the leading and trailing white space and line terminator characters from a string.
 */
function trimString(string) {
  if (string.trim) {
    return string.trim();
  }

  return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
/**
 * Converts to camelCase the string.
 */

function toCamelCase(string) {
  var rmsPrefix = /^-ms-/;
  var rdashAlpha = /-([a-z])/g;
  return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, function (_all, letter) {
    return letter.toUpperCase();
  });
}

/***/ }),

/***/ "./src/utilities/has-own-property.ts":
/*!*******************************************!*\
  !*** ./src/utilities/has-own-property.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ hasOwnProperty; }
/* harmony export */ });
function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/***/ }),

/***/ "./src/utilities/index.ts":
/*!********************************!*\
  !*** ./src/utilities/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ordernateByGrowingValues": function() { return /* reexport safe */ _ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_0__.default; },
/* harmony export */   "toMs": function() { return /* reexport safe */ _to_ms__WEBPACK_IMPORTED_MODULE_1__.default; },
/* harmony export */   "customForIn": function() { return /* reexport safe */ _custom_for_in__WEBPACK_IMPORTED_MODULE_2__.default; },
/* harmony export */   "removeSpacesChar": function() { return /* reexport safe */ _remove_spaces_char__WEBPACK_IMPORTED_MODULE_3__.default; },
/* harmony export */   "getRandomKey": function() { return /* reexport safe */ _get_random_key__WEBPACK_IMPORTED_MODULE_4__.default; },
/* harmony export */   "hasOwnProperty": function() { return /* reexport safe */ _has_own_property__WEBPACK_IMPORTED_MODULE_5__.default; },
/* harmony export */   "getTimeNow": function() { return /* reexport safe */ _get_time_now__WEBPACK_IMPORTED_MODULE_6__.default; },
/* harmony export */   "getUnit": function() { return /* reexport safe */ _get_unit__WEBPACK_IMPORTED_MODULE_7__.default; },
/* harmony export */   "toCamelCase": function() { return /* reexport safe */ _handle_string__WEBPACK_IMPORTED_MODULE_8__.toCamelCase; },
/* harmony export */   "trimString": function() { return /* reexport safe */ _handle_string__WEBPACK_IMPORTED_MODULE_8__.trimString; }
/* harmony export */ });
/* harmony import */ var _ordernate_by_growing_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ordernate-by-growing-values */ "./src/utilities/ordernate-by-growing-values.ts");
/* harmony import */ var _to_ms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-ms */ "./src/utilities/to-ms.ts");
/* harmony import */ var _custom_for_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-for-in */ "./src/utilities/custom-for-in.ts");
/* harmony import */ var _remove_spaces_char__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./remove-spaces-char */ "./src/utilities/remove-spaces-char.ts");
/* harmony import */ var _get_random_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-random-key */ "./src/utilities/get-random-key.ts");
/* harmony import */ var _has_own_property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./has-own-property */ "./src/utilities/has-own-property.ts");
/* harmony import */ var _get_time_now__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get-time-now */ "./src/utilities/get-time-now.ts");
/* harmony import */ var _get_unit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get-unit */ "./src/utilities/get-unit.ts");
/* harmony import */ var _handle_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./handle-string */ "./src/utilities/handle-string.ts");










/***/ }),

/***/ "./src/utilities/is-dom-element.ts":
/*!*****************************************!*\
  !*** ./src/utilities/is-dom-element.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isDOMElement; }
/* harmony export */ });
function isDOMElement(e) {
  return e.nodeType ? true :  false || e instanceof SVGElement;
}

/***/ }),

/***/ "./src/utilities/is-empty-object.ts":
/*!******************************************!*\
  !*** ./src/utilities/is-empty-object.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isEmptyObject; }
/* harmony export */ });
/**
 * Check if a variable is an empty object.
 */
function isEmptyObject(variable) {
  return Object.keys(variable).length < 1;
}

/***/ }),

/***/ "./src/utilities/multiply-value.ts":
/*!*****************************************!*\
  !*** ./src/utilities/multiply-value.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ multiplyValue; }
/* harmony export */ });
function multiplyValue(value, multiply) {
  var duration = Math.abs(multiply) * value;
  return multiply > 0 ? value + duration : Math.max(value - duration, 0);
}

/***/ }),

/***/ "./src/utilities/ordernate-by-growing-values.ts":
/*!******************************************************!*\
  !*** ./src/utilities/ordernate-by-growing-values.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ordernateByGrowingValues; }
/* harmony export */ });
/**
 * Orders the array by growth values.
 */
function ordernateByGrowingValues(array) {
  return array.map(Number).sort(function (a, b) {
    return a - b;
  });
}

/***/ }),

/***/ "./src/utilities/remove-spaces-char.ts":
/*!*********************************************!*\
  !*** ./src/utilities/remove-spaces-char.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ removeSpacesChar; }
/* harmony export */ });
/**
 * Removes the spaces between the characters in the string.
 */
function removeSpacesChar(str) {
  return str.replace(/[ ]+/g, '');
}

/***/ }),

/***/ "./src/utilities/to-ms.ts":
/*!********************************!*\
  !*** ./src/utilities/to-ms.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toMs; }
/* harmony export */ });
/** Converts seconds to milliseconds. */
function toMs(seconds) {
  return Math.floor(seconds * 1000);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***********************!*\
  !*** ./wide-smile.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_creator_fn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/creator-fn */ "./src/creator-fn.ts");
/*
  # wide-smile (C) 2021, Diogo Neves. 

  # Licensed under the MIT license. See LICENSE file in the project root for details.
  ___________________________________________________________________________________
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  *                                                                                 *
  * Thanks to everyone who supported the project directly and indirectly.           *
  *                                                                                 *
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

/* harmony default export */ __webpack_exports__["default"] = (_src_creator_fn__WEBPACK_IMPORTED_MODULE_0__.default);
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=wide-smile.js.map