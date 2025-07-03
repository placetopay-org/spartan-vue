<script setup lang="ts">
import { DocumentTextIcon } from '@placetopay/iconsax-vue/outline';
</script>

<template>
    <div class="mt-4 flex flex-col items-center justify-center">
        <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <DocumentTextIcon class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="mb-2 text-lg font-medium text-gray-900">No data found</h3>
        <p class="text-sm text-gray-500">Try adjusting the filters to see more data</p>
    </div>
</template>
