<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const enabled = ref(false)

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SSwitch',
    props: {
        reverse: { type: 'boolean', default: false, label: 'reverse' },
        passive: { type: 'boolean', default: false, label: 'passive' },
        icon: { type: 'boolean', default: false, label: 'icon' },
    },
    slots: {
        default: { default: 'Enable notifications', label: 'Label' },
        description: { default: 'Receive alerts when something happens.', label: 'Description' },
    },
})
</script>

<template>
    <SSwitch
        v-model="enabled"
        :reverse="controls.reverse"
        :passive="controls.passive"
        :icon="controls.icon"
    >
        <template #default>{{ slots.default }}</template>
        <template #description>{{ slots.description }}</template>
    </SSwitch>
</template>
