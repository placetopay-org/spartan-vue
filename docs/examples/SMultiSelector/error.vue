<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string[]>([])
const options = ['Option 1', 'Option 2', 'Option 3']

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select options"
        :error="controls.error"
    />
</template>
