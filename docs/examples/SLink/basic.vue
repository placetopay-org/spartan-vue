<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SLink',
    props: {
        href: { type: 'text', default: 'https://example.com', label: 'href' },
        target: { type: 'select', options: ['_self', '_blank', '_parent', '_top'], default: '_self', label: 'target' },
    },
    slots: {
        default: { default: 'Click here to visit', label: 'Content' },
    },
})
</script>

<template>
    <SLink :href="controls.href" :target="controls.target">{{ slots.default }}</SLink>
</template>
