<script setup lang="ts">
import type { Component } from 'vue';
import type { TStepsItemsProps } from '../types';

const { as = 'a' } = defineProps<
    TStepsItemsProps & {
        as?: string | Component;
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
    complete: 'group border-spartan-primary-600 hover:border-spartan-primary-800',
    current: 'border-spartan-primary-600',
    upcoming: 'group border-gray-200 hover:border-gray-300',
};

const nameStyle = {
    complete: 'text-spartan-primary-600 group-hover:text-spartan-primary-800',
    current: 'text-spartan-primary-600',
    upcoming: 'text-gray-500 group-hover:text-gray-700',
};
</script>

<template>
    <component
        :is="as"
        :href="href"
        :class="[
            'flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
            indicatorStyle[status],
        ]"
        v-bind="ariaCurrent"
    >
        <span v-if="hasName" :class="['text-sm font-medium', nameStyle[status]]">
            <slot v-if="hasName.slot" />
            <template v-else>{{ name }}</template>
        </span>
        <span v-if="hasDescription" class="text-sm font-medium">
            <slot v-if="hasDescription.slot" name="description" />
            <template v-else>{{ description }}</template>
        </span>
    </component>
</template>
