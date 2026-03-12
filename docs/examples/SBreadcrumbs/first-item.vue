<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        first: { type: 'boolean', default: true, label: 'first' },
    },
});
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="controls.first" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/dashboard">Dashboard</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/dashboard/analytics" :active="true">Analytics</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
