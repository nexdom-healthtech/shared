# Manipulação de Eventos

## Ouvir e emitir eventos

<form @submit.prevent="listen">
<label :for="eventId">Nome do evento: </label>
<input :id="eventId" v-model="eventText" required placeholder="Preencha aqui..." />

- [listenEvent](../../api/events#listenevent): <button type="submit">[OUVIR] </button>
- [removeListener](../../api/events#removelistener): <button @click="removeListener(eventText, callback)" :disabled="!eventText" type="button">[PARAR DE OUVIR]</button>

<label :for="detailsId">Dados adicionais: </label>
<input :id="detailsId" v-model="detailsText" placeholder="Preencha aqui..." />

- [emitCustomEvent](../../api/events#emitcustomevent): <button @click="emitCustomEvent(eventText, detailsText)" :disabled="!eventText" type="button">[EMITIR]</button>

</form>

Ouvindo:

<ul>
    <li v-for="[key, value] in Object.entries(listeners)" :key="key">
        <b>{{ key }}</b>: emitido {{ value.calls.length }} vezes
        <button @click="value.remove()">[PARAR DE OUVIR]</button>
        <ol>
            <li v-for="(call, index) in value.calls" :key="index">
                Evento: {{ toJSON(call) }}
            </li>
        </ol>
    </li>
</ul>

<script lang="ts" setup>
  import { useId, ref } from "vue"
  import { emitCustomEvent, listenEvent, removeListener } from "../../../dist/utils.mjs"

  const eventId = useId()
  const detailsId = useId()
  const eventText = ref("")
  const detailsText = ref("")
  const listeners = ref<Record<string,{calls: Event[], remove: Function}>>({})

  function listen() {
    listeners.value[eventText.value] = { calls: [], remove: listenEvent(eventText.value, callback)}
  }

  function callback(e: Event) {
    listeners.value[e.type].calls.push(e);
  }

  function toJSON(e: Event | CustomEvent) {
    const detail = isCustomEvent(e) ? e.detail : "";

    return { detail }
  }

  function isCustomEvent(e: Event | CustomEvent): e is CustomEvent {
    return !!(e as CustomEvent).detail
  }
</script>
