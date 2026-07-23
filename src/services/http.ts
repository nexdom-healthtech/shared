import SharedApiError from "@/models/shared-api-error.ts";
import { METHODS } from "@/services/enums.ts";
import type { HttpBody } from "@/services/types.ts";
import type { PartialDeep } from "type-fest";

/**
 * API to trigger REST API requests.
 */
export default class http {
  private constructor() {}

  /**
   * Dispatch a GET request.
   * @param uri full URL to request
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async get<T>(uri: string): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.GET);
  }

  /**
   * Dispatch a POST request.
   * @param uri full URL to request
   * @param body option object to be sent on the body of the request
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async post<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.POST, body);
  }

  /**
   * Dispatch a PUT request.
   * @param uri full URL to request
   * @param body option object to be sent on the body of the request
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async put<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.PUT, body);
  }

  /**
   * Dispatch a PATCH request.
   * @param uri full URL to request
   * @param body option object to be sent on the body of the request
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async patch<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.PATCH, body);
  }

  /**
   * Dispatch a DELETE request.
   * @param uri full URL to request
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async delete<T>(uri: string): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.DELETE);
  }

  private static async request<T>(
    uri: string,
    method: METHODS,
    body?: HttpBody,
  ): Promise<PartialDeep<T>> {
    try {
      const requestInit: RequestInit = { method };
      if (body) requestInit.body = JSON.stringify(body);

      const response = await fetch(uri, requestInit);
      const json = await this.toJSON<T>(response);

      if (!response.ok) {
        const message = this.generateErrorMessage(method, uri, response.statusText);
        throw new SharedApiError(message, { status: response.status, body: json });
      }

      return json;
    } catch (e: unknown) {
      if (e instanceof SharedApiError) throw e;

      const message = this.generateErrorMessage(method, uri);
      throw new SharedApiError(message);
    }
  }

  private static generateErrorMessage(method: string, uri: string, statusText?: string) {
    const status = statusText ? ` ${statusText}` : "";
    return `${method} to ${uri}${status}`;
  }

  private static async toJSON<T>(response: Response): Promise<PartialDeep<T>> {
    try {
      return await response.json();
    } catch {
      return {} as PartialDeep<T>;
    }
  }
}
