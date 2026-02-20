<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SAccordion',
    props: {
        open: { type: 'boolean', default: true, label: 'open' },
        vertical: { type: 'boolean', default: true, label: 'vertical' },
    },
    slots: {
        default: { default: 'Accordion content goes here. This section can be expanded or collapsed with a smooth animation.', label: 'Content' },
    },
})
</script>

<template>
    <div class="w-full">
        <SAccordion :open="controls.open" :vertical="controls.vertical">
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                {{ slots.default }}
            </div>
        </SAccordion>
    </div>
</template>
