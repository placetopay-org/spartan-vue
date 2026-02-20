<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md'], default: 'md', label: 'size' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Card Size" :size="controls.size">
        <template #description>The size prop changes padding and border radius.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">Got it</SButton>
        </template>
    </SModalCard>
</template>
