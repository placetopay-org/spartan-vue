<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string>()
const options = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Strawberry']

const { controls } = usePreview({
    props: {
        search: { type: 'boolean', default: true, label: 'search' },
    },
})
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        placeholder="Search a fruit..."
        :search="controls.search"
        clearable
    />
</template>
