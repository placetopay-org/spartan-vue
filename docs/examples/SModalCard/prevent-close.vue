<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        preventClose: { type: 'boolean', default: true, label: 'preventClose' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal Card</SButton>

    <SModalCard v-model:open="open" title="Confirm Action" :prevent-close="controls.preventClose">
        <template #description>Clicking the backdrop will not close this modal. Use the button below.</template>
        <template #actions>
            <SButton variant="primary" @click="open = false">I Understand</SButton>
        </template>
    </SModalCard>
</template>
