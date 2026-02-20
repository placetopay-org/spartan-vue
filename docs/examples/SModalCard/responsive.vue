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
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Responsive Modal" :responsive="controls.responsive">
        <template #description>On mobile, the modal is positioned at the bottom. On desktop, it is centered. Set responsive to false to always center.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">Close</SButton>
        </template>
    </SModalCard>
</template>
