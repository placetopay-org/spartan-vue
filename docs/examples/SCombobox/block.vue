<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('Vue')

const { controls } = usePreview({
    component: 'SComboboxBlock',
    props: {
        label: { type: 'text', default: 'Framework', label: 'label' },
        helpText: { type: 'text', default: 'Choose your preferred framework.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SComboboxBlock
        v-model="selected"
        :display-button-text="(v) => String(v)"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    >
        <SComboboxOption value="Vue">Vue</SComboboxOption>
        <SComboboxOption value="React">React</SComboboxOption>
        <SComboboxOption value="Angular">Angular</SComboboxOption>
        <SComboboxOption value="Svelte">Svelte</SComboboxOption>
    </SComboboxBlock>
</template>
