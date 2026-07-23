import SharedError from "@/models/shared-error.ts";

/**
 * Custom API error instance, based on native `Error`.
 */
export default class SharedApiError<T> extends SharedError {
  status?: number;
  body?: T;

  constructor(message: string, details: Details<T> = {}) {
    super(message);
    this.name = "SharedApiError";
    this.status = details.status;
    this.body = details.body;
  }
}

interface Details<T> {
  status?: number;
  body?: T;
}
