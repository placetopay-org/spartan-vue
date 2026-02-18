<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
    },
})
</script>

<template>
    <SInput v-model="value" :rounded="controls.rounded" placeholder="Enter text..." />
</template>
