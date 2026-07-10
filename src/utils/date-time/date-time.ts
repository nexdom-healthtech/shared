import { toNumber, padStart } from "@/utils/number.ts";
import SharedError from "@/models/error.ts";
import type { TimePeriod } from "@/utils/date-time/types.ts";
import { FORMAT } from "@/utils/date-time/enums.ts";

/**
 * Returns current date and time on the specified format (default: `DD/MM/YYYY`).
 * @param format token format (e.g. "YYYY-MM-DD" => "2026-08-07")
 * @returns formatted date
 */
export function currentDateTime(format?: string) {
  return formatDateTime(new Date(), format);
}

/**
 * Format date according to specification (default: `DD/MM/YYYY`).
 * @param date native Date instance
 * @param format token format (e.g. "YYYY-MM-DD" => "2026-08-07")
 * @returns formatted date
 */
export function formatDateTime(
  date: Date,
  format = `${FORMAT.DAY}/${FORMAT.MONTH}/${FORMAT.YEAR}`,
) {
  const parsedDate = parseDate(date);
  return toFormat(parsedDate, format);
}

/**
 * Parse a text into a Date instance.
 * @param text any string you need
 * @param format token format (e.g. "YYYY-MM-DD" => "2026-08-07")
 * @returns native Date instance
 */
export function toDate(text: string, format: string): Date {
  let regexString = format
    .replace(FORMAT.YEAR, "(?<year>\\d{4})")
    .replace(FORMAT.MONTH, "(?<month>\\d{2})")
    .replace(FORMAT.DAY, "(?<day>\\d{2})")
    .replace(FORMAT.HOURS, "(?<hours>\\d{2})")
    .replace(FORMAT.MINUTES, "(?<minutes>\\d{2})")
    .replace(FORMAT.SECONDS, "(?<seconds>\\d{2})");

  const parsedDate = new RegExp(regexString).exec(text)?.groups;
  if (!parsedDate)
    throw new SharedError(`Date "${text}" doesn't match specified format "${format}"`);

  const day = toNumber(parsedDate.day);
  const month = toNumber(parsedDate.month) - 1;
  const year = toNumber(parsedDate.year);
  const hours = toNumber(parsedDate.hours);
  const minutes = toNumber(parsedDate.minutes);
  const seconds = toNumber(parsedDate.seconds);
  return new Date(year, month, day, hours, minutes, seconds);
}

/**
 * Confirms the possibility to parse a text into a Date instance.
 * @param text any string you need
 * @param format token format (e.g. "YYYY-MM-DD" => "2026-08-07")
 */
