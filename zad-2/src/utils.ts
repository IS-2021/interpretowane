export function getElement<TReturn extends Element>(selector: string): TReturn {
  const el = document.querySelector<TReturn>(selector);
  if (!el) {
    throw Error(`Element with ${selector} not found.`);
  }
  return el;
}