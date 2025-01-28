<script setup lang="ts">
import type { TBadgeProps, TBadgeEmits } from './types';
import { badgeStyles, dotStyles, tagStyles, bodyStyles } from './styles';
import { usePassthrough, hasSlotContent } from '@/helpers';
import { useSlots } from 'vue';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TBadgeEmits>();
const slots = useSlots();
const tagSlot = hasSlotContent(slots.tag);

const { color = 'gray', size = 'md', dot, outline, pill, reverse, removable } = defineProps<TBadgeProps>();

const { pt, extractor } = usePassthrough();

const [bodyClass, bodyProps] = extractor(pt.value.body);
const [contentClass, contentProps] = extractor(pt.value.content);
const [dotClass, dotProps] = extractor(pt.value.dot);
const [tagClass, tagProps] = extractor(pt.value.tag);
const [crossClass, crossProps] = extractor(pt.value.cross);

const remove = (e: Event) => {
    removable === 'stopPropagation' && e.stopPropagation();
    emit('removed');
}
</script>

<template>
    <span :class="twMerge(badgeStyles({ color, size, outline, pill, dot, removable: Boolean(removable), reverse, tag: tagSlot }), $props.class)">
        <svg v-if="dot" v-bind="dotProps" data-s-dot :class="twMerge(dotStyles({ color }), dotClass)" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" />
        </svg>

        <div data-s-body v-bind="bodyProps" :class="twMerge(bodyStyles({ reverse }), bodyClass)">
            <div v-if="tagSlot" v-bind="tagProps" data-s-tag :class="twMerge(tagStyles({ color, pill, outline }), tagClass)">
                <slot name="tag" />
            </div>
    
            <div data-s-content v-bind="contentProps" :class="twMerge(contentClass)">
                <slot />
            </div>
        </div>

        <button
            v-if="removable"
            v-bind="crossProps"
            data-s-cross
            type="button"
            :class="twMerge('-mx-1 rounded-sm active:scale-90', crossClass)"
            @click="remove"
        >
            <span class="sr-only">Remove</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
            </svg>
        </button>
    </span>
</template>
