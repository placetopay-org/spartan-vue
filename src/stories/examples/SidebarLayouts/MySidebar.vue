<script setup lang="ts">
import { SSidebar, SSidebarItem, SSidebarItemGroup } from '../../../components/spartan';
import {
    PaperAirplaneIcon,
    CommandLineIcon,
    KeyIcon,
    LockClosedIcon,
} from '@heroicons/vue/24/outline';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';

defineEmits(['update:modelValue']);

defineProps<{
    modelValue: string;
}>();
</script>

<template>
    <SSidebar class="w-60 pb-8" placetopayHeader :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="PaperAirplaneIcon">Transactions</SSidebarItem>
        <SSidebarItem :icon="CommandLineIcon">System</SSidebarItem>

        <SSidebarItemGroup :icon="KeyIcon">
            <template #title>Administration</template>

            <SSidebarItem>Merchants</SSidebarItem>
            <SSidebarItem>Sites</SSidebarItem>
            <SSidebarItem>Users</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="LockClosedIcon">
            <template #title>Security</template>

            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
            <SSidebarItem>Logs</SSidebarItem>
        </SSidebarItemGroup>
    </SSidebar>
</template>
