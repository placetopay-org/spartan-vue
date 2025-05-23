<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import type { TBreadcrumbsItemProps } from './types';
import { hasSlotContent } from '@/helpers';

defineProps<Partial<TBreadcrumbsItemProps>>();
</script>

<template>
    <li>
        <div class="flex items-center space-x-3">
            <template v-if="!first">
                <slot v-if="hasSlotContent($slots.separator)" name="separator" />
                <ChevronRightIcon v-else class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </template>
            <a
                :href="href"
                class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800"
                :class="[active ? 'text-gray-800' : undefined]"
                :aria-current="active ? 'page' : undefined"
            >
                <component :is="icon" v-if="icon" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <slot />
            </a>
        </div>
    </li>
</template>
