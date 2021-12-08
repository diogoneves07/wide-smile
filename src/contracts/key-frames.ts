import PropertiesToAnimateObject from './properties-to-animate-object';

type Keyframes = (PropertiesToAnimateObject & { offset?: number | number[] })[];
export default Keyframes;
