import { AnimationInstance } from './animation-inter';
export declare type StaggerParams = {
    grid?: [rows: number, columns: number];
    axis?: 'x' | 'y' | 'both';
    from?: number | 'first' | 'last' | 'center' | 'edges' | 'random';
    start?: number | string;
    easing?: AnimationInstance['easing'];
    dir?: 'normal' | 'reverse';
    value?: string | number | (string | number)[];
};
