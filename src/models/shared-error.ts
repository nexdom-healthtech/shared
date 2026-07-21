/**
 * Custom error instance, based on native `Error`.
 */
export default class SharedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SharedError";
  }
}
