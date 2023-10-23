<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { sidebarItemStyles, sidebarItemIconStyles, sidebarItemContentStyles } from './styles';
import type { TSidebarItemProps } from './types';

const props = withDefaults(defineProps<Partial<TSidebarItemProps>>(), {
    path: undefined,
    icon: undefined,
});

const el = ref<HTMLElement | null>(null);
const updatedPath = ref(props.path);

const store = useContext('SSidebarItem');

const isActive = ref(false);
const setActive = (value: boolean) => (isActive.value = value);

onMounted(() => {
    const groupName = el.value?.parentElement?.dataset.groupName;
    const elInnetText = el.value?.innerText;
    if (elInnetText) updatedPath.value = elInnetText;
    if (groupName) updatedPath.value = `${groupName}/${elInnetText}`;

    if (updatedPath.value) store.registerPath(updatedPath.value, setActive, groupName);
});
</script>

<template>
    <li ref="el">
        <button :class="twMerge(sidebarItemStyles({ active: isActive }))" @click="store.updatePath(updatedPath)">
            <component :is="icon" :class="twMerge(sidebarItemIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemContentStyles({ active: isActive }))">
                <slot />
            </span>
        </button>
    </li>
</template>
