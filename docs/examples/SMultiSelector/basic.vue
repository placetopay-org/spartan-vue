<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string[]>([])
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const { controls } = usePreview({
    mode: 'playground',
    component: 'SMultiSelector',
    props: {
        placeholder: { type: 'text', default: 'Select options', label: 'placeholder', required: true },
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        clearable: { type: 'boolean', default: false, label: 'clearable' },
        removable: { type: 'boolean', default: false, label: 'removable' },
        search: { type: 'boolean', default: false, label: 'search' },
        compact: { type: 'boolean', default: false, label: 'compact' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
        loading: { type: 'boolean', default: false, label: 'loading' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        :placeholder="controls.placeholder"
        :rounded="controls.rounded"
        :clearable="controls.clearable"
        :removable="controls.removable"
        :search="controls.search"
        :compact="controls.compact"
        :disabled="controls.disabled"
        :error="controls.error"
        :loading="controls.loading"
    />
</template>
