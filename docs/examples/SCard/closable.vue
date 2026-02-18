<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        closable: { type: 'boolean', default: true, label: 'closable' },
    },
})
</script>

<template>
    <SCard :closable="controls.closable" icon="warning" title="Session Expiring">
        <template #description>Your session will expire in 5 minutes.</template>
    </SCard>
</template>
