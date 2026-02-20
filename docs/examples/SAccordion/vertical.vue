<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(true)

usePreview({ component: 'SAccordion' })
</script>

<template>
    <div class="w-full space-y-2">
        <button
            class="w-full rounded-lg bg-gray-100 px-4 py-2 text-left font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            @click="open = !open"
        >
            {{ open ? 'Collapse' : 'Expand' }}
        </button>

        <SAccordion :open="open" vertical>
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p class="text-gray-600 dark:text-gray-400">
                    This content expands and collapses vertically using CSS grid row transitions.
                </p>
            </div>
        </SAccordion>
    </div>
</template>
