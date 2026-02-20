<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        arrow: { type: 'select', options: ['auto', 'light', 'dark'], default: 'auto', label: 'arrow' },
    },
})
</script>

<template>
    <SPopover :arrow="controls.arrow" placement="bottom">
        <template #reference="{ toggle }">
            <SButton @click="toggle">Toggle Popover</SButton>
        </template>

        <div class="rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <p class="text-sm text-gray-600">Popover with arrow</p>
        </div>
    </SPopover>
</template>
