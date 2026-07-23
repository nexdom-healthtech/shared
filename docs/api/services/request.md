# Requisições

Serviços para realizar requisições.

## Http

Utilizado para realizar requisições HTTP / HTTPS.

- Tipo

```ts
class Http {
  static async get<T>(uri): Promise<PartialDeep<T>>;
  static async post<T>(uri, body): Promise<PartialDeep<T>>;
  static async put<T>(uri, body): Promise<PartialDeep<T>>;
  static async delete<T>(uri): Promise<PartialDeep<T>>;
}
```

- Detalhes

Recebe uma URL para dispara a requisição (`uri`) e, quando couber ao método, o corpo que será enviado na requisição (`body`).

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
