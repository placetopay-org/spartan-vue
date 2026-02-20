<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const open = ref(false)

const { controls } = usePreview({
    mode: 'playground',
    component: 'SModal',
    props: {
        responsive: { type: 'boolean', default: true, label: 'responsive' },
        preventClose: { type: 'boolean', default: false, label: 'preventClose' },
    },
})
</script>

<template>
    <SButton @click="open = true">Open Modal</SButton>

    <SModal :open="open" :responsive="controls.responsive" :prevent-close="controls.preventClose" @update:open="open = $event">
        <div class="w-full rounded-xl bg-white p-6 shadow-xl sm:max-w-md">
            <h3 class="text-lg font-semibold text-gray-900">Modal Title</h3>
            <p class="mt-2 text-sm text-gray-600">This is a basic modal using SModal. It provides the backdrop, transitions, and scroll lock. You provide the content.</p>
            <div class="mt-4 flex justify-end">
                <SButton @click="open = false">Close</SButton>
            </div>
        </div>
    </SModal>
</template>
