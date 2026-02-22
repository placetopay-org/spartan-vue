<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'SSelectBlock',
    props: {
        label: { type: 'text', default: 'Framework', label: 'label' },
        helpText: { type: 'text', default: 'Choose your preferred framework.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SSelectBlock
        v-model="value"
        placeholder="Select an option"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    >
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
    </SSelectBlock>
</template>
