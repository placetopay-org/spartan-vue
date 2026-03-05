<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        class: {
            type: 'select',
            options: ['', 'text-base font-medium', 'text-xs text-red-500', 'text-sm text-blue-600'],
            default: '',
            label: 'class',
        },
    },
})
</script>

<template>
    <SSectionDescription :class="controls.class">Custom styled description text.</SSectionDescription>
</template>
