# Tipos

Utilitários para auxiliar na tipagem de modelos.

## ConstructorParams

Auxiliar na tipagem de parâmetros para o construtor de uma classe.

- Tipo

```ts
import type { ConditionalExcept } from "type-fest";

type ConstructorParams<T> = ConditionalExcept<T, (...args: unknown[]) => unknown>;
```

- Detalhes

Recebe um generics (`T`) e retorna todos os atributos de uma classe, retirando seus métodos.

- Exemplo

```ts
import type { ConstructorParams } from "@nexdom/shared/models";

class Person {
  name: string;
  age: number;

  constructor(person: ConstructorParams<Person>) {
    this.name = person.name;
    this.age = person.age;

    // [!code error] Property salute does not exist on type { name: string; age: number; }
    person.salute;
  }

  salute() {
    console.log(`Hey ${this.name}!`);
  }
}
```
