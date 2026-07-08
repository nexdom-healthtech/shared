/**
 * Transforms a string into kebab case.
 * @param text any string you want
 * @returns the original string on kebab case (e.g. "Hello World" => "hello-world")
 */
export function toKebab(text: string) {
  return text.replace(/[_\s]+/g, "-").toLowerCase();
}

/**
 * Transforms a string into camel case.
 * @param text any string you want
 * @returns the original text on camel case (e.g. "Hello World" => "helloWorld")
 */
export function toCamel(text: string) {
  const kebabText = toKebab(text);
  return kebabText.replace(/-(.)/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transforms a string into title case.
 * @param text any string you want
 * @returns the original text on title case (e.g. "hello world" => "Hello World")
 */
export function toTitle(text: string) {
  const sentenceText = toSentence(text);
  return sentenceText.replace(/\s(.)/g, (_, letter) => ` ${letter.toUpperCase()}`);
}

/**
 * Transforms a string into sentence case.
 * @param text any string you want
 * @returns the original text on sentence case (e.g. "hello-world" => "Hello world")
 */
export function toSentence(text: string) {
  const sentenceText = toKebab(text).replace(/-/g, " ");
  return sentenceText.replace(/^(.)/, (_, letter) => letter.toUpperCase());
}

/**
 * Shrinks a string to only the first and last words.
 * @param text any string you want
 * @returns the original text with only the first and last words (e.g. "hello world, this is a test" => "hello test")
 */
export function shrinkText(text: string) {
  return text.replace(/^(\w+)\s.*\s(.+)/, "$1 $2");
}
