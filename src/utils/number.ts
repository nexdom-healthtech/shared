/**
 * Converts any string into a valid number.
 * @param text any string you have
 * @param defaultValue returned number case text is NaN
 * @returns a number
 */
export function toNumber(text?: string | null, defaultValue = 0) {
  if (text === null) return defaultValue;
  const number = Number(text);
  return Number.isNaN(number) ? defaultValue : number;
}

/**
 * Turn a number into a string, then call [padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart).
 * @param value number to be padded
 * @param maxLength length o the resulting string
 * @param fillString the string to pad the current string with
 */
export function padStart(value: number | string, maxLength = 2, fillString = "0") {
  return value.toString().padStart(maxLength, fillString);
}

/**
 * Clamps a number to a minimum of zero.
 * @param value number to be clamped
 * @returns `value` if positive, otherwise `0`
 */
export function toPositiveNumber(value: number) {
  return Math.max(0, value);
}
