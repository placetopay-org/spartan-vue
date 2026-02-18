<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        prefix: { type: 'text', default: 'https://', label: 'prefix', required: true },
        suffix: { type: 'text', default: '.com', label: 'suffix', required: true },
    },
})
</script>

<template>
    <SInput v-model="value" :prefix="controls.prefix" :suffix="controls.suffix" placeholder="example" />
</template>
