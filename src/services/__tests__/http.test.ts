import SharedApiError from "@/models/shared-api-error.ts";
import http from "@/services/http.ts";
import {
  uri as pingUri,
  forbiddenUri as pingForbiddenUri,
  response as pingResponse,
} from "@mocks/ping/index.ts";

const invalidUri = "this-is-not-an-uri";

const postPayload = { testingPost: true };
const putPayload = { testingPut: true };

const methods = [
  { method: "get", callback: (uri: string) => http.get(uri), payload: {} },
  {
    method: "post",
    callback: (uri: string) => http.post(uri, postPayload),
    payload: postPayload,
  },
  {
    method: "put",
    callback: (uri: string) => http.put(uri, putPayload),
    payload: putPayload,
  },
  { method: "delete", callback: (uri: string) => http.delete(uri), payload: {} },
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
