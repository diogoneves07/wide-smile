interface AnimableProperties {
    scrollLeft: string;
    scrollTop: string;
    CSSTransformFunctions: {
        matrix: string;
        matrix3d: string;
        perspective: string;
        rotate: string;
        rotate3d: string;
        rotateX: string;
        rotateY: string;
        rotateZ: string;
        translate: string;
        translate3d: string;
        translateX: string;
        translateY: string;
        translateZ: string;
        scale: string;
        scale3d: string;
        scaleX: string;
        scaleY: string;
        scaleZ: string;
        skew: string;
        skewX: string;
        skewY: string;
    };
}
declare type AllProperties = Partial<Omit<AnimableProperties, 'CSSTransformFunctions'> & AnimableProperties[keyof Pick<AnimableProperties, 'CSSTransformFunctions'>]>;
declare type AllAnimableProperties = keyof (HTMLElement['style'] & AllProperties) | keyof HTMLElement | keyof AnimableProperties;
export default AllAnimableProperties;
