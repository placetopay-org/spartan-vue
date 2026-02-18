<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SCard' })
</script>

<template>
    <SCard title="Payment Successful">
        <template #description>Your transaction has been processed successfully.</template>
    </SCard>
</template>
