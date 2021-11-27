/**
 * Attempts to reduce CSS string rules by applying to an element outside of the document and returning the result.
 */
const reduceCSSStringRules = (() => {
  const DIV_ELEMENT_STYLE = document.createElement('div').style;
  return (CSSStringRules: string) => {
    DIV_ELEMENT_STYLE.cssText = CSSStringRules;
    return DIV_ELEMENT_STYLE.cssText;
  };
})();
export default reduceCSSStringRules;
