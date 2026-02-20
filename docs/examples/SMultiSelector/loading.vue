<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref<string[]>([])
const options = ['Option 1', 'Option 2', 'Option 3']

const { controls } = usePreview({
    props: {
        loading: { type: 'boolean', default: true, label: 'loading' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select options"
        :loading="controls.loading"
    />
</template>
