# Validação

Abaixo temos exemplos interativos com nossos métodos para validações.

## Texto

<label :for="textId">Texto: </label>
<input :id="textId" v-model="text" placeholder="Preencha aqui..." />

- [isEmpty](../../api/utils/validating#isempty): {{ isEmpty(text) }}
- [isPhone](../../api/utils/validating#isphone): {{ isPhone(text) }}
- [isEmail](../../api/utils/validating#isemail): {{ isEmail(text) }}
- [isUrl](../../api/utils/validating#isurl): {{ isUrl(text) }}

<script lang="ts" setup>
  import { useId, ref, computed } from "vue";
  import { isEmpty, isPhone, isEmail, isUrl } from "../../../dist/utils.mjs";

  // Text
  const textId = useId();
  const text = ref("Seu texto aqui");
</script>
