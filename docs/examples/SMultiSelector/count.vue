<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'])
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const { controls } = usePreview({
    props: {
        count: { type: 'number', default: 3, label: 'count' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select options"
        :count="controls.count"
    />
</template>
