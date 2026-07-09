export default class SharedError extends Error {
  constructor(message: string) {
    super(`[shared]: ${message}`);
  }
}
