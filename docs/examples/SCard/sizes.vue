<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md'], default: 'md', label: 'size' },
    },
})
</script>

<template>
    <SCard :size="controls.size" title="Card Title">
        Card content with adjustable size.
    </SCard>
</template>
