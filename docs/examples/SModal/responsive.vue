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
    <SButton @click="open = true">Open Modal</SButton>

    <SModal :open="open" :responsive="controls.responsive" @update:open="open = $event">
        <div class="w-full rounded-xl bg-white p-6 shadow-xl sm:max-w-md">
            <h3 class="text-lg font-semibold text-gray-900">Responsive Modal</h3>
            <p class="mt-2 text-sm text-gray-600">When responsive is enabled, the modal is positioned at the bottom on mobile and centered on larger screens.</p>
            <div class="mt-4 flex justify-end">
                <SButton @click="open = false">Close</SButton>
            </div>
        </div>
    </SModal>
</template>
