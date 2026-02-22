<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    mode: 'playground',
    component: 'SSelect',
    props: {
        placeholder: { type: 'text', default: 'Select an option', label: 'placeholder' },
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <SSelect
        v-model="value"
        :placeholder="controls.placeholder"
        :rounded="controls.rounded"
        :disabled="controls.disabled"
        :error="controls.error"
    >
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
    </SSelect>
</template>
