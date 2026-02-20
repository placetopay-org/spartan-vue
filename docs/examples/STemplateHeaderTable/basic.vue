<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'STemplateHeaderTable' })
</script>

<template>
    <STemplateHeaderTable title="Products" @search="(q) => console.log('Search:', q)">
        <template #table>
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                Table content goes here
            </div>
        </template>
    </STemplateHeaderTable>
</template>
