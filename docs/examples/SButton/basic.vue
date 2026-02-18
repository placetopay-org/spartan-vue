<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SButton',
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
    slots: {
        default: { default: 'Click me', label: 'Label' },
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
        {{ slots.default }}
    </SButton>
</template>
