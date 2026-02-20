<script setup lang="ts">
import { Edit2Icon, CopyIcon, TrashIcon } from '@placetopay/iconsax-vue/bold'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SDropdown' })
</script>

<template>
    <SDropdown>
        <template #reference>Actions</template>

        <SDropdownItem :icon="Edit2Icon">
            Edit
            <template #description>Modify this item</template>
        </SDropdownItem>
        <SDropdownItem :icon="CopyIcon">
            Duplicate
            <template #description>Create a copy</template>
        </SDropdownItem>
        <SDropdownItem :icon="TrashIcon">
            Delete
            <template #description>Remove permanently</template>
        </SDropdownItem>
    </SDropdown>
</template>
