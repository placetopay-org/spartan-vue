<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
import type { FunctionalComponent } from 'vue';
withDefaults(
    defineProps<
        Partial<{
            disabled: boolean;
            icon: FunctionalComponent;
        }>
    >(),
    {
        disabled: false,
        icon: undefined,
    },
);
</script>

<template>
    <MenuItem v-slot="{ active }" :disabled="disabled">
        <button
            type="button"
            v-bind="$attrs"
            :class="[active && 'bg-gray-50', disabled && 'cursor-default select-text']"
            class="group flex w-full items-center gap-3 px-3 py-3 text-sm text-gray-700"
        >
            <component :is="icon" class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <div class="flex flex-col items-start">
                <span class="text-sm font-medium text-gray-800"><slot /></span>
                <span class="text-xs font-normal text-gray-400"><slot name="description" /></span>
            </div>
        </button>
    </MenuItem>
</template>
