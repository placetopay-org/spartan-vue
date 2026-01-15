<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
import { twMerge } from 'tailwind-merge';
import type { TDropdownItemProps } from './types';
import { hasSlotContent } from '@/helpers';

defineProps<TDropdownItemProps>();
</script>

<template>
    <MenuItem v-slot="{ active }" :disabled="disabled">
        <component
            :is="link ? 'a' : 'button'"
            :type="link ? undefined : 'button'"
            :href="link"
            v-bind="$attrs"
            :class="
                twMerge(
                    active && 'bg-gray-50',
                    disabled && 'pointer-events-none cursor-default select-text',
                    'group flex w-full items-center gap-3 text-nowrap px-3 py-3 text-sm text-gray-700',
                    $props.class,
                )
            "
        >
            <component :is="icon" :class="twMerge('h-5 w-5 shrink-0 text-gray-400', iconClass)" aria-hidden="true" />
            <div class="flex flex-col items-start">
                <span :class="twMerge('text-sm font-medium text-gray-800', labelClass)"><slot /></span>
                <span v-if="hasSlotContent($slots.description)" class="text-xs font-normal text-gray-400"
                    ><slot name="description"
                /></span>
            </div>
        </component>
    </MenuItem>
</template>
