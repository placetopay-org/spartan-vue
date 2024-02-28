<script setup lang="ts">
import { SPopover } from '../SPopover';
import { Menu, MenuItems } from '@headlessui/vue';
import type { TDropdownProps } from './types';
import { twMerge } from 'tailwind-merge';

withDefaults(defineProps<Partial<TDropdownProps>>(), {
    offset: 2,
    placement: 'bottom-start',
    static: false,
    responsive: true,
    preventClose: false,
});
</script>

<template>
    <SPopover v-bind="$props" :class="twMerge('w-fit', $props.class)">
        <template #reference="handlers">
            <button @click="handlers.toggle">
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
