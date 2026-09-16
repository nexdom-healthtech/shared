/**
 * Emit a custom event.
 * @param type custom event name
 * @param detail any data to attach to the event
 */
export function emitCustomEvent<T>(type: string, detail?: T) {
  const customEvent = new CustomEvent<T>(type, { detail });
  globalThis.dispatchEvent(customEvent);
}

/**
 * Add a listener to an event and returns a callback to remove it.
 * @param params same from [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters)
 * @return a function that removes the event listener
 */
export function listenEvent<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof globalThis.addEventListener<K>>
): () => void;
export function listenEvent(...params: Parameters<typeof globalThis.addEventListener>): () => void;
export function listenEvent(...params: Parameters<typeof globalThis.addEventListener>) {
  globalThis.addEventListener(...params);
  return () => removeListener(...params);
}

/**
 * Removes an event listener.
 * @param params same from [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters)
 */
export function removeListener<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof globalThis.removeEventListener<K>>
): void;
export function removeListener(...params: Parameters<typeof globalThis.removeEventListener>): void;
export function removeListener(...params: Parameters<typeof globalThis.removeEventListener>) {
  globalThis.removeEventListener(...params);
}
