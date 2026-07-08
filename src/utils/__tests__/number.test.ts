import { toNumber } from "@/utils/number.ts";

describe("number", () => {
  describe("toNumber", () => {
    it("should convert nullable to default value", () => {
      expect(toNumber()).toBe(0);
      expect(toNumber(null, 1)).toBe(1);
    });

    it("should convert strings to its correspondent number", () => {
      const text = "015";
      expect(toNumber(text)).toBe(15);
    });
  });
});
