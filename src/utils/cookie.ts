/**
 * Fetch a cookie value based on the provided key.
 * @param key as a string
 * @returns a string with the cookie value or an empty string if the key is missing
 */
export async function getCookie(key: string): Promise<string> {
  return (await cookieStore.get(key))?.value ?? "";
}

/**
 * Update or create a cookie associated to the provided key.
 * @param key as a string
 * @param value as a string
 */
export async function setCookie(key: string, value: string): Promise<void> {
  await cookieStore.set(key, value);
}

/**
 * Removes a cookie associated to the provided key.
 * @param key as a string
 */
export async function deleteCookie(key: string): Promise<void> {
  await cookieStore.delete(key);
}
