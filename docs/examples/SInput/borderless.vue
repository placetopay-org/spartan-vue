<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        borderless: { type: 'boolean', default: true, label: 'borderless' },
    },
})
</script>

<template>
    <SInput v-model="value" :borderless="controls.borderless" placeholder="No border" />
</template>
