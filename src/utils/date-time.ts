import { toNumber, padStart } from "@/utils/number.ts";
import SharedError from "@/models/error.ts";

interface ParsedDateTime {
  day: string;
  month: string;
  year: string;
  hours: string;
  minutes: string;
  seconds: string;
}

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
export function formatDateTime(date: Date, format = "DD/MM/YYYY") {
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
    .replace("DD", "(?<day>\\d{2})")
    .replace("MM", "(?<month>\\d{2})")
    .replace("YYYY", "(?<year>\\d{4})")
    .replace("HH", "(?<hours>\\d{2})")
    .replace("mm", "(?<minutes>\\d{2})")
    .replace("ss", "(?<seconds>\\d{2})");

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

function toFormat(date: ParsedDateTime, format: string) {
  let formattedDate = format
    .replace("DD", date.day)
    .replace("MM", date.month)
    .replace("YYYY", date.year)
    .replace("HH", date.hours)
    .replace("mm", date.minutes)
    .replace("ss", date.seconds);
  return formattedDate;
}

function parseDate(date: Date): ParsedDateTime {
  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);
  const year = padStart(date.getFullYear());
  const hours = padStart(date.getHours());
  const minutes = padStart(date.getMinutes());
  const seconds = padStart(date.getSeconds());
  return { day, month, year, hours, minutes, seconds };
}
