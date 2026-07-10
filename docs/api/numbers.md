# Números

## toNumber

Converte valor para numérico.

- Tipo

```ts
function toNumber(text?: string | null, defaultValue?: number): number;
```

- Detalhes

Converte um `null`, `undefined` ou `string` para `number`, aceitando um valor default (`defaultValue`) caso não consiga realizar a conversão inicial com sucesso.

Por padrão, o `defaultValue` é `0`.

- Exemplo

```ts
import { toNumber } from "@nexdom/shared/utils";

// resultado: 0
toNumber("Não tem conversão");

// resultado: 2
toNumber("Não tem conversão", 2);

// resultado: 3
toNumber("3", 2);
```

## padStart

Adiciona caracteres à esquerda.

- Tipo

```ts
function padStart(value: number | string, maxLength?: number, fillString?: string): string;
```

- Detalhes

Recebe um `number` ou `string` e o transforma em uma `string`, preenchendo a esquerda com o caractere (`fillString`) estipulado até atingir um tamanho estipulado (`maxLength`).

Por padrão, o `maxLength` é `2` e a `fillString` `"0"`.

- Exemplo

```ts
import { padStart } from "@nexdom/shared/utils";

// resultado: "01"
padStart(1);

// resultado: "002"
padStart("2", 3);
```
