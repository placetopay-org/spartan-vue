<script setup lang="ts">
import { ChevronDoubleDownIcon } from '@heroicons/vue/20/solid';

defineEmits<{
    (event: 'toggleAllExpanders'): void;
}>();

defineProps<{
    isAllExpanded: boolean;
}>();
</script>

<template>
    <button @click="$emit('toggleAllExpanders')" class="group flex h-full w-full justify-center p-3.5">
        <ChevronDoubleDownIcon
            :class="[
                isAllExpanded && 'rotate-180',
                'h-5 w-5 transform text-gray-400 duration-75 group-hover:scale-110 group-hover:text-gray-600',
            ]"
        />
    </button>
</template>
