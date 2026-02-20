<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'success', label: 'icon' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Operation Complete" :icon="controls.icon">
        <template #description>The action was completed successfully.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">Continue</SButton>
        </template>
    </SModalCard>
</template>
