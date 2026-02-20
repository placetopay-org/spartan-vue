<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        responsive: { type: 'boolean', default: true, label: 'responsive' },
    },
})
</script>

<template>
    <SPopover :responsive="controls.responsive">
        <template #reference="{ toggle }">
            <SButton @click="toggle">Toggle Popover</SButton>
        </template>

        <div class="rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <p class="text-sm text-gray-600">On mobile, this popover appears as a bottom sheet when responsive is enabled.</p>
        </div>
    </SPopover>
</template>
