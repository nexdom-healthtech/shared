import { deleteCookie, getCookie, setCookie } from "@/utils/cookie.ts";

describe("cookie", () => {
  const key = "biscuit";

  describe("getCookie", () => {
    it("should retrieve cookies according to the provided key", async () => {
      const expectedValue = "this is a cookie!";
      await cookieStore.set(key, expectedValue);

      const value = await getCookie(key);
      expect(value).toBe(expectedValue);
    });

    it("should return an empty string for missing keys", async () => {
      const value = await getCookie("something random here");
      expect(value).toBe("");
    });
  });

  describe("setCookie", () => {
    it("should register a cookie and relate it to its key", async () => {
      const expectedValue = "this is a new cookie!";

      await setCookie(key, expectedValue);

      const value = await getCookie(key);
      expect(value).toBe(expectedValue);
    });
  });

  describe("deleteCookie", () => {
    it("should remove a cookie by its key", async () => {
      await deleteCookie(key);

      const value = await getCookie(key);
      expect(value).toBe("");
    });
  });
});
