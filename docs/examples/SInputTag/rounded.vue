<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const tags = ref(['Tag 1'])

const { controls } = usePreview({
    props: {
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
    },
})
</script>

<template>
    <SInputTag v-model="tags" :rounded="controls.rounded" placeholder="Add a tag..." />
</template>
