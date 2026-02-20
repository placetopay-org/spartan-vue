<script setup lang="ts">
import { Edit2, Copy, Trash } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SDropdown' })
</script>

<template>
    <SDropdown>
        <template #reference>Actions</template>

        <SDropdownItem :icon="Edit2">
            Edit
            <template #description>Modify this item</template>
        </SDropdownItem>
        <SDropdownItem :icon="Copy">
            Duplicate
            <template #description>Create a copy</template>
        </SDropdownItem>
        <SDropdownItem :icon="Trash">
            Delete
            <template #description>Remove permanently</template>
        </SDropdownItem>
    </SDropdown>
</template>
