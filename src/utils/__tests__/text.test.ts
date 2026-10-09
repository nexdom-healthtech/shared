import {
  mask,
  shrinkText,
  toCamel,
  toInitials,
  toKebab,
  toSentence,
  toTitle,
  unmask,
} from "@/utils/text.ts";

describe("text", () => {
  describe("toKebab", () => {
    it("should transform any text into kebab case", () => {
      const text = "Hello  World";
      const result = toKebab(text);
      expect(result).toBe("hello-world");
    });

    it("should trim received text", () => {
      const text = " Hello World ";
      const result = toKebab(text);
      expect(result).toBe("hello-world");
    });

    it("should return empty strings as empty", () => {
      expect(toKebab("")).toBe("");
    });
  });

  describe("toCamel", () => {
    it("should transform any text into camel case", () => {
      const text = "Hello World";
      const result = toCamel(text);
      expect(result).toBe("helloWorld");
    });

    it("should return empty strings as empty", () => {
      expect(toCamel("")).toBe("");
    });
  });

  describe("toTitle", () => {
    it("should transform any text into title case", () => {
      const text = "hello world";
      const result = toTitle(text);
      expect(result).toBe("Hello World");
    });

    it("should return empty strings as empty", () => {
      expect(toTitle("")).toBe("");
    });
  });

  describe("toSentence", () => {
    it("should transform any text into sentence case", () => {
      const text = "hello world";
      const result = toSentence(text);
      expect(result).toBe("Hello world");
    });

    it("should return empty strings as empty", () => {
      expect(toSentence("")).toBe("");
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

    it("should trim received text", () => {
      const text = " hello world, this is a test ";
      const result = shrinkText(text);
      expect(result).toBe("hello test");
    });

    it("should return empty strings as empty", () => {
      expect(shrinkText("")).toBe("");
    });
  });

  describe("toInitials", () => {
    it("should return the first letter of the first and last words in upper cased", () => {
      expect(toInitials("hello world")).toBe("HW");
      expect(toInitials("hello world, test")).toBe("HT");
    });

    it("should trim received text", () => {
      const text = " hello world, this is a test ";
      expect(toInitials(text)).toBe("HT");
    });

    it("should return only the first letter when text has one word", () => {
      expect(toInitials("hello")).toBe("H");
    });

    it("should return empty strings as empty", () => {
      expect(toInitials("")).toBe("");
    });
  });

  describe("mask", () => {
    const phone = "(##) #####-####";

    it("should replace each # of the pattern with the next digit of the value", () => {
      expect(mask("99999999999", phone)).toBe("(99) 99999-9999");
      expect(mask("11987654321", "+55 (##) #####-####")).toBe("+55 (11) 98765-4321");
      expect(mask("1234", "Nº ####")).toBe("Nº 1234");
    });

    it("should end right after the last filled #", () => {
      expect(mask("119", phone)).toBe("(11) 9");
      expect(mask("11", phone)).toBe("(11");
      expect(mask("1", phone)).toBe("(1");
      expect(mask("123", "###.###.###-##")).toBe("123");
      expect(mask("12", "##-##")).toBe("12");
      expect(mask("123", "##-##")).toBe("12-3");
    });

    it("should ignore characters of the value that aren't digits", () => {
      expect(mask("ab11cd98765-4321", phone)).toBe("(11) 98765-4321");
    });

    it("should keep a value already masked with the same pattern", () => {
      expect(mask("(11) 98765-4321", phone)).toBe("(11) 98765-4321");
    });

    it("should discard digits beyond the # of the pattern", () => {
      expect(mask("119876543210000", phone)).toBe("(11) 98765-4321");
    });

    it("should pad numbers with leading zeros up to the # of the pattern", () => {
      expect(mask(11987654321, phone)).toBe("(11) 98765-4321");
      expect(mask(1310100, "#####-###")).toBe("01310-100");
      expect(mask(0, "##")).toBe("00");
      expect(mask(-12.5, "###")).toBe("125");
      expect(mask(1234, "##")).toBe("12");
    });

    it("should not pad strings", () => {
      expect(mask("1310100", "#####-###")).toBe("13101-00");
    });

    it("should return an empty string when the value has no digits", () => {
      expect(mask("", phone)).toBe("");
      expect(mask("abc", phone)).toBe("");
      expect(mask(Number.NaN, phone)).toBe("");
      expect(mask(Infinity, phone)).toBe("");
    });

    it("should return an empty string when the pattern has no #", () => {
      expect(mask("123", "abc")).toBe("");
      expect(mask("123", "")).toBe("");
    });
  });

  describe("unmask", () => {
    const phone = "(##) #####-####";

    it("should keep only the digits that fill the # of the pattern", () => {
      expect(unmask("(99) 99999-9999", phone)).toBe("99999999999");
      expect(unmask("a1b2", "##")).toBe("12");
    });

    it("should discard digits beyond the # of the pattern", () => {
      expect(unmask("(11) 98765-43210", phone)).toBe("11987654321");
    });

    it("should not remove digits written in the pattern", () => {
      expect(unmask("+55 (11) 98765-4321", "+55 (##) #####-####")).toBe("55119876543");
    });

    it("should pad numbers with leading zeros up to the # of the pattern", () => {
      expect(unmask(11987654321, phone)).toBe("11987654321");
      expect(unmask(1310100, "#####-###")).toBe("01310100");
    });

    it("should not pad strings", () => {
      expect(unmask("1310100", "#####-###")).toBe("1310100");
    });

    it("should return an empty string when the value has no digits", () => {
      expect(unmask("", phone)).toBe("");
      expect(unmask(Number.NaN, phone)).toBe("");
    });

    it("should return an empty string when the pattern has no #", () => {
      expect(unmask("123", "abc")).toBe("");
    });

    it("should be consistent with mask", () => {
      const values = ["", "1", "119", "11987654321", "(11) 98765-43210", "ab11cd9"];
      for (const value of values) {
        expect(unmask(mask(value, phone), phone)).toBe(unmask(value, phone));
        expect(mask(unmask(value, phone), phone)).toBe(mask(value, phone));
      }
      expect(unmask(mask(1310100, "#####-###"), "#####-###")).toBe(unmask(1310100, "#####-###"));
    });
  });
});
