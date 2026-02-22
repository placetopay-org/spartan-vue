<script setup lang="ts">
import { ref, onMounted, useSlots, watch } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { sidebarItemStyles, sidebarItemIconStyles, sidebarItemContentStyles } from './styles';
import type { TSidebarItemProps } from './types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Partial<TSidebarItemProps>>(), {
    as: 'button',
    path: undefined,
    icon: undefined,
    active: false,
});

const el = ref<HTMLElement | null>(null);
const updatedPath = ref(props.path);

const store = useContext('SSidebarItem');

const isActive = ref(props.active);
const setActive = (value: boolean) => (isActive.value = value || props.active);

const isChild = ref(false);

watch(
    () => props.active,
    (value) => {
        isActive.value = value;
    },
);

onMounted(() => {
    const groupName = el.value?.parentElement?.parentElement?.dataset.groupName;
    if (groupName) isChild.value = true;
    // TODO: ModalLeft compatible? -> const elInnerText = el.value?.innerText;
    const elInnerText = useSlots().default?.()?.[0]?.children as string;
    if (!updatedPath.value) {
        if (elInnerText) updatedPath.value = elInnerText;
        if (groupName) updatedPath.value = `${groupName}/${elInnerText}`;
    }

    if (updatedPath.value) store.registerPath(updatedPath.value, setActive, groupName);
});
</script>

<template>
    <li ref="el">
        <component
            :is="as"
            v-bind="$attrs"
            :class="twMerge(sidebarItemStyles({ isChild }))"
            @click="store.updatePath(updatedPath)"
        >
            <component :is="icon" :class="twMerge(sidebarItemIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemContentStyles({ active: isActive }))">
                <slot />
            </span>
        </component>
    </li>
</template>
