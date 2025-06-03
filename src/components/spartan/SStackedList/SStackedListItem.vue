<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { SDropdown } from '..';
import type { TStackedListItemProps } from './types';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
import { hasSlotContent, usePassthrough } from '@/helpers';

defineOptions({ inheritAttrs: false });
defineProps<TStackedListItemProps>();

const { pt, extractor } = usePassthrough();
const [containerClass, containerProps] = extractor(pt.value.container);
</script>

<template>
    <li :class="twMerge('relative p-4', containerClass)" v-bind="containerProps">
        <SDropdown
            v-if="hasSlotContent($slots.dropdown)"
            class="absolute right-4 top-4 h-5 w-5"
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
        <div :class="twMerge('flex gap-3 items-center', $props.class)" v-bind="$attrs">
            <div v-if="icon" class="bg-gray-100 border border-gray-200 rounded-full h-11 w-11 flex items-center justify-center">
                <component :is="icon" class="h-6 w-6 text-gray-600" />
            </div>
            <slot />
        </div>
    </li>
</template>
