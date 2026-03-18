<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        variant: {
            type: 'select',
            options: ['default', 'compact'],
            default: 'compact',
            label: 'variant',
        },
    },
});
</script>

<template>
    <SDropdown :variant="controls.variant">
        <template #reference>Options</template>

        <SDropdownItem>Edit</SDropdownItem>
        <SDropdownItem>Duplicate</SDropdownItem>
        <SDropdownItem>Delete</SDropdownItem>
    </SDropdown>
</template>
