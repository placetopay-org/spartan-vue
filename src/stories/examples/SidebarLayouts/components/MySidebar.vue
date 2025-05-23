<script setup lang="ts">
import { SSidebar, SSidebarItem, SSidebarItemGroup } from '@spartan';
import {
    HomeIcon,
    DocumentCodeIcon,
    ReceiptTextIcon,
    ClipboardTickIcon,
    ShieldSecurityIcon,
} from '@placetopay/iconsax-vue/linear';

defineEmits(['update:modelValue']);

defineProps<{
    modelValue: string;
}>();
</script>

<template>
    <SSidebar
        class="w-60 pb-8"
        placetopay-header
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="ReceiptTextIcon">Transactions</SSidebarItem>
        <SSidebarItem :icon="DocumentCodeIcon">System</SSidebarItem>

        <SSidebarItemGroup :icon="ClipboardTickIcon">
            <template #title>Administration</template>

            <SSidebarItem>Merchants</SSidebarItem>
            <SSidebarItem>Sites</SSidebarItem>
            <SSidebarItem>Users</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarItemGroup :icon="ShieldSecurityIcon">
            <template #title>Security</template>

            <SSidebarItem>Roles</SSidebarItem>
            <SSidebarItem>Permissions</SSidebarItem>
            <SSidebarItem>Logs</SSidebarItem>
        </SSidebarItemGroup>
    </SSidebar>
</template>
