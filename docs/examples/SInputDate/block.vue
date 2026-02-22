<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    component: 'SInputDateBlock',
    props: {
        label: { type: 'text', default: 'Date of birth', label: 'label' },
        helpText: { type: 'text', default: 'Select your date of birth.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputDateBlock
        v-model="value"
        placeholder="Select a date"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
