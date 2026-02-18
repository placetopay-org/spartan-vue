<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SPlacetopayLogo' })
</script>

<template>
    <SPlacetopayLogo mode="base" :width="300" />
</template>
