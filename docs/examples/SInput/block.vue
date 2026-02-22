<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'SInputBlock',
    props: {
        label: { type: 'text', default: 'Email', label: 'label' },
        helpText: { type: 'text', default: 'We will never share your email.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputBlock
        v-model="value"
        placeholder="Enter your email"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
