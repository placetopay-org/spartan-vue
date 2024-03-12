<script setup lang="ts">
import { SPopover } from '../SPopover';
import { Menu, MenuItems } from '@headlessui/vue';
import type { TDropdownProps } from './types';
import { twMerge } from 'tailwind-merge';
import { focusFirstChild } from '@/helpers';

withDefaults(defineProps<Partial<TDropdownProps>>(), {
    offset: 2,
    placement: 'bottom-start',
    static: false,
    responsive: true,
    preventClose: false,
});

defineOptions({ inheritAttrs: false });
</script>

<template>
    <SPopover v-bind="{ ...$props, class: undefined }" :class="twMerge('w-fit', $props.class)">
        <template #reference="handlers">
            <button @click="handlers.toggle" @focus="focusFirstChild" :tabindex="-1">
                <slot name="reference" />
            </button>
        </template>

        <template #default="handlers">
            <Menu>
                <MenuItems @click="handlers.close" static class="divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-gray-100 focus:outline-none">
                    <slot v-bind="handlers" />
                </MenuItems>
            </Menu>
        </template>
    </SPopover>
</template>
