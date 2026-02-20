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
    <SButton @click="open = true">Open Modal</SButton>

    <SModal :open="open" :prevent-close="controls.preventClose" @update:open="open = $event">
        <div class="w-full rounded-xl bg-white p-6 shadow-xl sm:max-w-md">
            <h3 class="text-lg font-semibold text-gray-900">Prevent Close</h3>
            <p class="mt-2 text-sm text-gray-600">With preventClose enabled, clicking the backdrop will not close the modal. The user must use an explicit action.</p>
            <div class="mt-4 flex justify-end">
                <SButton @click="open = false">Close</SButton>
            </div>
        </div>
    </SModal>
</template>
