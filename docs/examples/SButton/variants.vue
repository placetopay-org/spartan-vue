<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        variant: {
            type: 'select',
            options: ['primary', 'secondary', 'danger', 'outline', 'link'],
            default: 'primary',
            label: 'variant',
        },
    },
})
</script>

<template>
    <SButton :variant="controls.variant">
        Variants
    </SButton>
</template>
