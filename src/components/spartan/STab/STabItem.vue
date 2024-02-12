<script setup lang="ts">
import { useContext } from './api';
import { UnderlineTabItem, PillTabItem, VetchTabItem } from './variants';
import type { TTabItemProps } from './types';

defineOptions({ inheritAttrs: false });
const props = defineProps<Partial<TTabItemProps>>();
const store = useContext('STabItem');

const variants = {
    underline: UnderlineTabItem,
    pills: PillTabItem,
    vetches: VetchTabItem,
};
</script>

<template>
    <li :class="store.full ? 'w-full' : ''">
        <component class="w-full inline-flex justify-center" :is="variants[store.variant]" v-bind="{ ...props, ...$attrs }">
            <slot />
        </component>
    </li>
</template>
