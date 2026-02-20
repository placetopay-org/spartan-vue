<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
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

usePreview({ component: 'SSelector' })
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        option-group-label="group"
        option-group-items="items"
        placeholder="Select an item"
    />
</template>
