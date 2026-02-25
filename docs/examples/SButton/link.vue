<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        link: { type: 'boolean', default: true, label: 'link' },
    },
})
</script>

<template>
    <SButton :link="controls.link">
        Link
    </SButton>
</template>
