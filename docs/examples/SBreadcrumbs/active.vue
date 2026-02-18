<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/settings" :active="true">Settings</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
