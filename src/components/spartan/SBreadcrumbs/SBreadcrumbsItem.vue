<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import type { TBreadcrumbsItemProps } from './types';
import { hasSlotContent } from '@/helpers';
import { breadcrumbsItemStyles } from './styles';

const { as = 'a' } = defineProps<TBreadcrumbsItemProps>();
</script>

<template>
    <li>
        <div class="flex items-center space-x-3">
            <template v-if="!first">
                <slot v-if="hasSlotContent($slots.separator)" name="separator" />
                <ChevronRightIcon
                    v-else
                    class="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-400"
                    aria-hidden="true"
                />
            </template>
            <component
                :is="as"
                :href="href"
                :class="breadcrumbsItemStyles({ active })"
                :aria-current="active ? 'page' : undefined"
            >
                <component :is="icon" v-if="icon" class="h-5 w-5 flex-shrink-0 dark:text-gray-400" aria-hidden="true" />
                <slot />
            </component>
        </div>
    </li>
</template>
