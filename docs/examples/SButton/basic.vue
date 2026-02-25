<script setup lang="ts">
import { AddIcon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SButton',
    props: {
        variant: {
            type: 'select',
            options: ['primary', 'secondary', 'danger'],
            default: 'primary',
            label: 'variant',
        },
        size: {
            type: 'select',
            options: ['sm', 'md', 'lg'],
            default: 'md',
            label: 'size',
        },
        outline: { type: 'boolean', default: false, label: 'outline' },
        link: { type: 'boolean', default: false, label: 'link' },
        circular: { type: 'boolean', default: false, label: 'circular' },
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
        :outline="controls.outline"
        :link="controls.link"
        :circular="controls.circular"
        :disabled="controls.disabled"
        :loading="controls.loading"
        :icon="controls.circular ? AddIcon : undefined"
    >
        {{ controls.circular ? '' : slots.default }}
    </SButton>
</template>
