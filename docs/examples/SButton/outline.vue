<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        outline: { type: 'boolean', default: true, label: 'outline' },
    },
})
</script>

<template>
    <SButton :outline="controls.outline">
        Outline
    </SButton>
</template>
