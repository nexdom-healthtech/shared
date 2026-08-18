# Requisições

Serviços para realizar requisições.

## Http

Utilizado para realizar requisições HTTP / HTTPS.

- Tipo

```ts
import type { PartialDeep } from "type-fest";

type HttpBody = Record<string, any>;
type HttpHeaders = Record<string, string>;
type HttpOptions = { body?: HttpBody; headers?: HttpHeaders };

class Http {
  static async get<T>(url: string, options?: Omit<HttpOptions, "body">): Promise<PartialDeep<T>>;
  static async post<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>>;
  static async put<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>>;
  static async patch<T>(url: string, options?: HttpOptions): Promise<PartialDeep<T>>;
  static async delete<T>(url: string, options?: Omit<HttpOptions, "body">): Promise<PartialDeep<T>>;
}
```

- Detalhes

Recebe uma URL para disparar a requisição (`url`) e, opcionalmente, opções (`options`), como os cabeçalhos (`headers`) e, quando couber ao método, o corpo (`body`).

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
