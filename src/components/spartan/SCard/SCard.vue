<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { hasSlotContent, usePassthrough } from '@/helpers';
import type { TCardProps } from './types';
import { bodyStyles, containerStyles } from './styles';
import VIcon from './atoms/Icon.vue';
import VActions from './atoms/Actions.vue';

const { size = 'md', iconType = 'solid' } = defineProps<TCardProps>();
const { pt, extractor } = usePassthrough();

const [bodyClass, bodyProps] = extractor(pt.value.body);
const [actionsClass, actionsProps] = extractor(pt.value.actions);
const ptIcon = extractor(pt.value.icon);
const ptIconContainer = extractor(pt.value.iconContainer);
</script>

<template>
    <article :class="twMerge(containerStyles({ size }), $props.class)">
        <VIcon v-bind="{ icon, iconColor, iconType, ptIcon, ptIconContainer }" />

        <main data-s-body v-bind="bodyProps" :class="twMerge(bodyStyles({ size }), bodyClass)">
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
        </main>

        <VActions v-if="actions && actions.length" :actions="actions" />
    </article>
</template>
