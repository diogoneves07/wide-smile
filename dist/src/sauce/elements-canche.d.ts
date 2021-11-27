declare type ElementsCanche = Record<string, {
    target: HTMLElement;
    data: {
        computedStyle: CSSStyleDeclaration;
        bestComputedStyle: () => Record<string, string>;
        startComputedStyle: Record<string, string>;
    };
}[]>;
declare const ELEMENTS_CANCHE: ElementsCanche;
declare type ElementData = typeof ELEMENTS_CANCHE[string][number]['data'];
declare type ElementDataWithMethods = Required<ElementData>;
export declare function useElementCanche(target: HTMLElement): ElementDataWithMethods;
export {};
