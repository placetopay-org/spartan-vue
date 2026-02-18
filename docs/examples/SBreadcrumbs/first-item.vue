<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/dashboard">Dashboard</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/dashboard/analytics" :active="true">Analytics</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
