<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputMask',
    props: {
        placeholder: { type: 'text', default: 'DD/MM/YYYY', label: 'placeholder' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
})
</script>

<template>
    <SInputMask
        v-model="value"
        mask="00/00/0000"
        :placeholder="controls.placeholder"
        :disabled="controls.disabled"
        :error="controls.error"
    />
</template>
