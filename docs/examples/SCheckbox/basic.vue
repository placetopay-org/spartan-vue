<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const checked = ref(false)

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SCheckbox',
    props: {
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        reverse: { type: 'boolean', default: false, label: 'reverse' },
        inline: { type: 'boolean', default: false, label: 'inline' },
    },
    slots: {
        default: { default: 'Accept terms', label: 'Label' },
        description: { default: 'You agree to our terms and conditions.', label: 'Description' },
    },
})
</script>

<template>
    <SCheckbox
        v-model="checked"
        :disabled="controls.disabled"
        :reverse="controls.reverse"
        :inline="controls.inline"
    >
        <template #default>{{ slots.default }}</template>
        <template #description>{{ slots.description }}</template>
    </SCheckbox>
</template>
