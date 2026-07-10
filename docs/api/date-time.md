# Data/hora

As formatações de data e hora levam em consideração os seguintes tokens:

- ano: `YYYY`
- mês: `MM`
- dia: `DD`
- hora: `HH`
- minuto: `mm`
- segundo: `ss`

## currentDateTime

Retorna a data e hora atual no formato especificado

```ts
import { currentDateTime } from "@nexdom/shared/utils";

// resultado: "2026-07-10"
currentDateTime("YYYY-MM-DD");

// resultado: "17:21:05"
currentDateTime("HH:mm:ss");

// resultado: "10/07/2026 - 17:21"
currentDateTime("DD/MM/YYYY - HH:mm");
```
