<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        hideInputIcon: { type: 'boolean', default: true, label: 'hideInputIcon' },
    },
})
</script>

<template>
    <SInputDate v-model="value" :hide-input-icon="controls.hideInputIcon" placeholder="Select a date" />
</template>
