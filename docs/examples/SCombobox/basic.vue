<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('Vue')

const { controls } = usePreview({
    mode: 'playground',
    component: 'SCombobox',
    props: {
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <SCombobox
        v-model="selected"
        :display-button-text="(v) => String(v)"
        :rounded="controls.rounded"
        :disabled="controls.disabled"
        :error="controls.error"
    >
        <SComboboxOption value="Vue">Vue</SComboboxOption>
        <SComboboxOption value="React">React</SComboboxOption>
        <SComboboxOption value="Angular">Angular</SComboboxOption>
        <SComboboxOption value="Svelte">Svelte</SComboboxOption>
    </SCombobox>
</template>
