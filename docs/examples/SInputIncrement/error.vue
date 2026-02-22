<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(3)

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SInputIncrement v-model="value" :error="controls.error" />
</template>
