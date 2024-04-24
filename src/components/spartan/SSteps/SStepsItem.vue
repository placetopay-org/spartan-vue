<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { indicatorStyle } from './styles';
import type { TStepsItemsProps } from './types';
import { CheckIcon } from '@heroicons/vue/20/solid';
import { hasSlotContent } from '@/helpers';

const props = defineProps<TStepsItemsProps>();

const slots = useSlots();

const isComplete = computed(() => props.status === 'complete');
const isCurrent = computed(() => props.status === 'current');
const isUpcoming = computed(() => props.status === 'upcoming');

const hasName = computed(() => {
    if (hasSlotContent(slots.default)) return { slot: true };
    if (props.name) return { slot: false };
    return false;
});

const hasDescription = computed(() => {
    console.log('description: ', slots.description);
    if (hasSlotContent(slots.description)) return { slot: true };
    if (props.description) return { slot: false };
    return false;
});

const hasOnlyOneSlot = computed(() => {
    return hasName.value && !hasDescription.value || !hasName.value && hasDescription.value;
});

const ariaCurrent = computed<{ 'aria-current': 'step' } | undefined>(() =>
    isCurrent ? { 'aria-current': 'step' } : undefined,
);
</script>

<template>
    <li :class="['relative', !last && 'pb-10']">
        <div
            v-if="!last"
            :class="['absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5', isComplete ? 'bg-primary-500' : 'bg-gray-300']"
            aria-hidden="true"
        />
        <a :href="href" class="group relative flex items-start" v-bind="ariaCurrent">
            <span class="flex h-9 items-center">
                <span :class="indicatorStyle({ status })">
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
    </li>
</template>
