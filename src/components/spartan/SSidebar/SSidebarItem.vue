<script setup lang="ts">
import { ref, computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { sidebarItemStyles, sidebarItemIconStyles, sidebarItemContentStyles } from './styles';
import type { TSidebarItemProps } from './types';

const props = withDefaults(defineProps<Partial<TSidebarItemProps>>(), {
    path: undefined,
    icon: undefined,
});

const el = ref<HTMLElement | null>(null);

const store = useContext('SSidebarItem');
const getPath = () => props.path ?? el.value?.innerText;
const isActive = computed(() => store.value.path === getPath());
</script>

<template>
    <li ref="el">
        <button :class="twMerge(sidebarItemStyles({ active: isActive }))" @click="store.updatePath(getPath())">
            <component :is="icon" :class="twMerge(sidebarItemIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemContentStyles({ active: isActive }))">
                <slot />
            </span>
        </button>
    </li>
</template>
