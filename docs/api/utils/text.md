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

## mask

Aplica uma máscara ao valor informado.

- Tipo

```ts
function mask(value: string | number, pattern: string): string;
```

- Detalhes

Substitui cada `#` da máscara (`pattern`) pelo próximo dígito do valor. Qualquer outro caractere da máscara, inclusive letras e dígitos, é inserido como está.

Caracteres do valor que não são dígitos são ignorados, e dígitos além da quantidade de `#` da máscara são descartados. O resultado termina logo após o último `#` preenchido, então um valor parcial, como o digitado em um campo, recebe só os caracteres da máscara até ali. Caracteres da máscara depois do último `#` nunca são incluídos (ex.: `mask("12", "(##)")` resulta em `(12`). Quando o valor não tem dígitos ou a máscara não tem `#`, retorna um texto vazio.

Um valor do tipo `number` é completado com zeros à esquerda até a quantidade de `#` da máscara, já que um número perde os zeros iniciais (ex.: o CEP `01310-100` como `1310100`). Só os dígitos do número são usados, sem sinal nem separador decimal. Para números que o JavaScript escreve em notação científica (ex.: `1e21`), informe o valor como `string`.

Dígitos escritos na máscara (ex.: o `+55` de `+55 (##) #####-####`) nunca consomem dígitos do valor: informe o valor sem eles.

- Exemplo

```ts
import { mask } from "@nexdom/shared/utils";

// resultado: (11) 98765-4321
mask("11987654321", "(##) #####-####");

// resultado: (11) 9
mask("119", "(##) #####-####");

// resultado: 123.456.789-09
mask("12345678909", "###.###.###-##");

// resultado: 01310-100
mask(1310100, "#####-###");

// resultado: +55 (11) 98765-4321
mask("11987654321", "+55 (##) #####-####");
```

## unmask

Remove a máscara do valor informado.

- Tipo

```ts
function unmask(value: string | number, pattern: string): string;
```

- Detalhes

Mantém somente os dígitos do valor que preenchem os `#` da máscara (`pattern`), ou seja, os mesmos dígitos que [`mask`](#mask) posiciona com essa máscara. Dígitos além da quantidade de `#` da máscara são descartados. Quando o valor não tem dígitos ou a máscara não tem `#`, retorna um texto vazio.

Como em [`mask`](#mask), um valor do tipo `number` é completado com zeros à esquerda até a quantidade de `#` da máscara.

Dígitos escritos na máscara (ex.: o `+55` de `+55 (##) #####-####`) não são removidos, pois não há como diferenciá-los dos dígitos do valor: remova esse trecho do valor antes, ou use uma máscara sem ele.

- Exemplo

```ts
import { unmask } from "@nexdom/shared/utils";

// resultado: 11987654321
unmask("(11) 98765-4321", "(##) #####-####");

// resultado: 01310100
unmask(1310100, "#####-###");

// dígitos escritos na máscara não são removidos
// resultado: 55119876543
unmask("+55 (11) 98765-4321", "+55 (##) #####-####");
```
