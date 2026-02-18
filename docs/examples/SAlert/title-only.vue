<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SAlert' })
</script>

<template>
    <SAlert title="Warning! Please check your input." />
</template>
