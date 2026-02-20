<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    props: {
        side: { type: 'select', options: ['left', 'right'], default: 'left', label: 'side' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open from {{ controls.side }}</SButton>

    <SModalSide :open="open" :side="controls.side" @close="open = false" @backdrop-click="open = false">
        <div class="h-full w-80 bg-white p-6">
            <h2 class="text-lg font-semibold text-gray-900">{{ controls.side === 'left' ? 'Left' : 'Right' }} Panel</h2>
            <p class="mt-2 text-sm text-gray-600">This panel slides in from the {{ controls.side }}.</p>
            <div class="mt-4">
                <SButton variant="secondary" size="sm" @click="open = false">Close</SButton>
            </div>
        </div>
    </SModalSide>
</template>
