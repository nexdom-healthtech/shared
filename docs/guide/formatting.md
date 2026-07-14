# Formatação

Abaixo temos exemplos interativos com nossos métodos para formatações.

## Texto

- <label :for="textId">Texto original: </label>
  <input :id="textId" v-model="text" placeholder="Preencha aqui..." />
  - [kebab-case](../api/text#tokebab): {{ toKebab(text) }}
  - [camelCase](../api/text#tocamel): {{ toCamel(text) }}
  - [Title Case](../api/text#totitle): {{ toTitle(text) }}
  - [Sentence Case](../api/text#tosentence): {{ toSentence(text) }}
  - [Shrink Case](../api/text#shrinktext): {{ shrinkText(text) }}

## Números

- <label :for="numberTextId">Texto original: </label>
  <input :id="numberTextId" v-model="numberText" placeholder="0" />
  - [toNumber](../api/numbers#tonumber): {{ toNumber(numberText) }}
- <label :for="paddingId">Tamanho final: </label>
  <input :id="paddingId" v-model.number="padding" type="number" min="0" placeholder="2" />
- <label :for="fillStringId">Preencher com: </label>
  <input :id="fillStringId" v-model="fillWith" placeholder="0" />
  - [padStart](../api/numbers#padstart): {{ padStart(numberText, orUndefined(padding), orUndefined(fillWith)) }}

## Data e hora

::: tip
As formatações de data e hora levam em consideração os seguintes tokens:

- ano: `YYYY`
- mês: `MM`
- dia: `DD`
- hora: `HH`
- minuto: `mm`
- segundo: `ss`

:::

- <label :for="formatId">Formato final: </label>
  <input :id="formatId" v-model="format" placeholder="DD/MM/YYYY" />
  - [currentDateTime](../api/date-time#currentdatetime): {{ currentDateTime(orUndefined(format)) }}
- <label :for="originFormatId">Formato origem: </label>
  <input :id="originFormatId" v-model="originFormat" :placeholder="format" />
- <label :for="dateTimeId">Data/hora: </label>
  <input :id="dateTimeId" v-model="dateTimeText" :placeholder="originFormat" />
  - [formatDateTime](../api/date-time#formatdatetime): {{ formattedDateTime }}
- <label :for="intervalFormatId">Formato intervalo: </label>
  <input :id="intervalFormatId" v-model="intervalFormat" placeholder="YYYYa, MMm, DDd" />
  - [formatPeriodInterval](../api/date-time#formatperiodinterval): {{ formattedPeriodInterval }}

<script lang="ts" setup>
  import { useId, ref, computed } from "vue"
  import {
    toKebab,
    toCamel,
    toTitle,
    toSentence,
    shrinkText,
    toNumber,
    padStart,
    currentDateTime,
    formatDateTime,
    toDate,
    isValidDateTime,
    toPeriodInterval,
    formatPeriodInterval,
  } from "../../dist/utils.mjs"

  // Text
  const textId = useId();
  const text = ref("Seu texto aqui");

  // Number
  const numberTextId = useId();
  const paddingId = useId();
  const fillStringId = useId();
  const numberText = ref("1");
  const padding = ref<number>();
  const fillWith = ref<string>();

  // Date / time
  const formatId = useId();
  const dateTimeId = useId();
  const originFormatId = useId();
  const intervalFormatId = useId();
  const format = ref<string>('DD/MM/YYYY');
  const originFormat = ref<string>('YYYY-MM-DD');
  const intervalFormat = ref<string>("YYYYa, MMm, DDd");
  const dateTimeText = ref<string>("");

  const validDateTime = computed(() => isValidDateTime(dateTimeText.value, originFormat.value))
  const dateTime = computed(() => validDateTime.value ? toDate(dateTimeText.value, originFormat.value) : undefined)
  const formattedDateTime = computed(() => dateTime.value ? formatDateTime(dateTime.value, orUndefined(format.value)) : "")
  const periodInterval = computed(() => dateTime.value ? toPeriodInterval(dateTime.value) : "")
  const formattedPeriodInterval = computed(() => periodInterval.value ? formatPeriodInterval(periodInterval.value, intervalFormat.value): "")

  function orUndefined<T>(value: T) {
    return value || undefined;
  }
</script>
