<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SToast' })
</script>

<template>
    <SToast
        type="success"
        title="Profile updated"
        description="Your profile information has been updated successfully"
    />
</template>
