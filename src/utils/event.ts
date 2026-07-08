/**
 * Emit a custom event.
 * @param type custom event name
 * @param detail any data to attach to the event
 */
export function emitCustomEvent<T>(type: string, detail?: T) {
  const customEvent = new CustomEvent<T>(type, { detail });
  window.dispatchEvent(customEvent);
}

/**
 * Add a listener to an event and returns a callback to remove it.
 * @param params same from [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters)
 * @return a function that removes the event listener
 */
export function listenEvent<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.addEventListener<K>>
): () => void;
export function listenEvent(...params: Parameters<typeof window.addEventListener>): () => void;
export function listenEvent(...params: Parameters<typeof window.addEventListener>) {
  window.addEventListener(...params);
  return () => removeListener(...params);
}

/**
 * Removes an event listener.
 * @param params same from [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters)
 */
export function removeListener<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.removeEventListener<K>>
): void;
export function removeListener(...params: Parameters<typeof window.removeEventListener>): void;
export function removeListener(...params: Parameters<typeof window.removeEventListener>) {
  window.removeEventListener(...params);
}
