/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */

import EasingFunction from '../contracts/easing-function';
import FunctionForPropertyValueInKeyframe from '../contracts/function-for-property-value-in-keyframe';
import { StaggerParams } from '../contracts/stagger-params';
import { getCustomEasing } from '../sauce/custom-easings';
import getUnit from '../utilities/get-unit';
import { parserEasings } from './easings';

export default function stagger(
  params: StaggerParams
): FunctionForPropertyValueInKeyframe {
  const value = params.value;

  const p: StaggerParams = params;

  const val = (typeof value === 'number' ? value.toString() : value) as
    | string
    | string[];
  let easing: EasingFunction | null;

  const grid = p.grid;
  const axis = p.axis;
  let fromIndex = p.from || 0;
  if (fromIndex === 'edges') {
    fromIndex = 'center';
    if (!p.dir || p.dir === 'normal') {
      p.dir = 'reverse';
    } else {
      p.dir = 'normal';
    }
  }
  const dir = p.dir || 'normal';
  const fromCenter = fromIndex === 'center';
  const isRange = Array.isArray(val);
  let val1: number;
  let val2: number;
  let unit: string;

  if (params && params.easing && typeof params.easing === 'string') {
    easing = getCustomEasing(params.easing) || parserEasings(params.easing);
  } else {
    easing = null;
  }

  if (Array.isArray(val)) {
    val1 = parseFloat(val[0]);
    val2 = parseFloat(val[1]);

    unit = getUnit(val[1]) || '';
  } else {
    val1 = parseFloat(val as string);
    val2 = 0;

    unit = getUnit(val) || '';
  }

  const start = parseFloat(p.start as string) || 0 + (isRange ? val1 : 0);
  let values: number[] = [];
  let maxValue = 0;
  return (el: object, i: number, t: number) => {
    let fIndex: number;
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
        fIndex = fromIndex as number;
        break;
    }

    if (!values.length) {
      for (let index = 0; index < t; index += 1) {
        if (!grid) {
          values.push(Math.abs(fIndex - index));
        } else {
          const fromX = !fromCenter ? fIndex % grid[0] : (grid[0] - 1) / 2;
          const fromY = !fromCenter
            ? Math.floor(fIndex / grid[0])
            : (grid[1] - 1) / 2;
          const toX = index % grid[0];
          const toY = Math.floor(index / grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let r = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') {
            r = -distanceX;
          }
          if (axis === 'y') {
            r = -distanceY;
          }
          values.push(r);
        }
        maxValue = Math.max(...values);
      }
      if (easing) {
        values = values.map((v) => {
          return (easing as EasingFunction)(v / maxValue, el, i, t) * maxValue;
        });
      }
      if (dir === 'reverse') {
        values = values.map((v) => {
          if (axis) {
            return v < 0 ? v * -1 : -v;
          }
          return Math.abs(maxValue - v);
        });
      }
    }

    const spacing = isRange ? (val2 - val1) / maxValue : val1;

    const r = start + spacing * (Math.round(values[i] * 100) / 100);
    return unit ? r + unit : r;
  };
}
