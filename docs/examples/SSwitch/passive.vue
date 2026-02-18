<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const enabled = ref(false)

const { controls } = usePreview({
    props: {
        passive: { type: 'boolean', default: true, label: 'passive' },
    },
})
</script>

<template>
    <SSwitch v-model="enabled" :passive="controls.passive">
        <template #default>Passive switch</template>
        <template #description>Only the switch toggles, not the label.</template>
    </SSwitch>
</template>
