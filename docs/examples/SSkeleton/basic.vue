<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SSkeleton',
    props: {
        class: { type: 'text', default: 'h-6 w-full rounded-md', label: 'class' },
    },
})
</script>

<template>
    <SSkeleton :class="controls.class" />
</template>
