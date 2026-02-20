<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SModalCard',
    props: {
        size: { type: 'select', options: ['sm', 'md'], default: 'md', label: 'size' },
        icon: { type: 'select', options: ['none', 'primary', 'success', 'danger', 'warning', 'info'], default: 'none', label: 'icon' },
        closable: { type: 'boolean', default: false, label: 'closable' },
        preventClose: { type: 'boolean', default: false, label: 'preventClose' },
        responsive: { type: 'boolean', default: true, label: 'responsive' },
    },
    slots: {
        default: { default: 'This is the modal card content.', label: 'Content' },
    },
    staticAttrs: {
        title: 'Modal Card Title',
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard
        v-model:open="open"
        title="Modal Card Title"
        :size="controls.size"
        :icon="controls.icon === 'none' ? undefined : controls.icon"
        :closable="controls.closable"
        :prevent-close="controls.preventClose"
        :responsive="controls.responsive"
    >
        <template #description>{{ slots.default }}</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">Confirm</SButton>
            <SButton variant="secondary" @click="open = false">Cancel</SButton>
        </template>
    </SModalCard>
</template>
