<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SPopover',
    props: {
        placement: { type: 'select', options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'right'], default: 'bottom-start', label: 'placement' },
        arrow: { type: 'select', options: ['none', 'auto', 'light', 'dark'], default: 'none', label: 'arrow' },
        responsive: { type: 'boolean', default: true, label: 'responsive' },
        preventClose: { type: 'boolean', default: false, label: 'preventClose' },
    },
})
</script>

<template>
    <SPopover
        :placement="controls.placement"
        :arrow="controls.arrow === 'none' ? undefined : controls.arrow"
        :responsive="controls.responsive"
        :prevent-close="controls.preventClose"
    >
        <template #reference="{ toggle }">
            <SButton @click="toggle">Toggle Popover</SButton>
        </template>

        <div class="rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <p class="text-sm font-medium text-gray-900">Popover Title</p>
            <p class="mt-1 text-sm text-gray-500">This is the popover content. Click the button to toggle.</p>
        </div>
    </SPopover>
</template>
