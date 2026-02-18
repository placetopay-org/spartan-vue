<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products">Products</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products/laptops" :active="true">Laptops</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
