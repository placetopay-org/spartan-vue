<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        preventClose: { type: 'boolean', default: true, label: 'preventClose' },
    },
})
</script>

<template>
    <SPopover :prevent-close="controls.preventClose">
        <template #reference="{ toggle }">
            <SButton @click="toggle">Toggle Popover</SButton>
        </template>

        <div class="rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <p class="text-sm text-gray-600">This popover won't close when clicking outside.</p>
            <p class="mt-1 text-xs text-gray-400">Click the button again to close it.</p>
        </div>
    </SPopover>
</template>
