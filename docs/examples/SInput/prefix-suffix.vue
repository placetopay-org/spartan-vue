<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        prefix: { type: 'text', default: 'https://', label: 'prefix' },
        suffix: { type: 'text', default: '.com', label: 'suffix' },
    },
})
</script>

<template>
    <SInput v-model="value" :prefix="controls.prefix" :suffix="controls.suffix" placeholder="example" />
</template>
