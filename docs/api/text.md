# Texto

Recursos diversos para trabalhar com `string`s.

## toKebab

Retorna o texto informado em _kebab-case_.

- Tipo

```ts
function toKebab(text: string): string;
```

- Detalhes

Recebe um texto e retorna o mesmo em _kebab-case_ - letras minúsculas separadas por um traço ("-").

- Exemplo

```ts
import { toKebab } from "@nexdom/shared/utils";

// resultado: seu-texto-aqui
toKebab("Seu texto aqui");
```

## toCamel

Retorna o texto informado em _camelCase_.

- Tipo

```ts
function toCamel(text: string): string;
```

- Detalhes

Recebe um texto e retorna o mesmo em _camelCase_ - sem espaços, a primeira letra de cada palavra em maiúsculo, exceto pela da primeira palavra.

- Exemplo

```ts
import { toCamel } from "@nexdom/shared/utils";

// resultado: seuTextoAqui
toCamel("Seu texto aqui");
```

## toTitle

Retorna o texto informado em _Title Case_.

- Tipo

```ts
function toTitle(text: string): string;
```

- Detalhes

Recebe um texto e retorna o mesmo em _Title Case_ - texto com a primeira letra de cada palavra em maiúsculo.

- Exemplo

```ts
import { toTitle } from "@nexdom/shared/utils";

// resultado: Seu Texto Aqui
toTitle("Seu texto aqui");
```

## toSentence

Retorna o texto informado em _Sentence case_.

- Tipo

```ts
function toSentence(text: string): string;
```

- Detalhes

Recebe um texto e retorna o mesmo em _Sentence case_ - a primeira letra da primeira palavra em maiúsculo.

- Exemplo

```ts
import { toSentence } from "@nexdom/shared/utils";

// resultado: Seu texto aqui
toSentence("Seu texto aqui");
```

## toInitials

Reduz o texto informado para as iniciais.

- Tipo

```ts
function toInitials(text: string): string;
```

- Detalhes

Reduz o texto informado para as iniciais maiúsculas da primeira e última palavra.

- Exemplo

```ts
import { toInitials } from "@nexdom/shared/utils";

// resultado: SA
toInitials("Seu texto aqui");

// resultado: HW
toInitials("Hello world");

// resultado: H
toInitials("hello");
```

## shrinkText

Reduz o texto informado.

- Tipo

```ts
function shrinkText(text: string): string;
```

- Detalhes

Mantém somente a primeira e última palavra de um texto.

- Exemplo

```ts
import { shrinkText } from "@nexdom/shared/utils";

// resultado: Seu aqui
shrinkText("Seu texto aqui");
```
