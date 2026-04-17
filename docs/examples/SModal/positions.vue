<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const open = ref(false);

const { controls } = usePreview({
    props: {
        position: {
            type: 'select',
            options: ['top', 'nearTop', 'center', 'bottom'],
            default: 'center',
            label: 'position',
        },
    },
});
</script>

<template>
    <SButton @click="open = true">Open Modal</SButton>

    <SModal :open="open" :position="controls.position" :responsive="false" @update:open="open = $event">
        <div class="w-full rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800 sm:max-w-md">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Position: {{ controls.position }}</h3>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                The modal is positioned at the {{ controls.position }} of the screen.
            </p>
            <div class="mt-4 flex justify-end">
                <SButton @click="open = false">Close</SButton>
            </div>
        </div>
    </SModal>
</template>
