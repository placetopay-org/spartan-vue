<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'SInputPasswordBlock',
    props: {
        label: { type: 'text', default: 'Password', label: 'label' },
        helpText: { type: 'text', default: 'Must be at least 8 characters.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputPasswordBlock
        v-model="value"
        placeholder="Enter password"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
