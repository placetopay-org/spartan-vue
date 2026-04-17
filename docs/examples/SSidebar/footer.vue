<script setup lang="ts">
import { ref } from 'vue';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';
import { Setting2Icon, LogoutIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

usePreview({ component: 'SSidebar' });

const active = ref('Dashboard');
</script>

<template>
    <SSidebar v-model="active" :placetopay-header="true">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
        <SSidebarItem :icon="Setting2Icon">Settings</SSidebarItem>

        <template #footer>
            <div class="border-t border-gray-200 p-4 dark:border-gray-700">
                <div class="flex items-center gap-3">
                    <SAvatar initials="JD" size="sm" />
                    <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                        <p class="truncate text-xs text-gray-500">john@example.com</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <LogoutIcon class="size-5" />
                    </button>
                </div>
            </div>
        </template>
    </SSidebar>
</template>
