# Erros

Modelos para mapear exceções.

## SharedError

Estende de [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

- Tipo

```ts
class SharedError extends Error {
  constructor(message: string);
}
```

- Detalhes

Recebe uma mensagem de erro (`message`) no construtor.

- Exemplo

```ts
import { SharedError } from "@nexdom/shared/models";

try {
  // ...
} catch (error: unknown) {
  if (error instanceof SharedError) {
    // ...
  }
}
```
