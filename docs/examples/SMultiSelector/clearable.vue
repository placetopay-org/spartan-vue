<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref(['Option 1', 'Option 2'])
const options = ['Option 1', 'Option 2', 'Option 3']

const { controls } = usePreview({
    props: {
        clearable: { type: 'boolean', default: true, label: 'clearable' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select options"
        :clearable="controls.clearable"
    />
</template>
