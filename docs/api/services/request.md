# Requisições

Serviços para realizar requisições.

## Http

Utilizado para realizar requisições HTTP / HTTPS.

- Tipo

```ts
import type { PartialDeep } from "type-fest";

type HttpBody = Record<string, unknown>;

class Http {
  static async get<T>(uri: string): Promise<PartialDeep<T>>;
  static async post<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>>;
  static async put<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>>;
  static async patch<T>(uri: string, body?: HttpBody): Promise<PartialDeep<T>>;
  static async delete<T>(uri: string): Promise<PartialDeep<T>>;
}
```

- Detalhes

Recebe uma URL para disparar a requisição (`uri`) e, quando couber ao método, o corpo que será enviado na requisição (`body`).

O retorno será o objeto esperado, em um formato [`PartialDeep`](https://github.com/sindresorhus/type-fest), onde todas propriedades podem estar `undefined`.

Pode disparar um [`SharedApiError`](../models/errors#sharedapierror) em caso de respostas inesperadas dos serviços.

- Exemplo

```ts
import { http } from "@nexdom/shared/services";

try {
  const response = await http.get("https://viacep.com.br/ws/01001000/json/");
  // ...
} catch (error: unknown) {
  if (error instanceof SharedApiError) {
    // ...
  }
}
```
