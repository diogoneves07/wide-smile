interface Properties {
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
declare type AllProperties = Partial<Omit<Properties, 'CSSTransformFunctions'> & Properties[keyof Pick<Properties, 'CSSTransformFunctions'>]>;
declare type AnimableProperties = keyof (HTMLElement['style'] & AllProperties) | keyof HTMLElement;
export default AnimableProperties;
