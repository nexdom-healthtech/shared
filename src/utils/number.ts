export function toNumber(text?: string | null, defaultValue = 0) {
  if (text === undefined || text === null) return defaultValue;
  return Number(text);
}
