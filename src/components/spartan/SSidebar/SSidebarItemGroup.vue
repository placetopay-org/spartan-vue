<script setup lang="ts">
import { ref, computed } from 'vue';
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

const el = ref<HTMLElement | null>(null);

const store = useContext('SSidebarItemGroup');
const getPath = () => props.path ?? el.value?.innerText;
const isActive = computed(() => store.value.path === getPath());

const open = ref(false);
</script>

<template>
    <li ref="el">
        <button :class="twMerge(sidebarItemStyles({ active: isActive }))" @click="open = !open">
            <component :is="icon" :class="twMerge(sidebarItemIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemContentStyles({ active: isActive }))">
                <slot name="title" />
            </span>

            <ChevronDownIcon :class="twMerge(sidebarItemGroupChevronStyles({ open }))" />
        </button>

        <ul v-if="open" class="ml-8 mt-1 space-y-1">
            <slot />
        </ul>
    </li>
</template>
