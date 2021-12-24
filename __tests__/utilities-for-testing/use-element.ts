export default function useElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
) {
  const element = document.createElement(tag);
  document.body.appendChild(element);
  return element;
}
