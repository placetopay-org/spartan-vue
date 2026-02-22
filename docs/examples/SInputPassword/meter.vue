<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        meter: { type: 'boolean', default: true, label: 'meter' },
    },
})
</script>

<template>
    <SInputPassword
        v-model="value"
        :meter="controls.meter"
        :rules="{ min: 8, uppercase: true, digit: true, special: true }"
        placeholder="Enter password"
    />
</template>
