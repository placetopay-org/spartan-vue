<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SAlert' })
</script>

<template>
    <SAlert description="Your changes have been saved successfully." />
</template>
