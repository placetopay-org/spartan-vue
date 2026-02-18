<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('option1')

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SRadio',
    props: {
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        reverse: { type: 'boolean', default: false, label: 'reverse' },
        inline: { type: 'boolean', default: false, label: 'inline' },
    },
    slots: {
        default: { default: 'Option 1', label: 'Label' },
        description: { default: 'Select this option to continue.', label: 'Description' },
    },
})
</script>

<template>
    <SRadio
        v-model="selected"
        value="option1"
        name="example"
        :disabled="controls.disabled"
        :reverse="controls.reverse"
        :inline="controls.inline"
    >
        <template #default>{{ slots.default }}</template>
        <template #description>{{ slots.description }}</template>
    </SRadio>
</template>
