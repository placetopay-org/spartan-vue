<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

usePreview({ component: 'SStackedList' });
</script>

<template>
    <SStackedList>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Leslie Alexander</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">leslie.alexander@example.com</p>
                </div>
            </div>
            <template #dropdown>
                <SDropdownItem>Edit</SDropdownItem>
                <SDropdownItem>Delete</SDropdownItem>
            </template>
        </SStackedListItem>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Michael Foster</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">michael.foster@example.com</p>
                </div>
            </div>
            <template #dropdown>
                <SDropdownItem>Edit</SDropdownItem>
                <SDropdownItem>Delete</SDropdownItem>
            </template>
        </SStackedListItem>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">Dries Vincent</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">dries.vincent@example.com</p>
                </div>
            </div>
            <template #dropdown>
                <SDropdownItem>Edit</SDropdownItem>
                <SDropdownItem>Delete</SDropdownItem>
            </template>
        </SStackedListItem>
    </SStackedList>
</template>
