<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SAvatar' })
</script>

<template>
    <SAvatar
        name="Jane Doe"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256"
        size="lg"
    />
</template>
