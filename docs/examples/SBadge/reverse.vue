<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBadge' })
</script>

<template>
    <SBadge color="green" :reverse="true">
        <template #tag>v2.0</template>
        Latest version
    </SBadge>
</template>
