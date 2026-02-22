<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    component: 'SInputAmountBlock',
    props: {
        label: { type: 'text', default: 'Amount', label: 'label' },
        helpText: { type: 'text', default: 'Enter the transaction amount.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputAmountBlock
        v-model="value"
        currency="USD"
        placeholder="Enter amount"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
