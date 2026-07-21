# Eventos

Recursos diversos para trabalhar com eventos.

## emitCustomEvent

Emite um evento customizado.

- Tipo

```ts
function emitCustomEvent<T>(type: string, detail?: T): void;
```

- Detalhes

Recebe o nome de um evento (`type`) e, opcionalmente, dados adicionais (`detail`) para anexar aos detalhes do evento que será emitido na página.

- Exemplo

```ts
import { emitCustomEvent } from "@nexdom/shared/utils";

const type = "custom-event";
const detail = { key: "value" };

// emite um CustomEvent, do tipo "custom-event", com o campo detail igual ao segundo parâmetro.
emitCustomEvent(type, detail);
```

## listenEvent

Escuta um evento.

- Tipo

```ts
function listenEvent<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.addEventListener<K>>
): () => void;
```

ou

```ts
function listenEvent(...params: Parameters<typeof window.addEventListener>): () => void;
```

- Detalhes

Recebe os mesmos parâmetros do método [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) e retorna uma função que irá remover o _event listener_.

- Exemplo

```ts
import { listenEvent } from "@nexdom/shared/utils";

const type = "custom-event";
const cb = (event: CustomEvent) => {
  // ...
};

// Adiciona um event listener.
const removeListener = listenEvent(type, cb);
```

## removeListener

Remove a escuta de evento.

- Tipo

```ts
function removeListener<K extends keyof WindowEventMap>(
  ...params: Parameters<typeof window.removeEventListener<K>>
): void;
```

ou

```ts
function removeListener(...params: Parameters<typeof window.removeEventListener>): void;
```

- Detalhes

Recebe os mesmos parâmetros do método [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters), para remover um _event listener_.

- Exemplo

```ts
import { removeListener } from "@nexdom/shared/utils";

const type = "custom-event";
const cb = (event: CustomEvent) => {
  // ...
};

// Remove um event listener.
removeListener(type, cb);
```
