<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref(['Option 1', 'Option 2', 'Option 3'])
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const { controls } = usePreview({
    props: {
        compact: { type: 'boolean', default: true, label: 'compact' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select options"
        :compact="controls.compact"
    />
</template>
