import { currentDateTime, formatDateTime, toDate } from "@/utils/date-time.ts";

describe("dateTime", () => {
  describe("currentDateTime", () => {
    const date = new Date();

    it("should return pt-BR format by default", () => {
      const current = currentDateTime();
      expect(current).toBe(date.toLocaleDateString("pt-BR"));
    });

    it("should accept formats", () => {
      const current = currentDateTime("YYYY-MM-DD");
      expect(current).toBe(date.toLocaleDateString("fr-CA"));
    });

    it("should handle time formats", () => {
      const current = currentDateTime("DD/MM/YYYY, HH:mm:ss");
      expect(current).toBe(date.toLocaleString("pt-BR"));
    });
  });

  describe("formatDateTime", () => {
    const date = new Date("2026-09-15 00:00:00");

    it("should handle Date instance and return pt-BR by default", () => {
      expect(formatDateTime(date)).toBe(date.toLocaleDateString("pt-BR"));
    });

    it("should accept format", () => {
      expect(formatDateTime(date, "YYYY-MM-DD")).toBe(date.toLocaleDateString("fr-CA"));
    });

    it("should handle time formats", () => {
      expect(formatDateTime(date, "DD/MM/YYYY, HH:mm:ss")).toBe(date.toLocaleString("pt-BR"));
    });
  });

  describe("toDate", () => {
    const stringDate = "2025-09-15 15:21:43";
    const date = new Date(stringDate);

    it("should return a Date instance from a string", () => {
      const result = toDate(stringDate, "YYYY-MM-DD HH:mm:ss");
      expect(result.getTime()).toBe(date.getTime());
    });
  });
});
