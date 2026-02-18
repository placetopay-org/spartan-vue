<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBadge' })
</script>

<template>
    <SBadge color="blue">
        <template #tag>New</template>
        Feature released
    </SBadge>
</template>
