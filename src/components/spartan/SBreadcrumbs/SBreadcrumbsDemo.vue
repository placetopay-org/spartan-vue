<script setup lang="ts">
import SBreadcrumbs from './SBreadcrumbs.vue'
import SBreadcrumbsItem from './SBreadcrumbsItem.vue'

type TBreadcrumbsDemoProps = {
    items?: Array<{ label: string; href: string; active?: boolean }>
}

const props = withDefaults(defineProps<TBreadcrumbsDemoProps>(), {
    items: () => [
        { label: 'Home', href: '/', active: false },
        { label: 'Products', href: '/products', active: false },
        { label: 'Laptops', href: '/products/laptops', active: true },
    ],
})
</script>

<template>
    <SBreadcrumbs>
        <SBreadcrumbsItem
            v-for="(item, index) in items"
            :key="index"
            :first="index === 0"
            :href="item.href"
            :active="item.active ?? false"
        >
            {{ item.label }}
        </SBreadcrumbsItem>
    </SBreadcrumbs>
</template>
