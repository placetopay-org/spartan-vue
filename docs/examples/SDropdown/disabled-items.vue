<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SDropdown' })
</script>

<template>
    <SDropdown>
        <template #reference>Actions</template>

        <SDropdownItem>Edit</SDropdownItem>
        <SDropdownItem disabled>Duplicate</SDropdownItem>
        <SDropdownItem>Delete</SDropdownItem>
    </SDropdown>
</template>
