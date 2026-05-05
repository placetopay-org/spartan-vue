<script setup lang="ts">
import { inject } from 'vue';
import { MenuItem } from '@headlessui/vue';
import { twMerge } from 'tailwind-merge';
import type { TDropdownItemProps } from './types';
import { dropdownVariantKey } from './types';
import { dropdownItemStyles } from './styles';
import { hasSlotContent } from '@/helpers';

defineProps<TDropdownItemProps>();

const variant = inject(dropdownVariantKey, 'default');
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
                    active && 'bg-gray-50 dark:bg-white/10',
                    disabled && 'pointer-events-none cursor-default select-text',
                    dropdownItemStyles({ variant }),
                    $props.class,
                )
            "
        >
            <component
                :is="icon"
                :class="twMerge('h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500', iconClass)"
                aria-hidden="true"
            />
            <div class="flex flex-col items-start">
                <span :class="twMerge('text-sm font-medium text-gray-800 dark:text-gray-200', labelClass)"
                    ><slot
                /></span>
                <span
                    v-if="hasSlotContent($slots.description)"
                    class="text-xs font-normal text-gray-400 dark:text-gray-500"
                    ><slot name="description"
                /></span>
            </div>
        </component>
    </MenuItem>
</template>
