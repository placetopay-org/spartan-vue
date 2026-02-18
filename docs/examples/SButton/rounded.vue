<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        rounded: {
            type: 'select',
            options: ['none', 'left', 'right', 'both', 'full'],
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
