<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SStackedList' })
</script>

<template>
    <SStackedList>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                <div>
                    <p class="text-sm font-semibold text-gray-900">Leslie Alexander</p>
                    <p class="text-sm text-gray-500">leslie.alexander@example.com</p>
                </div>
            </div>
        </SStackedListItem>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                <div>
                    <p class="text-sm font-semibold text-gray-900">Michael Foster</p>
                    <p class="text-sm text-gray-500">michael.foster@example.com</p>
                </div>
            </div>
        </SStackedListItem>
        <SStackedListItem>
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                <div>
                    <p class="text-sm font-semibold text-gray-900">Dries Vincent</p>
                    <p class="text-sm text-gray-500">dries.vincent@example.com</p>
                </div>
            </div>
        </SStackedListItem>
    </SStackedList>
</template>
