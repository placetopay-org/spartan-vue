<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    mode: 'playground',
    component: 'SDropdown',
    props: {
        variant: {
            type: 'select',
            options: ['default', 'compact'],
            default: 'default',
            label: 'variant',
        },
        placement: {
            type: 'select',
            options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'],
            default: 'bottom-start',
            label: 'placement',
        },
    },
});
</script>

<template>
    <SDropdown :variant="controls.variant" :placement="controls.placement">
        <template #reference>Options</template>

        <SDropdownItem>Edit</SDropdownItem>
        <SDropdownItem>Duplicate</SDropdownItem>
        <SDropdownItem>Delete</SDropdownItem>
    </SDropdown>
</template>
