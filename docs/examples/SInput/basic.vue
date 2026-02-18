<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInput',
    props: {
        placeholder: { type: 'text', default: 'Enter text...', label: 'placeholder' },
        type: { type: 'select', options: ['text', 'email', 'number', 'password', 'search', 'tel', 'url'], default: 'text', label: 'type' },
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
        borderless: { type: 'boolean', default: false, label: 'borderless' },
    },
})
</script>

<template>
    <SInput
        v-model="value"
        :placeholder="controls.placeholder"
        :type="controls.type"
        :rounded="controls.rounded"
        :disabled="controls.disabled"
        :error="controls.error"
        :borderless="controls.borderless"
    />
</template>
