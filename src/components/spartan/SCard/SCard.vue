<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { hasSlotContent, usePassthrough } from '@/helpers';
import type { TCardProps } from './types';
import { cardStyles, containerStyles } from './styles';
import VIcon from './atoms/Icon.vue';
import VActions from './atoms/Actions.vue';
import { Wrapper } from '@internal';
import { computed, useSlots } from 'vue';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<TCardProps>(), { size: 'md', iconType: 'solid' });
const slots = useSlots();

const hasWrapper = computed(() => Boolean(hasSlotContent(slots.actions) || (props.actions && props.actions.length) || props.icon));
const baseAttrs = computed(() => ({
    class: twMerge(cardStyles({ size: props.size }), !hasWrapper.value && containerStyles({ size: props.size }), props.class),
}))

const { pt, extractor } = usePassthrough();

const [actionsClass, actionsProps] = extractor(pt.value.actions);
const PtIcon = extractor(pt.value.icon);
const PtIconContainer = extractor(pt.value.iconContainer);
</script>

<template>
    <article v-bind="hasWrapper ? { class: containerStyles({ size: props.size })} : baseAttrs">
        <VIcon v-bind="{ icon, iconType, PtIcon, PtIconContainer }" />

        <Wrapper :as="hasWrapper && 'main'" v-bind="hasWrapper && baseAttrs">
            <h3 v-if="hasSlotContent($slots.title)" class="text-center text-lg font-semibold text-gray-900">
                <slot name="title" />
            </h3>

            <p v-if="hasSlotContent($slots.description)" class="mt-2 text-center text-sm font-medium text-gray-500">
                <slot name="description" />
            </p>

            <template v-if="hasSlotContent($slots.default)">
                <slot />
            </template>
    
            <section
                v-if="hasSlotContent($slots.actions)"
                data-s-actions
                v-bind="actionsProps"
                :class="twMerge('mt-6 flex flex-col gap-3 sm:flex-row-reverse', actionsClass)"
            >
                <slot name="actions" />
            </section>
        </Wrapper>

        <VActions v-if="actions && actions.length" :actions="actions" />
    </article>
</template>
