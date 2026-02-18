<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const enabled = ref(false)

const { controls } = usePreview({
    props: {
        icon: { type: 'boolean', default: true, label: 'icon' },
    },
})
</script>

<template>
    <SSwitch v-model="enabled" :icon="controls.icon">With default icons</SSwitch>
</template>
