/**
 * Checks if value is actually empty.
 * @param value any string you want
 * @returns true if `value` is empty
 */
export function isEmpty(value?: string): value is undefined {
  return !value || value.trim().length === 0;
}

/**
 * Checks if the value is a pt-BR phone number format.
 * @param value any string you want
 * @returns true if `value`is a valid phone number
 */
export function isPhone(value: string): boolean {
  return /^\+?(?:55)?\s?\(?[1-9]{2}\)?\s?[9]?[0-9]{4}-?[0-9]{4}$/.test(value);
}

/**
 * Checks if the value is a proper e-mail address.
 * @param value any string you want
 * @returns true if `value` is a valid e-mail address
 */
export function isEmail(value: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

/**
 * Checks if the value is a valid URL.
 * @param value any string you want
 * @returns true if `value`is a valid URL
 */
export function isUrl(value: string): boolean {
  return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value);
}
