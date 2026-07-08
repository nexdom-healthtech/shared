/**
 * Emit a custom event.
 * @param type custom event name
 * @param detail any data to attach to the event
 */
export function emitCustomEvent<T>(type: string, detail?: T) {
  const customEvent = new CustomEvent<T>(type, { detail });
  window.dispatchEvent(customEvent);
}

export function listenEvent<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.addEventListener<K>>
): () => void;
export function listenEvent(...params: Parameters<typeof window.addEventListener>): () => void;
export function listenEvent(...params: Parameters<typeof window.addEventListener>) {
  window.addEventListener(...params);
  return () => removeListener(...params);
}

export function removeListener<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.removeEventListener<K>>
): void;
export function removeListener(...params: Parameters<typeof window.removeEventListener>): void;
export function removeListener(...params: Parameters<typeof window.removeEventListener>) {
  window.removeEventListener(...params);
}
