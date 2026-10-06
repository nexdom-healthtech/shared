# Comparação

Recursos para comparar valores.

## isDeepEqual

Retorna `true` quando os dois valores informados são iguais em profundidade.

- Tipo

```ts
function isDeepEqual(a: unknown, b: unknown): boolean;
```

- Detalhes

Compara os valores como um formulário compararia:

- Objetos simples (literais, ou sem protótipo) são comparados chave a chave, em qualquer ordem, e uma chave com `undefined` equivale a uma chave ausente.
- Datas são comparadas pelo instante que representam.
- Arrays são comparados item a item, na mesma ordem.
- Os demais valores, inclusive outros objetos (como `File`, `Map`, `Set` ou instâncias de classes), são comparados com [`Object.is`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Assim, `NaN` é igual a `NaN`, `0` é diferente de `-0`, e `null`, `""` e `undefined` são diferentes entre si.

- Exemplo

```ts
import { isDeepEqual } from "@nexdom/shared/utils";

// resultado: true
isDeepEqual({ name: "Maria", phone: undefined }, { name: "Maria" });

// resultado: true
isDeepEqual({ birth: new Date(2000, 1, 2) }, { birth: new Date(2000, 1, 2) });

// resultado: false
isDeepEqual([1, 2], [2, 1]);

// resultado: false
isDeepEqual({ name: null }, { name: "" });
```
