/**
 * Transforms a string into kebab case.
 * @param text any string you want
 * @returns the original string on kebab case (e.g. "Hello World" => "hello-world")
 */
export function toKebab(text: string) {
  return text
    .trim()
    .replaceAll(/[_\s]+/g, "-")
    .toLowerCase();
}

/**
 * Transforms a string into camel case.
 * @param text any string you want
 * @returns the original text on camel case (e.g. "Hello World" => "helloWorld")
 */
export function toCamel(text: string) {
  const kebabText = toKebab(text);
  return kebabText.replaceAll(/-(.)/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transforms a string into title case.
 * @param text any string you want
 * @returns the original text on title case (e.g. "hello world" => "Hello World")
 */
export function toTitle(text: string) {
  const sentenceText = toSentence(text);
  return sentenceText.replaceAll(/\s(.)/g, (_, letter) => ` ${letter.toUpperCase()}`);
}

/**
 * Transforms a string into sentence case.
 * @param text any string you want
 * @returns the original text on sentence case (e.g. "hello-world" => "Hello world")
 */
export function toSentence(text: string) {
  const sentenceText = toKebab(text).replaceAll("-", " ");
  return sentenceText.replace(/(\w)/, (_, letter) => letter.toUpperCase());
}

/**
 * Shrinks a string to only the first and last words.
 * @param text any string you want
 * @returns the original text with only the first and last words (e.g. "hello world, this is a test" => "hello test")
 */
export function shrinkText(text: string) {
  return toFirstAndLastWords(text);
}

/**
 * Shrinks a string to its initials.
 * @param text any string you want
 * @returns the original text initials, considering the first and last words upper cased (e.g. "hello world, this is a test" => "HT")
 *          if the text has only one word, it will return the first letter (e.g. "hello" => "H")
 */
export function toInitials(text: string) {
  const [firstWord, lastWord = ""] = toFirstAndLastWords(text).toUpperCase().split(" ");
  const firstLetter = firstWord[0] ?? "";
  const lastLetter = lastWord[0] ?? "";
  return `${firstLetter}${lastLetter}`;
}

function toFirstAndLastWords(text: string) {
  const words = text.trim().split(" ");
  const firstWord = words[0];
  const lastWord = words.length > 1 ? ` ${words.at(-1)}` : "";
  return `${firstWord}${lastWord}`;
}

/**
 * Applies a mask to a value, replacing each `#` of the mask with the next digit of the value.
 * Any other character of the mask is a literal, inserted as is.
 *
 * Characters of the value that aren't digits are ignored, digits beyond the mask's `#` are discarded,
 * and the result ends right after the last filled `#`, so characters of the mask after its last `#`
 * are never included (e.g. `mask("12", "(##)")` is `"(12"`). A `number` value is padded with leading zeros
 * up to the number of `#` in the mask. Digits written in the mask (e.g. `+55`) are literals and never
 * consume digits of the value.
 *
 * ```ts
 * mask("11987654321", "(##) #####-####"); // "(11) 98765-4321"
 * mask("119", "(##) #####-####"); // "(11) 9"
 * mask(1310100, "#####-###"); // "01310-100"
 * ```
 * @param value the value to mask
 * @param pattern the mask, where each `#` is a digit
 * @returns the masked value, or an empty string when the value has no digits or the mask has no `#`
 */
export function mask(value: string | number, pattern: string) {
  const digits = toMaskDigits(value, pattern);
  let masked = "";
  let literals = "";
  let index = 0;
  for (const char of pattern) {
    if (char !== "#") {
      literals += char;
    } else if (index < digits.length) {
      masked += `${literals}${digits[index]}`;
      literals = "";
      index++;
    }
  }
  return masked;
}

/**
 * Removes a mask from a value, keeping only the digits that fill the mask's `#`.
 *
 * Characters of the value that aren't digits are ignored and digits beyond the mask's `#` are
 * discarded. A `number` value is padded with leading zeros up to the number of `#` in the mask, as
 * {@link mask} does. Digits written in the mask (e.g. `+55`) aren't removed: pass the value without
 * them.
 *
 * ```ts
 * unmask("(11) 98765-4321", "(##) #####-####"); // "11987654321"
 * unmask(1310100, "#####-###"); // "01310100"
 * ```
 * @param value the masked value
 * @param pattern the mask, where each `#` is a digit
 * @returns the digits of the value that fill the mask, or an empty string when there are none
 */
export function unmask(value: string | number, pattern: string) {
  return toMaskDigits(value, pattern);
}

function toMaskDigits(value: string | number, pattern: string) {
  const length = pattern.split("#").length - 1;
  const digits = String(value).replaceAll(/\D/g, "");
  const padded =
    typeof value === "number" && digits.length > 0 ? digits.padStart(length, "0") : digits;
  return padded.slice(0, length);
}
