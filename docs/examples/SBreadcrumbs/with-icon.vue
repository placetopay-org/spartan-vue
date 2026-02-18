<script setup lang="ts">
import { Home2Icon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'
usePreview({ component: 'SBreadcrumbs' })
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="true" href="/" :icon="Home2Icon">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products">Products</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products/laptops" :active="true">Laptops</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
