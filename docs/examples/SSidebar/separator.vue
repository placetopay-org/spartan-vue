<script setup lang="ts">
import { ref } from 'vue'
import { Home2Icon, ChartIcon, Setting2Icon, InfoCircleIcon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SSidebar' })

const active = ref('Dashboard')
</script>

<template>
    <SSidebar v-model="active">
        <SSidebarItem :icon="Home2Icon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="ChartIcon">Analytics</SSidebarItem>

        <SSidebarSeparator title="Administration" />

        <SSidebarItem :icon="Setting2Icon">Settings</SSidebarItem>

        <SSidebarSeparator title="Support" />

        <SSidebarItem :icon="InfoCircleIcon">About</SSidebarItem>
    </SSidebar>
</template>
