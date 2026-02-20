<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SModalConfirm',
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'danger', label: 'icon' },
        closable: { type: 'boolean', default: false, label: 'closable' },
        preventClose: { type: 'boolean', default: false, label: 'preventClose' },
        responsive: { type: 'boolean', default: true, label: 'responsive' },
    },
    slots: {
        default: { default: 'This action cannot be undone. Are you sure you want to proceed?', label: 'Content' },
    },
    staticAttrs: {
        title: 'Confirm Action',
    },
})
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Confirm Action"
        :description="slots.default"
        :icon="controls.icon"
        :closable="controls.closable"
        :prevent-close="controls.preventClose"
        :responsive="controls.responsive"
        @confirm="open = false"
    />
</template>
