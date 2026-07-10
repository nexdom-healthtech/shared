# Iniciando

## Instação

Para instalar no seu projeto, execute:

::: code-group

```sh [Vite+]
$ vp add @nexdom/shared
```

```sh [npm]
$ npm install @nexdom/shared
```

```sh [pnpm]
$ pnpm add @nexdom/shared
```

```sh [yarn]
$ yarn add @nexdom/shared
```

:::

## E agora?

Importe os recursos que você precisar, como o exemplo a seguir:

```ts
import { toKebab } from "@nexdom/shared/utils";
// Ou
// import { utils } from "@nexdom/shared";

const kebabMessage = toKebab("Hello world");
// Ou
// const kebabMessage = utils.toKebab("Hello world");

// "hello-world"
console.log(kebabMessage);
```

Acesse as [APIs](../api/) e saiba mais dos recursos que essa lib dispõe.
