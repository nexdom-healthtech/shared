import SharedApiError from "@/models/errors/shared-api-error.ts";
import { METHODS } from "@/services/enums.ts";
import type { HttpOptions } from "@/services/types.ts";
import type { PartialDeep } from "type-fest";

/**
 * API to trigger REST API requests.
 */
export default class Http {
  private constructor() {}

  /**
   * Dispatch a GET request.
   * @param uri full URL to request
   * @param options [optional] object containing request headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async get<T>(uri: string, options?: Omit<HttpOptions, "body">): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.GET, options);
  }

  /**
   * Dispatch a POST request.
   * @param uri full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async post<T>(uri: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.POST, options);
  }

  /**
   * Dispatch a PUT request.
   * @param uri full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async put<T>(uri: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.PUT, options);
  }

  /**
   * Dispatch a PATCH request.
   * @param uri full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async patch<T>(uri: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.PATCH, options);
  }

  /**
   * Dispatch a DELETE request.
   * @param uri full URL to request
   * @param options [optional] object containing request headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async delete<T>(
    uri: string,
    options?: Omit<HttpOptions, "body">,
  ): Promise<PartialDeep<T>> {
    return await this.request<T>(uri, METHODS.DELETE, options);
  }

  private static async request<T>(
    uri: string,
    method: METHODS,
    { body, headers }: HttpOptions = {},
  ): Promise<PartialDeep<T>> {
    try {
      const requestInit: RequestInit = { method };
      if (body) requestInit.body = JSON.stringify(body);
      if (headers) requestInit.headers = new Headers(headers);

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
