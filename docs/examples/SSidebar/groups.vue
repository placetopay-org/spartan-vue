<script setup lang="ts">
import { ref } from 'vue'
import { ProfileCircleIcon, Setting2Icon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SSidebar' })

const active = ref('')
</script>

<template>
    <SSidebar v-model="active">
        <SSidebarItemGroup :icon="ProfileCircleIcon">
            <template #title>Users</template>
            <SSidebarItem>List</SSidebarItem>
            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="Setting2Icon" :accordion="false">
            <template #title>Settings (no accordion)</template>
            <SSidebarItem>General</SSidebarItem>
            <SSidebarItem>Security</SSidebarItem>
        </SSidebarItemGroup>
    </SSidebar>
</template>
