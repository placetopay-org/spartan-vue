<script setup lang="ts">
import { ref } from 'vue';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';
import { Setting2Icon, ProfileCircleIcon, ShieldSecurityIcon, DocumentTextIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

usePreview({ component: 'SSidebar' });

const active = ref('Dashboard');
</script>

<template>
    <SSidebar v-model="active" :placetopay-header="true">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>

        <SSidebarItemGroup :icon="ProfileCircleIcon">
            <template #title>Users</template>
            <SSidebarItem>All Users</SSidebarItem>
            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="ShieldSecurityIcon">
            <template #title>Security</template>
            <SSidebarItem>Audit Log</SSidebarItem>
            <SSidebarItem>API Keys</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarSeparator title="Resources" />

        <SSidebarItemGroup :icon="DocumentTextIcon">
            <template #title>Documentation</template>
            <SSidebarItem>Guides</SSidebarItem>
            <SSidebarItem>API Reference</SSidebarItem>
            <SSidebarItem>Changelog</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItem :icon="Setting2Icon">Settings</SSidebarItem>
    </SSidebar>
</template>
