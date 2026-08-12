import SharedApiError from "@/models/errors/shared-api-error.ts";
import http from "@/services/http.ts";
import {
  uri as pingUri,
  forbiddenUri as pingForbiddenUri,
  response as pingResponse,
  authorization as pintAuthorization,
} from "@mocks/ping/index.ts";

const invalidUri = "this-is-not-an-uri";
const headers = { Authorization: pintAuthorization };
const requestOptions = { headers };

const postPayload = { testingPost: true };
const putPayload = { testingPut: true };
const patchPayload = { testingPatch: true };

const methods = [
  { method: "get", callback: (uri: string) => http.get(uri, requestOptions), payload: {} },
  {
    method: "post",
    callback: (uri: string) => http.post(uri, { ...requestOptions, body: postPayload }),
    payload: postPayload,
  },
  {
    method: "put",
    callback: (uri: string) => http.put(uri, { ...requestOptions, body: putPayload }),
    payload: putPayload,
  },
  {
    method: "patch",
    callback: (uri: string) => http.patch(uri, { ...requestOptions, body: patchPayload }),
    payload: patchPayload,
  },
  { method: "delete", callback: (uri: string) => http.delete(uri, requestOptions), payload: {} },
];

describe("http", () => {
  describe.each(methods)("$method", ({ method, payload, callback }) => {
    it(`should be able to perform a ${method.toUpperCase()} request`, async () => {
      const response = await callback(pingUri);
      expect(response).toEqual({ ...pingResponse, ...payload, [method]: true });
    });

    it("should be able to handle a network error", async () => {
      const response = callback(invalidUri);
      await expect(response).rejects.toThrow(SharedApiError);
      await expect(response).rejects.toThrow(
        expect.objectContaining({ message: `${method.toUpperCase()} to ${invalidUri}` }),
      );
    });

    it("should be able to handle a HTTP error", async () => {
      const response = callback(pingForbiddenUri);
      await expect(response).rejects.toThrow(SharedApiError);
      await expect(response).rejects.toThrow(
        expect.objectContaining({
          message: `${method.toUpperCase()} to ${pingForbiddenUri} Forbidden`,
          status: 403,
        }),
      );
    });
  });
});
