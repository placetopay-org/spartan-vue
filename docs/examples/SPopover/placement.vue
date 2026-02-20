<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        placement: { type: 'select', options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'right'], default: 'bottom-start', label: 'placement' },
    },
})
</script>

<template>
    <SPopover :placement="controls.placement">
        <template #reference="{ toggle }">
            <SButton @click="toggle">Toggle Popover</SButton>
        </template>

        <div class="rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <p class="text-sm text-gray-600">Placement: {{ controls.placement }}</p>
        </div>
    </SPopover>
</template>
