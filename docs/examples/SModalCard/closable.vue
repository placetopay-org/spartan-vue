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
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Closable Modal" icon="warning" :closable="controls.closable">
        <template #description>When closable is enabled, a close button appears in the header.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">Confirm</SButton>
        </template>
    </SModalCard>
</template>
