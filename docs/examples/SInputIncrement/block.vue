<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(5)

const { controls } = usePreview({
    component: 'SInputIncrementBlock',
    props: {
        label: { type: 'text', default: 'Quantity', label: 'label' },
        helpText: { type: 'text', default: 'Select a quantity between 0 and 10.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputIncrementBlock
        v-model="value"
        :min="0"
        :max="10"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
