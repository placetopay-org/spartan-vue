<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { SDropdown } from '..';
import type { TStackedListItemProps } from './types';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
import { hasSlotContent } from '@/helpers';

defineProps<TStackedListItemProps>();
</script>

<template>
    <li :class="twMerge('relative p-2', $props.class)">
        <SDropdown
            v-if="hasSlotContent($slots.dropdown)"
            class="absolute right-0 top-0 h-5 w-5 -translate-x-1/2 translate-y-1/2 !p-0"
            :responsive="false"
            placement="bottom-end"
        >
            <template #reference>
                <div>
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="h-5 w-5 text-gray-500 hover:text-gray-900" aria-hidden="true" />
                </div>
            </template>

            <slot name="dropdown" />
        </SDropdown>
        <slot />
    </li>
</template>
