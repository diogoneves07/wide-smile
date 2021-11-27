import PropertiesToAnimateObject from './properties-to-animate-object';
declare type Keyframes = (PropertiesToAnimateObject & {
    dur?: number;
})[];
export default Keyframes;