export function isValidDateTime(text: string, format: string): boolean {
  try {
    toDate(text, format);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns a new Date instance after navigate time period.
 * @param navigatedDate native Date instance
 * @param period [TimePeriod] partial TimePeriod to navigate (e.g. { years: 2, months: -1 })
 * @returns an updated Date instance
 */
export function navigatePeriod(date: Date, period: Partial<TimePeriod>) {
  const navigatedDate = new Date(date);
  if (period.years) navigatedDate.setFullYear(navigatedDate.getFullYear() + period.years);
  if (period.months) navigatedDate.setMonth(navigatedDate.getMonth() + period.months);
  if (period.days) navigatedDate.setDate(navigatedDate.getDate() + period.days);
  if (period.hours) navigatedDate.setHours(navigatedDate.getHours() + period.hours);
  if (period.minutes) navigatedDate.setMinutes(navigatedDate.getMinutes() + period.minutes);
  if (period.seconds) navigatedDate.setSeconds(navigatedDate.getSeconds() + period.seconds);
  return navigatedDate;
}

/**
 * Format period interval according to specification.
 * @param period object returned from `toPeriodInterval`
 * @param format token format (e.g. "YYYYy, MMm, DDd" => "2y, 8m, 10d")
 * @returns a string according to the provided format
 */
export function formatPeriodInterval(period: TimePeriod, format: string) {
  const interval = Object.assign({}, period);

  const hasYears = format.includes(FORMAT.YEAR);
  const hasMonths = format.includes(FORMAT.MONTH);
  const hasDays = format.includes(FORMAT.DAY);
  const hasHours = format.includes(FORMAT.HOURS);
  const hasMinutes = format.includes(FORMAT.MINUTES);

  if (!hasYears) interval.months += Math.round(interval.years * 12);
  if (!hasMonths) interval.days += Math.round(interval.months * (365 / 12));
  if (!hasDays) interval.hours += Math.round(interval.days * 24);
  if (!hasHours) interval.minutes += Math.round(interval.hours * 60);
  if (!hasMinutes) interval.seconds += Math.round(interval.minutes * 60);

  return toFormat(interval, format, false);
}

/**
 * Evaluates the interval between two Date instances.
 * @param fromDate
 * @param untilDate
 * @returns a period object with the time interval (e.g. `{ year: 2, month: 0, day: 2 }`)
 */
export function toPeriodInterval(fromDate: Date, untilDate = new Date()): TimePeriod {
  const date = new Date(fromDate);

  // 1000 * 60 * 60 * 24 * 365 = 31536000000
  let years = Math.floor(diff(date, untilDate) / 31536000000);
  if (years > 0) date.setFullYear(date.getFullYear() + years);

  // 1000 * 60 * 60 * 24 * (365 / 12) = 2628000000
  let months = Math.floor(diff(date, untilDate) / 2628000000);
  if (months > 0) date.setMonth(date.getMonth() + months);

  // 1000 * 60 * 60 * 24 = 86400000
  let days = Math.floor(diff(date, untilDate) / 86400000);
  if (days > 0) date.setDate(date.getDate() + days);

  // 1000 * 60 * 60 = 3600000
  let hours = Math.floor(diff(date, untilDate) / 3600000);
  if (hours > 0) date.setHours(date.getHours() + hours);

  // 1000 * 60 = 60000
  let minutes = Math.floor(diff(date, untilDate) / 60000);
  if (minutes > 0) date.setMinutes(date.getMinutes() + minutes);

  let seconds = Math.floor(diff(date, untilDate) / 1000);
  if (seconds > 0) date.setSeconds(date.getSeconds() + seconds);

  return { years, months, days, hours, minutes, seconds };
}

function diff(from: Date, until: Date) {
  return until.getTime() - from.getTime();
}

function toFormat(date: TimePeriod, format: string, pad = true) {
  const period = pad ? padTimePeriod(date) : toLocaleTimePeriod(date);

  let formattedDate = format
    .replace(FORMAT.YEAR, period.years.toString())
    .replace(FORMAT.MONTH, period.months.toString())
    .replace(FORMAT.DAY, period.days.toString())
    .replace(FORMAT.HOURS, period.hours.toString())
    .replace(FORMAT.MINUTES, period.minutes.toString())
    .replace(FORMAT.SECONDS, period.seconds.toString());
  return formattedDate;
}

function padTimePeriod(date: TimePeriod) {
  const years = date.years.toString();
  const months = padStart(date.months);
  const days = padStart(date.days);
  const hours = padStart(date.hours);
  const minutes = padStart(date.minutes);
  const seconds = padStart(date.seconds);

  return { years, months, days, hours, minutes, seconds };
}

function toLocaleTimePeriod(date: TimePeriod) {
  const years = date.years.toLocaleString();
  const months = date.months.toLocaleString();
  const days = date.days.toLocaleString();
  const hours = date.hours.toLocaleString();
  const minutes = date.minutes.toLocaleString();
  const seconds = date.seconds.toLocaleString();

  return { years, months, days, hours, minutes, seconds };
}

function parseDate(date: Date): TimePeriod {
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { days, months, years, hours, minutes, seconds };
}
