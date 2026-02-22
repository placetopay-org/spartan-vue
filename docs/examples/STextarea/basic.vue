<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    mode: 'playground',
    component: 'STextarea',
    props: {
        placeholder: { type: 'text', default: 'Enter text...', label: 'placeholder' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <STextArea
        v-model="value"
        :placeholder="controls.placeholder"
        :disabled="controls.disabled"
        :error="controls.error"
    />
</template>
