<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        active: { type: 'boolean', default: true, label: 'active' },
    },
});
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/settings" :active="controls.active">Settings</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
