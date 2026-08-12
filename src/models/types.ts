import type { ConditionalExcept } from "type-fest";

/**
 * Exclude class methods, so it can be used to type the parameters from a class constructor.
 *
 * Example:
 * ```ts
 * class Person {
 *   name: string;
 *   age: number;
 *
 *   constructor(person: ConstructorParams<Person>) {
 *     this.name = person.name;
 *     this.age = person.age;
 *
 *     // Property salute does not exist on type { name: string; age: number; }
 *     person.salute;
 *   }
 *
 *   salute() {
 *     console.log(`Hey ${this.name}!`);
 *   }
 * }
 * ```
 */
export type ConstructorParams<T> = ConditionalExcept<T, (...args: unknown[]) => unknown>;
