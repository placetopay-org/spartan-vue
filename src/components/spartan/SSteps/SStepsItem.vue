<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { TStepsItemsProps, TStepItemData } from './types';
import { useContext } from './api';
import { hasSlotContent } from '@/helpers';
import { StepLine, CircleWithText } from './circlesWithTextVariant';
import { SimpleStep } from './simpleVariant';

const slots = useSlots();
const props = defineProps<TStepsItemsProps>();

const isComplete = computed(() => props.status === 'complete');
const isCurrent = computed(() => props.status === 'current');
const isUpcoming = computed(() => props.status === 'upcoming');

const hasName = computed(() => {
    if (hasSlotContent(slots.default)) return { slot: true };
    if (props.name) return { slot: false };
    return false;
});

const hasDescription = computed(() => {
    if (hasSlotContent(slots.description)) return { slot: true };
    if (props.description) return { slot: false };
    return false;
});

const hasOnlyOneSlot = computed(() => {
    return (hasName.value && !hasDescription.value) || (!hasName.value && hasDescription.value);
});

const ariaCurrent = computed<{ 'aria-current': 'step' } | undefined>(() =>
    isCurrent.value ? { 'aria-current': 'step' } : undefined,
);

const context = useContext('SStepsItem');
const itemStyle = computed(() => {
    if (context.variant === 'simple') return 'md:flex-1';
    return ['relative', !props.last && 'pb-10'];
});

const itemData = computed<TStepItemData>(() => ({
    status: props.status,
    href: props.href,
    isComplete: isComplete.value,
    isCurrent: isCurrent.value,
    isUpcoming: isUpcoming.value,
    ariaCurrent: ariaCurrent.value,
    hasName: hasName.value,
    hasDescription: hasDescription.value,
    hasOnlyOneSlot: hasOnlyOneSlot.value,
    name: props.name,
    description: props.description,
}));
</script>

<template>
    <li :class="itemStyle">
        <template v-if="context.variant === 'circlesWithText'">
            <StepLine :last="props.last" :is-complete="isComplete" />
            <CircleWithText v-bind="itemData">
                <slot />
                <template #description><slot name="description" /></template>
            </CircleWithText>
        </template>

        <template v-if="context.variant === 'simple'">
            <SimpleStep v-bind="itemData">
                <slot />
                <template #description><slot name="description" /></template>
            </SimpleStep>
        </template>
    </li>
</template>
