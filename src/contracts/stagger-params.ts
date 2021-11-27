import { AnimationInstance } from './animation-inter';

export type StaggerParams = {
  grid?: [rows: number, columns: number];
  axis?: 'x' | 'y' | 'both';
  from?: number | 'first' | 'last' | 'center' | 'edges' | 'random';
  start?: number;
  easing?: AnimationInstance['easing'];
  dir?: 'normal' | 'reverse';
};
