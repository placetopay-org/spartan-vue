<script setup lang="ts">
import { ref } from 'vue';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';
import { Setting2Icon, ProfileCircleIcon, MessageQuestionIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

usePreview({ component: 'SSidebar' });

const active = ref('Dashboard');
</script>

<template>
    <SSidebar v-model="active" :placetopay-header="true">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>

        <SSidebarItemGroup :icon="ProfileCircleIcon">
            <template #title>Users</template>
            <SSidebarItem>List</SSidebarItem>
            <SSidebarItem>Roles</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarSeparator title="System" />

        <SSidebarItem :icon="Setting2Icon">Settings</SSidebarItem>
        <SSidebarItem :icon="MessageQuestionIcon">Help</SSidebarItem>
    </SSidebar>
</template>
