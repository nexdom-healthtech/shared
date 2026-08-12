import SharedApiError from "@/models/errors/shared-api-error.ts";
import http from "@/services/http.ts";
import {
  url as pingUrl,
  forbiddenUrl as pingForbiddenUrl,
  response as pingResponse,
  authorization as pintAuthorization,
} from "@mocks/ping/index.ts";

const invalidUrl = "this-is-not-an-url";
const headers = { Authorization: pintAuthorization };
const requestOptions = { headers };

const postPayload = { testingPost: true };
const putPayload = { testingPut: true };
const patchPayload = { testingPatch: true };

const methods = [
  { method: "get", callback: (url: string) => http.get(url, requestOptions), payload: {} },
  {
    method: "post",
    callback: (url: string) => http.post(url, { ...requestOptions, body: postPayload }),
    payload: postPayload,
  },
  {
    method: "put",
    callback: (url: string) => http.put(url, { ...requestOptions, body: putPayload }),
    payload: putPayload,
  },
  {
    method: "patch",
    callback: (url: string) => http.patch(url, { ...requestOptions, body: patchPayload }),
    payload: patchPayload,
  },
  { method: "delete", callback: (url: string) => http.delete(url, requestOptions), payload: {} },
];

describe("http", () => {
  describe.each(methods)("$method", ({ method, payload, callback }) => {
    it(`should be able to perform a ${method.toUpperCase()} request`, async () => {
      const response = await callback(pingUrl);
      expect(response).toEqual({ ...pingResponse, ...payload, [method]: true });
    });

    it("should be able to handle a network error", async () => {
      const response = callback(invalidUrl);
      await expect(response).rejects.toThrow(SharedApiError);
      await expect(response).rejects.toThrow(
        expect.objectContaining({ message: `${method.toUpperCase()} to ${invalidUrl}` }),
      );
    });

    it("should be able to handle a HTTP error", async () => {
      const response = callback(pingForbiddenUrl);
      await expect(response).rejects.toThrow(SharedApiError);
      await expect(response).rejects.toThrow(
        expect.objectContaining({
          message: `${method.toUpperCase()} to ${pingForbiddenUrl} Forbidden`,
          status: 403,
        }),
      );
    });
  });
});
