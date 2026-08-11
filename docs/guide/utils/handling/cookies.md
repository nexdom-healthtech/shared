# Manipulação de Cookies

## Criar, ler, atualizar e remover

<form @submit.prevent="fetch(cookieKeyText)">
<label :for="cookieKeyId">Chave: </label>
<input :id="cookieKeyId" v-model="cookieKeyText" required placeholder="Preencha aqui..." />

- [getCookie](../../../api/utils/cookies#getcookie): <button type="submit">[LER] </button>
- [deleteCookie](../../../api/utils/cookies#deletecookie): <button @click="remove(cookieKeyText)" :disabled="!cookieKeyText" type="button">[REMOVER]</button>

<label :for="cookieValueId">Valor: </label>
<input :id="cookieValueId" v-model="cookieValueText" placeholder="Preencha aqui..." />

- [setCookie](../../../api/utils/cookies#setcookie): <button @click="insert(cookieKeyText, cookieValueText)" :disabled="!cookieKeyText || !cookieValueText" type="button">[CRIAR/ATUALIZAR]</button>

</form>

Todos os cookies:

```json-vue
{{ cookies }}
```

<script lang="ts" setup>
  import { useId, ref, onMounted } from "vue";
  import { getCookie, setCookie, deleteCookie } from "../../../../dist/utils.mjs";

  const cookieKeyId = useId();
  const cookieValueId = useId();
  const cookieKeyText = ref("");
  const cookieValueText = ref("");
  const cookies = ref("");

  onMounted(updateCookies);

  async function fetch(key: string) {
    cookieValueText.value = await getCookie(key);
  }

  async function insert(key: string, value: string) {
    await setCookie(key, value);
    await updateCookies();
  }

  async function remove(key: string) {
    await deleteCookie(key);
    await updateCookies();
    cookieValueText.value = "";
  }

  async function updateCookies() {
    const cookiesList = await cookieStore.getAll();
    cookies.value = cookiesList.map(({name, value}) => ({name, value}));
  }
</script>
