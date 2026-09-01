# Validações

Recursos diversos para trabalhar com validação de `string`s.

## isEmpty

Retorna `true` se o valor informado estiver vazio.

- Tipo

```ts
function isEmpty(value?: string): value is undefined;
```

- Detalhes

Recebe um texto e retorna `true` caso o mesmo seja `null`, `undefined` ou uma `string` vazia ou provida exclusivamente de espaços.

- Exemplo

```ts
import { isEmpty } from "@nexdom/shared/utils";

// resultado: true
isEmpty("");

// resultado: true
isEmpty("    ");

// resultado: false
isEmpty("Seu texto aqui");
```

## isPhone

Retorna `true` quando o texto informado atende algum formato de número telefônico brasileiro.

- Tipo

```ts
function isPhone(value: string): boolean;
```

- Detalhes

Recebe um texto e retorna `true` caso o mesmo atenda algum formato de telefone nacional, como os seguintes exemplos: `11988888888`, `(11) 98888-8888`, `(47) 3456-7890` ou `+55 47 3456-7890`.

- Exemplo

```ts
import { isPhone } from "@nexdom/shared/utils";

// resultado: false
isPhone("");

// resultado: false
isPhone("Seu texto aqui");

// resultado: true
isPhone("(47) 3456-7890");
```

## isEmail

Retorna `true` quando o texto informado atende um formato válido para endereço de e-mail.

- Tipo

```ts
function isEmail(value: string): boolean;
```

- Detalhes

Recebe um texto e `true` caso o mesmo seja um endereço de endereço.

- Exemplo

```ts
import { isEmail } from "@nexdom/shared/utils";

// resultado: false
isEmail("Seu texto aqui");

// resultado: true
isEmail("fulano.de.tal_1993@gmail.com.br");
```

## isUrl

Retorna `true` quando o texto informado é uma URL válida.

- Tipo

```ts
function isUrl(value: string): boolean;
```

- Detalhes

Recebe um texto e returna `true` quando este for uma URL HTTP(S) válida.

- Exemplo

```ts
import { isUrl } from "@nexdom/shared/utils";

// resultado: false
isUrl("Seu texto aqui");

// resultado: true
isUrl("http://localhost:8080");

// resultado: true
isUrl("https://google.com/");
```
