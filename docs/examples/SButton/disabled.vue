<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SButton :disabled="controls.disabled">
        Disabled
    </SButton>
</template>
