<script setup lang="ts">
import { ref } from 'vue';
import { SSidebar, SSidebarItem, SSidebarItemGroup, SAccordion } from '../../../components/spartan';
import {
    HomeIcon,
    PaperAirplaneIcon,
    CommandLineIcon,
    KeyIcon,
    LockClosedIcon,
    Bars4Icon,
} from '@heroicons/vue/24/outline';

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

        <!-- Example of view -->
        <main
            class="flex flex-1 items-start gap-4 p-4 font-bold text-gray-600"
        >
            <button @click="open = !open"><Bars4Icon class="h-7 w-7" /></button>
            <div class="relative h-full w-full overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
                <p class="absolute top-1/2 left-1/2 -translate-x-1/2">{{ value }}</p>
                <svg class="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
                    <defs>
                        <pattern
                            id="pattern-1526ac66-f54a-4681-8fb8-0859d412f251"
                            x="0"
                            y="0"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                        </pattern>
                    </defs>
                    <rect
                        stroke="none"
                        fill="url(#pattern-1526ac66-f54a-4681-8fb8-0859d412f251)"
                        width="100%"
                        height="100%"
                    ></rect>
                </svg>
            </div>
        </main>
    </div>
</template>
