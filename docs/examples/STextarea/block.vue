<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'STextAreaBlock',
    props: {
        label: { type: 'text', default: 'Description', label: 'label' },
        helpText: { type: 'text', default: 'Provide a brief description.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <STextAreaBlock
        v-model="value"
        placeholder="Enter text..."
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
