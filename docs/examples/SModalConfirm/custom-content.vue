<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

usePreview({ component: 'SModalConfirm' })
</script>

<template>
    <SButton @click="open = true">Open Confirm</SButton>

    <SModalConfirm
        v-model:open="open"
        title="Delete Account"
        description=""
        icon="danger"
        @confirm="open = false"
    >
        <p>This will <strong>permanently delete</strong> your account and all associated data.</p>
    </SModalConfirm>
</template>
