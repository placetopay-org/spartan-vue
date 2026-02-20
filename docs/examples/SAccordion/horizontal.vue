<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(true)

usePreview({ component: 'SAccordion' })
</script>

<template>
    <div class="flex items-start gap-2">
        <button
            class="shrink-0 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            @click="open = !open"
        >
            {{ open ? 'Collapse' : 'Expand' }}
        </button>

        <SAccordion :open="open">
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p class="whitespace-nowrap text-gray-600 dark:text-gray-400">
                    This content expands horizontally using CSS grid column transitions.
                </p>
            </div>
        </SAccordion>
    </div>
</template>
