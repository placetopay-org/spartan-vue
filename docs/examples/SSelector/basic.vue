<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

const { controls } = usePreview({
    mode: 'playground',
    component: 'SSelector',
    props: {
        placeholder: { type: 'text', default: 'Select an option', label: 'placeholder', required: true },
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        clearable: { type: 'boolean', default: false, label: 'clearable' },
        search: { type: 'boolean', default: false, label: 'search' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
        loading: { type: 'boolean', default: false, label: 'loading' },
    },
})
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        :placeholder="controls.placeholder"
        :rounded="controls.rounded"
        :clearable="controls.clearable"
        :search="controls.search"
        :disabled="controls.disabled"
        :error="controls.error"
        :loading="controls.loading"
    />
</template>
