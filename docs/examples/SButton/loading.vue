<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        loading: { type: 'boolean', default: true, label: 'loading' },
    },
})
</script>

<template>
    <SButton :loading="controls.loading" variant="primary">
        Loading...
    </SButton>
</template>
