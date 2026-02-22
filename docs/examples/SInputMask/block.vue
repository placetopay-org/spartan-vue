<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'SInputMaskBlock',
    props: {
        label: { type: 'text', default: 'Expiration date', label: 'label' },
        helpText: { type: 'text', default: 'Enter the date in DD/MM/YYYY format.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputMaskBlock
        v-model="value"
        mask="00/00/0000"
        placeholder="DD/MM/YYYY"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
