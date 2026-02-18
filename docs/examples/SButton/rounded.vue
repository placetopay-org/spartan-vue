<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        rounded: {
            type: 'select',
            options: ['both', 'left', 'right', 'full', 'none'],
            default: 'both',
            label: 'rounded',
        },
    },
})
</script>

<template>
    <SButton :rounded="controls.rounded">
        Rounded
    </SButton>
</template>
