/* The code below is based on the implementation of anime.js v3.2.1 Copyright (c) 2020 Julian Garnier  */

import removeSpacesChar from '../utilities/remove-spaces-char';

// Colors

export function isHex(a: string): boolean {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
}
export function isRgb(a: string): boolean {
  return /^rgb/.test(a);
}
export function isHsl(a: string): boolean {
  return /^hsl/.test(a);
}
export function isColor(a: string): boolean {
  const c = removeSpacesChar(a);
  if (c.split(')').length > 1) {
    return false;
  }
  return isHex(a) || isRgb(a) || isHsl(a);
}

export function rgbToRgba(rgbValue: string): string {
  const rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? `rgba(${rgb[1]},1)` : rgbValue;
}

export function hexToRgba(hexValue: string): string {
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = hexValue.replace(rgx, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  ) as RegExpExecArray;
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  return `rgba(${r},${g},${b},1)`;
}

export function hslToRgba(hslValue: string): string {
  const hsl =
    /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) ||
    (/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(
      hslValue
    ) as RegExpExecArray);
  const h = parseInt(hsl[1], 10) / 360;
  const s = parseInt(hsl[2], 10) / 100;
  const l = parseInt(hsl[3], 10) / 100;
  const a = hsl[4] || 1;
  function hue2rgb(p: number, q: number, t: number) {
    let tt = t;
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
  let r;
  let g;
  let b;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return `rgba(${r * 255},${g * 255},${b * 255},${a})`;
}

export function colorToRgb(value: string): string {
  const val = removeSpacesChar(value);
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
