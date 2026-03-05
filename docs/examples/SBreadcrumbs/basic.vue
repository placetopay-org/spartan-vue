<script setup lang="ts">
import { Home2Icon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    mode: 'playground',
    component: 'SBreadcrumbs',
    props: {
        active: { type: 'boolean', default: true, label: 'active' },
        first: { type: 'boolean', default: true, label: 'first' },
    },
});
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem :first="controls.first" href="/" :icon="Home2Icon">Home</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products">Products</SBreadcrumbsItem>
        <SBreadcrumbsItem href="/products/laptops" :active="controls.active">Laptops</SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
