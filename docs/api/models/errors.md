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

## SharedApiError

Estende de [`SharedError`](#sharederror).

- Tipo

```ts
class SharedApiError<T> extends SharedError {
  status?: number;
  body?: T;

  constructor(message: string, details?: Details<T>);
}
```

- Detalhes

Recebe uma mensagem de erro (`message`) no construtor, juntamento com um objeto (`details`) contendo o status code de erro (`status`), opcional, e o corpo da resposta (`body`), opcional também.

- Exemplo

```ts
import { SharedApiError } from "@nexdom/shared/models";

try {
  // ...
} catch (error: unknown) {
  if (error instanceof SharedApiError) {
    console.log(error.status);
    console.log(error?.body?.description);
  }
}
```
