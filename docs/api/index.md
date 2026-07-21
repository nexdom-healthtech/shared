---
lastUpdated: false
editLink: false
sidebar: false
footer: false
aside: false
prev: false
next: false
---

# APIs Disponíveis

<hr>

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <div v-for="(api, index) in apis" style="flex: 1;" class="info custom-block" :key="index">
        <p class="custom-block-title custom-block-title-default">{{ api.group.toUpperCase() }}</p>
        <ul v-for="(method, index) in api.methods" :key="index">
            <li>
                <a :href="method.link">{{ method.text }}</a>
            </li>
        </ul>
    </div>
</div>

<script lang="ts" setup>
    const apis = [{
        group: "Modelos",
        methods: [{
            text: "Erros",
            link: './models/errors'
        }]
    },{
        group: "Utilitários",
        methods: [{
            text: "Data e hora",
            link: './utils/date-time'
        },{
            text: "Eventos",
            link: './utils/events'
        },{
            text: "Números",
            link: './utils/numbers'
        },{
            text: "Texto",
            link: './utils/text'
        }]
    }];
</script>
