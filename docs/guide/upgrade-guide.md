---
outline: deep
---

# Guia para atualização

## `v1.x.x` para `v2.x.x`

### Serviços

Os métodos do serviço [`http`](../api/services/request#http) (`post`, `put` e `patch`), não apresentam mais o parâmetro `body`.
Ao invés disso, agora os mesmos aguardam por um parâmetro `options`.

`options` pode conter tanto o corpo (`body`) quanto cabeçalhos (`headers`) para a requisição.

Os métodos `get` e `delete` também passaram a apresentar o `options`, como um novo parâmetro, porém, por uma limitação de protocolo, não expõe a opção de `body`.
