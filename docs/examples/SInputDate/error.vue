<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SInputDate v-model="value" :error="controls.error" placeholder="Select a date" />
</template>
