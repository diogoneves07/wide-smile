/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */

/* eslint-disable no-plusplus  */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */

import EasingFunction from '../contracts/easing-function';
import { toCamelCase } from '../utilities/handle-string';

function minMax(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function mathPow(x: number, y: number) {
  return x ** y;
}
function isUnd(v: unknown) {
  return typeof v === 'undefined';
}

// Easings

function parseEasingParameters(string: string) {
  const match = /\(([^)]+)\)/.exec(string);
  return match
    ? match[1].split(',').map((p) => {
        return parseFloat(p);
      })
    : [];
}
// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string: string, duration: number) {
  const params = parseEasingParameters(string);
  const mass = minMax(isUnd(params[0]) ? 1 : params[0], 0.1, 100);
  const stiffness = minMax(isUnd(params[1]) ? 100 : params[1], 0.1, 100);
  const damping = minMax(isUnd(params[2]) ? 10 : params[2], 0.1, 100);
  const velocity = minMax(isUnd(params[3]) ? 0 : params[3], 0.1, 100);
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  const a = 1;
  const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t: number) {
    let progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress =
        Math.exp(-progress * zeta * w0) *
        (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) {
      return t;
    }
    return 1 - progress;
  }

  function getDuration() {
    const frame = 1 / 6;
    let elapsed = 0;
    let rest = 0;
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
}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(stps: number) {
  let s = stps;
  if (s === undefined) s = 10;

  return (t: number) => {
    return Math.ceil(minMax(t, 0.000001, 1) * s) * (1 / s);
  };
}

const penner = (() => {
  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  const eases: Record<string, Function> = {
    linear() {
      return (t: number) => {
        return t;
      };
    },
  };

  const functionEasings: Record<string, Function> = {
    Sine() {
      return (t: number) => {
        return 1 - Math.cos((t * Math.PI) / 2);
      };
    },
    Circ() {
      return (t: number) => {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back() {
      return (t: number) => {
        return t * t * (3 * t - 2);
      };
    },
    Bounce() {
      return (t: number) => {
        let pow2;
        let b = 4;
        while (t < ((pow2 = mathPow(2, --b)) - 1) / 11);
        return (
          1 / mathPow(4, 3 - b) - 7.5625 * mathPow((pow2 * 3 - 2) / 22 - t, 2)
        );
      };
    },
    Elastic(amplitude: number, period: number) {
      let amp = amplitude;
      let per = period;
      if (amp === undefined) amp = 1;
      if (period === undefined) per = 0.5;

      const a = minMax(amp, 1, 10);
      const p = minMax(per, 0.1, 2);
      return (t: number) => {
        return t === 0 || t === 1
          ? t
          : -a *
              mathPow(2, 10 * (t - 1)) *
              Math.sin(
                ((t - 1 - (p / (Math.PI * 2)) * Math.asin(1 / a)) *
                  (Math.PI * 2)) /
                  p
              );
      };
    },
  };

  const baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach((name, i) => {
    functionEasings[name] = () => {
      return (t: number) => {
        return mathPow(t, i + 2);
      };
    };
  });

  Object.keys(functionEasings).forEach((name) => {
    const easeIn = functionEasings[name];
    eases[`easeIn${name}`] = easeIn;
    eases[`easeOut${name}`] = (a: number, b: number) => {
      return (t: number) => {
        return 1 - easeIn(a, b)(1 - t);
      };
    };
    eases[`easeInOut${name}`] = (a: number, b: number) => {
      return (t: number) => {
        return t < 0.5
          ? easeIn(a, b)(t * 2) / 2
          : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    };
    eases[`easeOutIn${name}`] = (a: number, b: number) => {
      return (t: number) => {
        return t < 0.5
          ? (1 - easeIn(a, b)(1 - t * 2)) / 2
          : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  });

  return eases;
})();

// BezierEasing https://github.com/gre/bezier-easing

const bezier = (() => {
  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1: number, aA2: number) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1: number, aA2: number) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1: number) {
    return 3.0 * aA1;
  }

  function calcBezier(aT: number, aA1: number, aA2: number) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT: number, aA1: number, aA2: number) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(
    aX: number,
    aA: number,
    aB: number,
    mX1: number,
    mX2: number
  ) {
    let currentX;
    let currentT;
    let i = 0;
    let ab = aB;
    let aa = aA;
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

  function newtonRaphsonIterate(
    aX: number,
    aGuessT: number,
    mX1: number,
    mX2: number
  ) {
    let aG = aGuessT;
    for (let i = 0; i < 4; i += 1) {
      const currentSlope = getSlope(aG, mX1, mX2);
      if (currentSlope === 0.0) {
        return aG;
      }
      const currentX = calcBezier(aG, mX1, mX2) - aX;
      aG -= currentX / currentSlope;
    }
    return aG;
  }

  function bz(mX1: number, mY1: number, mX2: number, mY2: number) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      return undefined;
    }
    const sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX: number) {
      let intervalStart = 0;
      let currentSample = 1;
      const lastSample = kSplineTableSize - 1;

      for (
        ;
        currentSample !== lastSample && sampleValues[currentSample] <= aX;
        ++currentSample
      ) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      const dist =
        (aX - sampleValues[currentSample]) /
        (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      const guessForT = intervalStart + dist * kSampleStepSize;
      const initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      }
      if (initialSlope === 0.0) {
        return guessForT;
      }
      return binarySubdivide(
        aX,
        intervalStart,
        intervalStart + kSampleStepSize,
        mX1,
        mX2
      );
    }

    return (x: number) => {
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
})();

export function applyArguments(func: Function, args: number[]): EasingFunction {
  return func(...args) as EasingFunction;
}
export function parserEasings(
  easing: string | Function,
  duration?: number
): EasingFunction {
  if (typeof easing === 'function') {
    return easing as EasingFunction;
  }
  const name = easing.split('(')[0];
  const ease = penner[toCamelCase(name)];
  const args = parseEasingParameters(easing);
  switch (name) {
    case 'spring':
      return spring(easing, duration as number);
    case 'cubicBezier':
      return applyArguments(bezier, args);
    case 'steps':
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
