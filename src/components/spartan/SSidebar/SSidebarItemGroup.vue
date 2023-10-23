<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
    sidebarItemStyles,
    sidebarItemIconStyles,
    sidebarItemContentStyles,
    sidebarItemGroupChevronStyles,
} from './styles';
import type { TSidebarItemProps } from './types';

const props = withDefaults(defineProps<Partial<TSidebarItemProps>>(), {
    path: undefined,
    icon: undefined,
});

const slots = useSlots();
const store = useContext('SSidebarItemGroup');

const innerText = slots.title?.()[0].children;
const updatedPath = ref(props.path || String(innerText));
const isActive = ref(false);
const setActive = (value: boolean) => (isActive.value = value);

store.registerGroup(updatedPath.value, setActive);

const open = ref(false);
</script>

<template>
    <li>
        <button :class="twMerge(sidebarItemStyles())" @click="open = !open">
            <component :is="icon" :class="twMerge(sidebarItemIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemContentStyles({ active: isActive }))">
                <slot name="title" />
            </span>

            <ChevronDownIcon :class="twMerge(sidebarItemGroupChevronStyles({ open, active: isActive }))" />
        </button>

        <ul v-show="open" :data-group-name="updatedPath" class="ml-8 mt-1 space-y-1">
            <slot />
        </ul>
    </li>
</template>
