<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        iconType: { type: 'select', options: ['solid', 'ping'], default: 'solid', label: 'iconType' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Notification" icon="info" :icon-type="controls.iconType">
        <template #description>Switch between solid and ping icon styles.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">OK</SButton>
        </template>
    </SModalCard>
</template>
