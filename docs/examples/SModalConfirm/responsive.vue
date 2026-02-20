<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        responsive: { type: 'boolean', default: true, label: 'responsive' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Confirm Action"
        description="On mobile, the modal appears at the bottom. On desktop, it is centered."
        icon="info"
        :responsive="controls.responsive"
        @confirm="open = false"
    />
</template>
