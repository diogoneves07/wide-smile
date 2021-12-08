import PropertiesToAnimateObject from './properties-to-animate-object';
declare type Keyframes = (PropertiesToAnimateObject & {
    offset?: number | number[];
})[];
export default Keyframes;
