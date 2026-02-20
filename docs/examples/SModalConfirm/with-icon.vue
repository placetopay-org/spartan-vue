<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'danger', label: 'icon' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        :icon="controls.icon"
        @confirm="open = false"
    />
</template>
