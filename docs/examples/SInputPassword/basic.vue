<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputPassword',
    props: {
        placeholder: { type: 'text', default: 'Enter password', label: 'placeholder' },
        meter: { type: 'boolean', default: false, label: 'meter' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <SInputPassword
        v-model="value"
        :placeholder="controls.placeholder"
        :meter="controls.meter"
        :disabled="controls.disabled"
        :error="controls.error"
    />
</template>
