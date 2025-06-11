<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { hasSlotContent, usePassthrough } from '@/helpers';
import { bodyStyles, containerStyles } from './styles';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import type { TCardProps } from './types';
import VIcon from './atoms/Icon.vue';
import VActions from './atoms/Actions.vue';

const { size = 'md', iconType = 'solid' } = defineProps<TCardProps>();
const { pt, extractor } = usePassthrough();

const [bodyClass, bodyProps] = extractor(pt.value.body);
const [actionsClass, actionsProps] = extractor(pt.value.actions);
const [titleClass, titleProps] = extractor(pt.value.title);
const [descriptionClass, descriptionProps] = extractor(pt.value.description);
const ptIcon = extractor(pt.value.icon);
const ptIconContainer = extractor(pt.value.iconContainer);
</script>

<template>
    <article :class="twMerge(containerStyles({ size }), $props.class)">
        <header v-if="icon" :class="twMerge('mx-4 mb-8 mt-6 flex sm:mx-8 sm:mt-8', closable ? 'justify-between' : 'justify-center')">
            <VIcon v-bind="{ icon, iconColor, iconType, ptIcon, ptIconContainer }" />
            <button class="h-fit cursor-pointer" v-if="closable" @click="$emit('close')">
                <XMarkIcon class="h-5 w-5 text-gray-400" />
            </button>
        </header>

        <main
            data-s-body
            v-bind="bodyProps"
            :class="twMerge(bodyStyles({ size }), icon ? 'pt-0 sm:pt-0' : '', bodyClass)"
        >
            <h3
                data-s-title
                v-bind="titleProps"
                v-if="hasSlotContent($slots.title) || title"
                :class="twMerge('text-center text-base font-semibold text-gray-900', titleClass)"
            >
                <slot v-if="hasSlotContent($slots.title)" name="title" />
                <template v-else>{{ title }}</template>
            </h3>

            <p
                data-s-description
                v-bind="descriptionProps"
                v-if="hasSlotContent($slots.description)"
                :class="twMerge('mt-2 text-center text-sm font-normal text-gray-500', descriptionClass)"
            >
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
