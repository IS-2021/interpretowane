import JQuery from "jquery";

export function getElement<TElement extends HTMLElement>(selector: string) {
  const el = JQuery<TElement>(selector);
  if (!el) {
    throw Error(`Element with ${selector} not found.`);
  }
  return el;
}
