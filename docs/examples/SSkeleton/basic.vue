<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({
    mode: 'playground',
    component: 'SSkeleton',
})
</script>

<template>
    <SSkeleton class="h-6 w-full rounded-md" />
</template>
