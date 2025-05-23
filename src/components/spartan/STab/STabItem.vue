<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import { useContext } from './api';
import type { TTabItemProps } from './types';
import { twMerge } from 'tailwind-merge';

defineOptions({ inheritAttrs: false });
const props = defineProps<TTabItemProps>();

const context = useContext('STabItem');

const { pt, extractor } = usePassthrough();
const [itemClass, itemProps] = extractor(pt.value.item);
</script>

<template>
    <!-- <li :class="context.full ? 'w-full' : ''"> -->
    <li data-s-item v-bind="itemProps" :class="twMerge(itemClass)">
        <component
            :is="context.variant.item"
            class="inline-flex w-full justify-center"
            v-bind="{ ...props, ...$attrs }"
        >
            <slot />

            <template #items>
                <slot name="items" />
            </template>
        </component>
    </li>
</template>
