<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        closable: { type: 'boolean', default: true, label: 'closable' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Confirm Action"
        description="When closable is enabled, a close button appears in the header."
        icon="warning"
        :closable="controls.closable"
        @confirm="open = false"
    />
</template>
