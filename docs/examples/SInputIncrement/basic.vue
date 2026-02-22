<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(5)

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputIncrement',
    props: {
        min: { type: 'number', default: 0, label: 'min' },
        max: { type: 'number', default: 10, label: 'max' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <SInputIncrement
        v-model="value"
        :min="controls.min"
        :max="controls.max"
        :disabled="controls.disabled"
        :error="controls.error"
    />
</template>
