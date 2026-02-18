<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        as: { type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], default: 'h3', label: 'as' },
    },
})
</script>

<template>
    <SSectionTitle :as="controls.as">Heading Level</SSectionTitle>
</template>
