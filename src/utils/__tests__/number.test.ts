import { padStart, toNumber, toPositiveNumber } from "@/utils/number.ts";

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

    it("should return default value for undefined or null", () => {
      const defaultValue = 123;
      expect(toNumber(undefined, defaultValue)).toBe(defaultValue);
      expect(toNumber(null, defaultValue)).toBe(defaultValue);
    });
  });

  describe("padStart", () => {
    it("should return a string filled from start", () => {
      const number = 5;
      expect(padStart(number)).toBe("05");
      expect(padStart(number, 3, "1")).toBe("115");
    });
  });

  describe("toPositiveNumber", () => {
    it("should return positive value unchanged", () => {
      expect(toPositiveNumber(5)).toBe(5);
      expect(toPositiveNumber(100)).toBe(100);
    });

    it("should clamp negative value to 0", () => {
      expect(toPositiveNumber(-5)).toBe(0);
      expect(toPositiveNumber(-100)).toBe(0);
    });

    it("should return 0 as 0", () => {
      expect(toPositiveNumber(0)).toBe(0);
    });
  });
});
