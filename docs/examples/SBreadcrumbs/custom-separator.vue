<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products">
            Products
            <template #separator><span class="text-gray-400">/</span></template>
        </SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products/laptops" :active="true">
            Laptops
            <template #separator><span class="text-gray-400">/</span></template>
        </SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
