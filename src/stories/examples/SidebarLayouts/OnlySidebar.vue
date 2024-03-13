<script setup lang="ts">
import { ref } from 'vue';
import { Mesh } from '@internal';
import { SSidebar, SSidebarItem, SSidebarItemGroup, SAccordion } from '../../../components/spartan';
import {
    PaperAirplaneIcon,
    CommandLineIcon,
    KeyIcon,
    LockClosedIcon,
    Bars3Icon,
} from '@heroicons/vue/24/outline';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';

const open = ref(true);
const value = ref('Dashboard');
</script>

<template>
    <div class="flex h-full">
        <SAccordion :open="open">
            <SSidebar class="w-60 pb-8" placetopayHeader v-model="value">
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
        </SAccordion>

        <main class="flex flex-1 items-start py-10 font-bold text-gray-600">
            <div class="px-4 sm:px-6 lg:px-8 h-full w-full">

                <!-- Example content -->
                <Mesh class="p-4">
                    <button @click="open = !open"><Bars3Icon class="relative h-6 w-6 text-gray-400" /></button>
                    <p class="absolute left-1/2 top-1/2 -translate-x-1/2">{{ value }}</p>
                </Mesh>
            </div>
        </main>
    </div>
</template>
