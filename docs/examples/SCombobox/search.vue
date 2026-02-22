<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('Vue')

usePreview({ component: 'SCombobox' })
</script>

<template>
    <SCombobox
        v-model="selected"
        search="auto"
        :display-button-text="(v) => String(v)"
    >
        <SComboboxOption value="Vue">Vue</SComboboxOption>
        <SComboboxOption value="React">React</SComboboxOption>
        <SComboboxOption value="Angular">Angular</SComboboxOption>
        <SComboboxOption value="Svelte">Svelte</SComboboxOption>
        <SComboboxOption value="Ember">Ember</SComboboxOption>
    </SCombobox>
</template>
