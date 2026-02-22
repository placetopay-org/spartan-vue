<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

const { controls } = usePreview({
    component: 'SSelectorBlock',
    props: {
        label: { type: 'text', default: 'Option', label: 'label' },
        helpText: { type: 'text', default: 'Select one of the available options.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SSelectorBlock
        v-model="selected"
        :options="options"
        placeholder="Select an option"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    />
</template>
