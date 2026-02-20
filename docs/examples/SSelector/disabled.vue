<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
const options = ['Option 1', 'Option 2', 'Option 3']

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        placeholder="Select an option"
        :disabled="controls.disabled"
    />
</template>
