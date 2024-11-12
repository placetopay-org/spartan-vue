<script setup lang="ts">
import { useContext } from './api';
import { UnderlineTabItem, PillTabItem, VetchTabItem } from './variants';
import type { TTabItemProps } from './types';

defineOptions({ inheritAttrs: false });
const props = defineProps<Partial<TTabItemProps>>();
const context = useContext('STabItem');

const variants = {
    underline: UnderlineTabItem,
    pills: PillTabItem,
    vetches: VetchTabItem,
};
</script>

<template>
    <li :class="context.full ? 'w-full' : ''">
        <component class="w-full inline-flex justify-center" :is="variants[context.variant]" v-bind="{ ...props, ...$attrs }">
            <slot />

            <template #items>
                <slot name="items" />
            </template>
        </component>
    </li>
</template>
