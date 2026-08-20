import SharedApiError from "@/models/errors/shared-api-error.ts";
import { Methods } from "@/services/enums.ts";
import type { HttpOptions } from "@/services/types.ts";
import type { PartialDeep } from "type-fest";

/**
 * API to trigger REST API requests.
 */
export default class Http {
  private constructor() {}

  /**
   * Dispatch a GET request.
   * @param url full URL to request
   * @param options [optional] object containing request headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async get<T>(url: string, options?: Omit<HttpOptions, "body">): Promise<PartialDeep<T>> {
    return await this.request<T>(url, Methods.GET, options);
  }

  /**
   * Dispatch a POST request.
   * @param url full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async post<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(url, Methods.POST, options);
  }

  /**
   * Dispatch a PUT request.
   * @param url full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async put<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(url, Methods.PUT, options);
  }

  /**
   * Dispatch a PATCH request.
   * @param url full URL to request
   * @param options [optional] object containing request body and headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async patch<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>> {
    return await this.request<T>(url, Methods.PATCH, options);
  }

  /**
   * Dispatch a DELETE request.
   * @param url full URL to request
   * @param options [optional] object containing request headers
   * @returns a promise resolving the response of the request or throws an error if the request wasn't a success
   */
  static async delete<T>(
    url: string,
    options?: Omit<HttpOptions, "body">,
  ): Promise<PartialDeep<T>> {
    return await this.request<T>(url, Methods.DELETE, options);
  }

  private static async request<T>(
    url: string,
    method: Methods,
    { body, headers }: HttpOptions = {},
  ): Promise<PartialDeep<T>> {
    try {
      const requestInit: RequestInit = { method };
      requestInit.body = JSON.stringify(body);
      requestInit.headers = new Headers(headers);

      const response = await fetch(url, requestInit);
      const json = await this.toJSON<T>(response);

      if (!response.ok) {
        const message = this.generateErrorMessage(method, url, response.statusText);
        throw new SharedApiError(message, { status: response.status, body: json });
      }

      return json;
    } catch (e: unknown) {
      if (e instanceof SharedApiError) throw e;

      const message = this.generateErrorMessage(method, url);
      throw new SharedApiError(message);
    }
  }

  private static generateErrorMessage(method: string, url: string, statusText?: string) {
    const status = statusText ? ` ${statusText}` : "";
    return `${method} to ${url}${status}`;
  }

  private static async toJSON<T>(response: Response): Promise<PartialDeep<T>> {
    try {
      return await response.json();
    } catch {
      return {} as PartialDeep<T>;
    }
  }
}
