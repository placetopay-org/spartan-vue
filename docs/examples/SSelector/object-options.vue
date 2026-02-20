<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref()
const options = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
]

usePreview({ component: 'SSelector' })
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        option-label="name"
        option-value="id"
        placeholder="Select a person"
        clearable
    />
</template>
