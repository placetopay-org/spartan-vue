<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" as="span" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem as="span" href="/products" :active="true">Products</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
