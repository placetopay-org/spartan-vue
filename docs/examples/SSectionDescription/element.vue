<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        as: { type: 'select', options: ['p', 'span', 'div'], default: 'p', label: 'as' },
    },
})
</script>

<template>
    <SSectionDescription :as="controls.as">Description rendered with a different element.</SSectionDescription>
</template>
