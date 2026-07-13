# Data e hora

Métodos para trabalhar com data e hora, baseado em tokens pré-definidos.

- Tokens

```ts
enum FORMAT {
  YEAR = "YYYY",
  MONTH = "MM",
  DAY = "DD",
  HOURS = "HH",
  MINUTES = "mm",
  SECONDS = "ss",
}
```

## currentDateTime

Retorna a data e hora atual no formato especificado.

- Tipo

```ts
currentDateTime(format?: string): string;
```

- Detalhes

Retorna a data e hora formata. Caso um formato (`format`) não seja especificado, irá retornar `DD/MM/YYYY`.

- Exemplo

```ts
import { currentDateTime } from "@nexdom/shared/utils";

// resultado: "2026-07-10"
currentDateTime("YYYY-MM-DD");

// resultado: "17:21:05"
currentDateTime("HH:mm:ss");

// resultado: "10/07/2026 - 17:21"
currentDateTime("DD/MM/YYYY - HH:mm");
```

## formatDateTime

Formata data/hora.

- Tipo

```ts
function formatDateTime(date: Date, format?: string): string;
```

- Detalhes

Formata data e hora (`Date`) informada. Caso um formato (`format`) não seja especificado, irá retornar `DD/MM/YYYY`.

- Exemplo

```ts
import { formatDateTime } from "@nexdom/shared/utils";

const date = new Date();

// resultado: "2026-07-10"
formatDateTime(date, "YYYY-MM-DD");

// resultado: "17:21:05"
formatDateTime(date, "HH:mm:ss");

// resultado: "10/07/2026 - 17:21"
formatDateTime(date, "DD/MM/YYYY - HH:mm");
```

## toDate

Converte um texto em uma data/hora

- Tipo

```ts
function toDate(text: string, format: string): Date;
```

- Detalhes

Recebe um texto (`text`) e o formato de data/hora esperado para o mesmo (`format`) e então converte para uma instância de `Date`.

::: danger
Caso a conversão não seja possível, um erro do tipo `SharedError` será disparado.
Esse disparo pode ser prevenido utilizando o método [`isValidDateTime`](#isValidDateTime).
:::

- Exemplo

```ts
import { toDate } from "@nexdom/shared/utils";

const stringDate = "2002-12-18 15:21:43";

// resultado: Date - Sat Jan 18 2003 15:21:43 GMT-0200 (Hora de verão de Brasília)
toDate(stringDate, "YYYY-MM-DD HH:mm:ss");
```

## isValidDateTime

Verifica se um texto, em determinado formato, pode ser convertido para uma data/hora.

- Tipo

```ts
function isValidDateTime(text: string, format: string): boolean;
```

- Detalhes

Recebe um texto (`text`) e o formato de data/hora esperado para o mesmo (`format`) e retorna um `boolean` indicando se a conversão para `Date` é possível.

- Exemplo

```ts
import { isValidDateTime } from "@nexdom/shared/utils";

const stringDate = "2002-12-18 15:21:43";

// resultado: true
isValidDateTime("2002-12-18", "YYYY-MM-DD");

// resultado: true
isValidDateTime("18/12/2002", "DD/MM/YYYY");

// resultado: false
isValidDateTime("2002-12-a", "YYYY-MM-DD");
```

## navigatePeriod

Navega por um período de tempo.

- Tipo

```ts
function navigatePeriod(date: Date, period: Partial<TimePeriod>): Date;
```

- Detalhes

Recebe uma instância de data (`date`) e objeto com o período a navegar (`period`).
O período pode conter tanto um valor positivo (exemplo: `{years:5}`), para avançar, ou negativo (exemplo: `{months:-2}`) para voltar no tempo.

- Exemplo

```ts
import { navigatePeriod } from "@nexdom/shared/utils";

const date = new Date("1993-08-30 10:15:20");

// resultado: Date - Mon Aug 30 1993 10:15:25 GMT-0300 (Hora padrão de Brasília)
navigatePeriod(date, { seconds: 5 });

// resultado: Date - Mon Aug 28 1993 10:15:20 GMT-0300 (Hora padrão de Brasília)
navigatePeriod(date, { days: -2 });

// resultado: Date - Mon Aug 30 1993 12:30:20 GMT-0300 (Hora padrão de Brasília)
navigatePeriod(date, { hours: 2, minutes: 15 });
```

## toPeriodInterval

Retorna a diferença de tempo entre duas datas.

- Tipo

```ts
function toPeriodInterval(fromDate: Date, untilDate?: Date): TimePeriod;
```

- Detalhes

Recebe duas instâncias de data (`fromDate` e `untilDate`) e retorna um objeto mapeando o período de tempo entre as mesmas.

::: tip
Se a segunda data não for informada, irá comparar intervalo de tempo até a data/hora atual.
:::

- Exemplo

```ts
import { toPeriodInterval } from "@nexdom/shared/utils";

const date1 = new Date("1991-10-03 14:35:01");
const date2 = new Date("2026-06-03 10:43:50");

// resultado: { years: 34, months: 7, days: 30, hours: 20, minutes: 8, seconds: 49 }
toPeriodInterval(date1, date2);
```

## formatPeriodInterval

Formata um intervalo de tempo.

- Tipo

```ts
function formatPeriodInterval(period: TimePeriod, format: string): string;
```

- Detalhes

Formata um intervalo de tempo (`period`) conforme formato (`format`) informado.

- Exemplo

```ts
import { formatPeriodInterval } from "@nexdom/shared/utils";

const interval = { years: 1, months: 2 };

// resultado: 1years
formatPeriodInterval(interval, "YYYYyears");

// resultado: 14 months
formatPeriodInterval(interval, "MM months");
```
