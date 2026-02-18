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
        size: {
            type: 'select',
            options: ['sm', 'md', 'lg'],
            default: 'md',
            label: 'size',
        },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        loading: { type: 'boolean', default: false, label: 'loading' },
    },
})
</script>

<template>
    <SButton
        :variant="controls.variant"
        :size="controls.size"
        :disabled="controls.disabled"
        :loading="controls.loading"
    >
        Click me
    </SButton>
</template>
