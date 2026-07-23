# Requisições

Abaixo temos exemplos interativos com nossos métodos para realizar requisições.

## HTTP / HTTPS

::: info
Se tratando de requisições REST, podemos aproveitar o serviço [`http`](../../api/services/request.md), conforme exemplo a seguir:
:::

<form @submit.prevent="onSubmit">
<label :for="methodId">Método: </label>
<select :id="methodId" v-model="method" :disabled="loading" required>
  <option v-for="method in methods" :key="method" :value="method">
    {{ method.toUpperCase() }}
  </option>
</select>

<label :for="urlId">URL: </label>
<input :id="urlId" v-model="url" type="url" :disabled="loading" required />

<label :for="bodyId">JSON: </label>
<textarea :id="bodyId" v-model="body" :disabled="loading" placeholder="Corpo da requisição..." />

<button type="submit" :disabled="loading">
  {{ loading ? "Carregando..." : "[ENVIAR]" }}
</button>

</form>

Resposta:

```json-vue
{{ response }}
```

Erro:

```json-vue
{{ error }}
```

<script lang="ts" setup>
  import { useId, ref } from "vue"
  import { http } from "../../../dist/services.mjs"

  const methodId = useId();
  const method = ref<Exclude<keyof typeof http, "prototype">>("get");
  const methods = ["get", "post", "put", "delete"];

  const urlId = useId();
  const url = ref("https://viacep.com.br/ws/01001000/json/");

  const bodyId = useId();
  const body = ref("");

  const response = ref("")
  const error = ref("")
  const loading = ref(false)

  async function onSubmit() {
    response.value = "";
    error.value = "";
    loading.value = true;

    try {
      const json = body.value ? JSON.parse(body.value) : "";
      const httpResponse = await http[method.value](url.value, json);
      response.value = JSON.stringify(httpResponse)
    } catch (e) {
      error.value = JSON.stringify(e);
    } finally {
      loading.value = false;
    }
  }
</script>
