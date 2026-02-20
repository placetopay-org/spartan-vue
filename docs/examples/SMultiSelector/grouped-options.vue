<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string[]>([])
const options = [
    {
        group: 'Fruits',
        items: ['Apple', 'Banana', 'Cherry'],
    },
    {
        group: 'Vegetables',
        items: ['Carrot', 'Lettuce', 'Tomato'],
    },
]

usePreview({ component: 'SMultiSelector' })
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        option-group-label="group"
        option-group-items="items"
        placeholder="Select items"
    />
</template>
