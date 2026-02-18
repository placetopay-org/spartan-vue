<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SInputAmount v-model="value" currency="USD" :symbol="true" :error="controls.error" placeholder="Invalid amount" />
</template>
