<script setup lang="ts">
import type { TStepsItemsProps } from '../types';
import { CheckIcon } from '@heroicons/vue/20/solid';

defineProps<
    TStepsItemsProps & {
        isComplete: boolean;
        isCurrent: boolean;
        isUpcoming: boolean;
        ariaCurrent: { 'aria-current': 'step' } | undefined;
        hasName: false | { slot: boolean };
        hasDescription: false | { slot: boolean };
        hasOnlyOneSlot: boolean | { slot: boolean };
    }
>();

const indicatorStyle = {
    complete: 'bg-primary-500 group-hover:bg-primary-700',
    current: 'border-2 border-primary-500 bg-white',
    upcoming: 'border-2 border-gray-300 bg-white group-hover:border-gray-400',
};
</script>

<template>
    <a :href="href" class="group relative flex items-start" v-bind="ariaCurrent">
        <span class="flex h-9 items-center">
            <span
                :class="['relative z-10 flex h-8 w-8 items-center justify-center rounded-full', indicatorStyle[status]]"
            >
                <CheckIcon v-if="isComplete" class="h-5 w-5 text-white" aria-hidden="true" />
                <span
                    v-else
                    :class="[
                        'h-2.5 w-2.5 rounded-full bg-primary-500',
                        isCurrent ? 'bg-primary-500' : 'bg-transparent group-hover:bg-gray-300',
                    ]"
                />
            </span>
        </span>
        <span :class="['ml-4 flex min-w-0 flex-col', hasOnlyOneSlot && 'self-center']">
            <span
                v-if="hasName"
                :class="[
                    'text-xs font-semibold',
                    { 'text-gray-600': isComplete, 'text-gray-500': isCurrent, 'text-gray-400': isUpcoming },
                ]"
            >
                <slot v-if="hasName.slot" />
                <template v-else>{{ name }}</template>
            </span>
            <span
                v-if="hasDescription"
                :class="[
                    'text-sm',
                    { 'text-gray-600': isComplete, 'text-gray-900': isCurrent, 'text-gray-400': isUpcoming },
                ]"
            >
                <slot name="description" v-if="hasDescription.slot" />
                <template v-else>{{ description }}</template>
            </span>
        </span>
    </a>
</template>
