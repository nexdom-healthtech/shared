import {
  currentDateTime,
  formatDateTime,
  formatPeriodInterval,
  toDate,
  toPeriodInterval,
} from "@/utils/date-time/index.ts";

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
    const date = new Date("2001-12-10 00:00:00");

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
    const stringDate = "2002-12-18 15:21:43";
    const date = new Date(stringDate);

    it("should return a Date instance from a string", () => {
      const result = toDate(stringDate, "YYYY-MM-DD HH:mm:ss");
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("toPeriodInterval", () => {
    beforeEach(() => {
      vi.setSystemTime(new Date("2029-11-16 18:43:50"));
    });

    it("should return the interval until today by default", () => {
      const date1 = new Date("2028-12-10 19:42:55");
      const interval1 = toPeriodInterval(date1);
      expect(interval1.years).toBe(0);
      expect(interval1.months).toBe(11);
      expect(interval1.days).toBe(5);
      expect(interval1.hours).toBe(23);
      expect(interval1.minutes).toBe(0);
      expect(interval1.seconds).toBe(55);

      const date2 = new Date("2025-09-15 15:21:43");
      const interval2 = toPeriodInterval(date2);
      expect(interval2.years).toBe(4);
      expect(interval2.months).toBe(2);
      expect(interval2.days).toBe(1);
      expect(interval2.hours).toBe(3);
      expect(interval2.minutes).toBe(22);
      expect(interval2.seconds).toBe(7);
    });

    it("should return an object with the time interval between both dates", () => {
      const date1 = new Date("1991-10-03 14:35:01");
      const date2 = new Date("2026-06-03 10:43:50");
      const interval = toPeriodInterval(date1, date2);
      expect(interval.years).toBe(34);
      expect(interval.months).toBe(7);
      expect(interval.days).toBe(30);
      expect(interval.hours).toBe(20);
      expect(interval.minutes).toBe(8);
      expect(interval.seconds).toBe(49);
    });
  });

  describe("formatPeriodInterval", () => {
    it("should return an interval according to the specified format", () => {
      const date1 = new Date("2001-12-19 19:45:00");
      const date2 = new Date("2003-12-17 19:30:05");
      const interval = toPeriodInterval(date1, date2);

      const format1 = "YYYYyears, MMmonths, DDdays, HHhours, mmminutes, ssseconds";
      expect(formatPeriodInterval(interval, format1)).toBe(
        "1years, 11months, 27days, 23hours, 45minutes, 5seconds",
      );

      const format2 = "MMmon, DDd, HHhrs, mmmin, sssec";
      expect(formatPeriodInterval(interval, format2)).toBe("23mon, 27d, 23hrs, 45min, 5sec");

      const format3 = "DDd, HHhrs, mmmin, sssec";
      expect(formatPeriodInterval(interval, format3)).toBe("727d, 23hrs, 45min, 5sec");

      const format4 = "HHh";
      expect(formatPeriodInterval(interval, format4)).toBe(`${(17471).toLocaleString()}h`);

      const format5 = "mmm";
      expect(formatPeriodInterval(interval, format5)).toBe(`${(1048305).toLocaleString()}m`);

      const format6 = "sssec";
      expect(formatPeriodInterval(interval, format6)).toBe(`${(62898305).toLocaleString()}sec`);
    });
  });
});
