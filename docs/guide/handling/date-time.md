# Manipulação de Data e Hora

## Data e hora

- <label :for="dateTimeId">Data/hora: </label>
  <input :id="dateTimeId" v-model="dateTimeText" :placeholder="originFormat" />
  - [isValidDateTime](../../api/date-time#formatdatetime): {{ validDateTime }}
  - [toDate](../../api/date-time#todate): {{ dateTime ?? "" }}
  - [toPeriodInterval](../../api/date-time#toperiodinterval) (até data e hora atual): {{ interval }}
  - [navigatePeriod](../../api/date-time#navigateperiod):
    - <button :disabled="!validDateTime" @click="navigate({years: -1})">-1 ano</button> <button :disabled="!validDateTime" @click="navigate({years: 1})">+1 ano</button>
    - <button :disabled="!validDateTime" @click="navigate({months: -1})">-1 mês</button> <button :disabled="!validDateTime" @click="navigate({months: 1})">+1 mês</button>
    - <button :disabled="!validDateTime" @click="navigate({days: -1})">-1 dias</button> <button :disabled="!validDateTime" @click="navigate({days: 1})">+1 dias</button>
    - <button :disabled="!validDateTime" @click="navigate({hours: -1})">-1 hora</button> <button :disabled="!validDateTime" @click="navigate({hours: 1})">+1 hora</button>
    - <button :disabled="!validDateTime" @click="navigate({minutes: -1})">-1 minutos</button> <button :disabled="!validDateTime" @click="navigate({minutes: 1})">+1 minutos</button>
    - <button :disabled="!validDateTime" @click="navigate({seconds: -1})">-1 segundos</button> <button :disabled="!validDateTime" @click="navigate({seconds: 1})">+1 segundos</button>

<script lang="ts" setup>
  import { useId, ref, computed } from "vue"
  import {
    type TimePeriod,
    formatDateTime,
    toDate,
    isValidDateTime,
    navigatePeriod,
    currentDateTime,
    toPeriodInterval
  } from "../../../dist/utils.mjs"

  const currentDate = new Date();

  const dateTimeId = useId();
  const originFormat = ref<string>('YYYY-MM-DD HH:mm:ss');
  const dateTimeText = ref<string>(currentDateTime(originFormat.value));
  
  const validDateTime = computed(() => isValidDateTime(dateTimeText.value, originFormat.value))
  const dateTime = computed(() => validDateTime.value ? toDate(dateTimeText.value, originFormat.value) : undefined)
  const interval = computed(() => toPeriodInterval(toDate(dateTimeText.value,originFormat.value), currentDate))
  
  function navigate(period: Partial<TimePeriod>) {
    if (!dateTime.value) return;

    const newDate = navigatePeriod(dateTime.value, period)
    dateTimeText.value = formatDateTime(newDate, originFormat.value)
  }
</script>
