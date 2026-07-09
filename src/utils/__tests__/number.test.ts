import { padStart, toNumber } from "@/utils/number.ts";

describe("number", () => {
  describe("toNumber", () => {
    it("should convert invalid values to default value", () => {
      expect(toNumber()).toBe(0);
      expect(toNumber(null, 1)).toBe(1);
      expect(toNumber("xyz", 2)).toBe(2);
    });

    it("should convert strings to its correspondent number", () => {
      const text = "015";
      expect(toNumber(text)).toBe(15);
    });
  });

  describe("padStart", () => {
    it("should return a string filled from start", () => {
      const number = 5;
      expect(padStart(number)).toBe("05");
      expect(padStart(number, 3, "1")).toBe("115");
    });
  });
});
