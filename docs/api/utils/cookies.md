# Cookies

Recursos diversos para trabalhar com cookies.

## getCookie

Obtém o valor de um cookie.

- Tipo

```ts
async function getCookie(key: string): Promise<string>;
```

- Detalhes

Recebe a chave do cookie (`key`) e retorna o valor do mesmo ou uma `string` vazia do contrário.

- Exemplo

```ts
import { getCookie } from "@nexdom/shared/utils";

const key = "custom-cookie";

// busca o valor do cookie "custom-cookie" e utiliza o mesmo após resolução da promise.
getCookie(key).then((value) => {
  console.log(`Valor do cookie ${key}: ${value}`);
});
```

## setCookie

Criar/atualiza um cookie.

- Tipo

```ts
async function setCookie(key: string, value: string): Promise<void>;
```

- Detalhes

Recebe a chave (`key`) e valor (`value`) para o cookie, e então atualiza ou cria o mesmo, se este ainda não existir.

- Exemplo

```ts
import { setCookie } from "@nexdom/shared/utils";

const key = "custom-cookie";
const value = "some-value-here";

// cria um cookie "custom-cookie" com o valor "some-value-here".
setCookie(key, value).then(() => {
  console.log(`Cookie ${key} atualizado para: ${value}`);
});
```

## deleteCookie

Apaga um cookie.

- Tipo

```ts
async function deleteCookie(key: string): Promise<void>;
```

- Detalhes

Apaga um cookie de acordo com a chave (`key`) recebida.

- Exemplo

```ts
import { deleteCookie } from "@nexdom/shared/utils";

const key = "custom-cookie";

// remove o cookie "custom-cookie".
deleteCookie(key).then(() => {
  console.log(`Cookie ${key}: removido`);
});
```
