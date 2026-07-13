import { shrinkText, toCamel, toKebab, toSentence, toTitle } from "@/utils/text.ts";

describe("text", () => {
  describe("toKebab", () => {
    it("should transform any text into kebab case", () => {
      const text = "Hello World";
      const result = toKebab(text);
      expect(result).toBe("hello-world");
    });

    it("should trim received text", () => {
      const text = " Hello World ";
      const result = toKebab(text);
      expect(result).toBe("hello-world");
    });
  });

  describe("toCamel", () => {
    it("should transform any text into camel case", () => {
      const text = "Hello World";
      const result = toCamel(text);
      expect(result).toBe("helloWorld");
    });
  });

  describe("toTitle", () => {
    it("should transform any text into title case", () => {
      const text = "hello world";
      const result = toTitle(text);
      expect(result).toBe("Hello World");
    });
  });

  describe("toSentence", () => {
    it("should transform any text into sentence case", () => {
      const text = "hello world";
      const result = toSentence(text);
      expect(result).toBe("Hello world");
    });
  });

  describe("shrinkText", () => {
    it("should return only the first and last words", () => {
      const text1 = "hello world, this is a test";
      const result1 = shrinkText(text1);
      expect(result1).toBe("hello test");

      const text2 = "hello";
      const result2 = shrinkText(text2);
      expect(result2).toBe("hello");
    });
  });
});
