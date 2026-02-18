<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')
const leftOption = ref('+1')
const leftOptions = [
    { label: '+1', value: '+1' },
    { label: '+57', value: '+57' },
    { label: '+44', value: '+44' },
]
usePreview({ component: 'SInput' })
</script>

<template>
    <SInput
        v-model="value"
        v-model:left-option="leftOption"
        :left-options="leftOptions"
        placeholder="Phone number"
    />
</template>
