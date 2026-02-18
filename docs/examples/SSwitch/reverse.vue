<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const enabled = ref(false)

const { controls } = usePreview({
    props: {
        reverse: { type: 'boolean', default: true, label: 'reverse' },
    },
})
</script>

<template>
    <SSwitch v-model="enabled" :reverse="controls.reverse">
        <template #default>Dark mode</template>
        <template #description>Switch to dark theme.</template>
    </SSwitch>
</template>
