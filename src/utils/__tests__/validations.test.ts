import { isEmail, isEmpty, isPhone, isUrl } from "@/utils/validations.ts";

describe("validations", () => {
  describe("isEmpty", () => {
    it("should return true only when the provided value is filled", () => {
      expect(isEmpty()).toBeTruthy();
      expect(isEmpty("")).toBeTruthy();
      expect(isEmpty(" ")).toBeTruthy();
      expect(isEmpty("something")).toBeFalsy();
    });
  });

  describe("isPhone", () => {
    it("should return true only when the provided value is a valid phone number", () => {
      expect(isPhone("")).toBeFalsy();
      expect(isPhone(" ")).toBeFalsy();
      expect(isPhone("(11) 98888-88889")).toBeFalsy();
      expect(isPhone("1198888-88889")).toBeFalsy();
      expect(isPhone("(11) 98888-8888")).toBeTruthy();
      expect(isPhone("11988888888")).toBeTruthy();
      expect(isPhone("(47) 3456-7890")).toBeTruthy();
      expect(isPhone("+55 47 3456-7890")).toBeTruthy();
      expect(isPhone("+55 47 34567890")).toBeTruthy();
    });
  });

  describe("isEmail", () => {
    it("should return true only when the provided value is a valid e-mail address", () => {
      expect(isEmail("")).toBeFalsy();
      expect(isEmail(" ")).toBeFalsy();
      expect(isEmail("test@gmail")).toBeFalsy();
      expect(isEmail("test.test@gmail")).toBeFalsy();
      expect(isEmail("admin@gmail.com")).toBeTruthy();
      expect(isEmail("McLovin.Hawaii@gmail.com.br")).toBeTruthy();
      expect(isEmail("ned-schneebly_2003@hotmail.com")).toBeTruthy();
    });
  });

  describe("isUrl", () => {
    it("should return true only when the provided value is a valid URL", () => {
      expect(isUrl("")).toBeFalsy();
      expect(isUrl(" ")).toBeFalsy();
      expect(isUrl("ftp://invalid-protocol.com")).toBeFalsy();
      expect(isUrl("http://localhost:8080")).toBeTruthy();
      expect(isUrl("https://example.com")).toBeTruthy();
      expect(isUrl("https://example.com/path")).toBeTruthy();
      expect(isUrl("https://example.com/path?q=this+is+a+search")).toBeTruthy();
    });
  });
});
