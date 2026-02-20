<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
const options = ['Option 1', 'Option 2', 'Option 3']

const { controls } = usePreview({
    props: {
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
    },
})
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        placeholder="Select an option"
        :rounded="controls.rounded"
    />
</template>
