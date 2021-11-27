import { WIDE_SMILE_PROPERTIES_PREFIX } from '../sauce/constants';
export declare function removeKeyframesPropertyPrefix(property: string, prefix?: string): string;
export declare function getPropertyType(propertyName: string): keyof typeof WIDE_SMILE_PROPERTIES_PREFIX | false;
