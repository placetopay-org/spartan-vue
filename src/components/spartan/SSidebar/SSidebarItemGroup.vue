<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { SAccordion } from '../SAccordion';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
    sidebarItemStyles,
    sidebarItemGroupIconStyles,
    sidebarItemGroupContentStyles,
    sidebarItemGroupChevronStyles,
} from './styles';
import type { TSidebarItemGroupProps } from './types';

const props = withDefaults(defineProps<Partial<TSidebarItemGroupProps>>(), {
    path: undefined,
    icon: undefined,
    accordion: true,
});

const slots = useSlots();
const store = useContext('SSidebarItemGroup');

const innerText = slots.title?.()[0].children;
const updatedPath = ref(props.path || String(innerText));

const open = ref(false);
const isActive = ref(false);
const setActive = (value: boolean) => {
    if (value) {
        setTimeout(
            () => {
                open.value = true;
            },
            props.accordion ? 150 : 0,
        );
    }
    isActive.value = value;
};

const accordionProps = computed(() => {
    const baseProps: any = {
        'data-group-name': updatedPath.value,
        class: 'space-y-1',
    };

    if (props.accordion) {
        baseProps.open = open.value;
        baseProps.vertical = true;
        baseProps['pt:body'] = 'p-1 space-y-1';
    }

    return baseProps;
});

store.registerGroup(updatedPath.value, setActive);
</script>

<template>
    <li>
        <button :class="twMerge(sidebarItemStyles())" @click="open = !open">
            <component :is="icon" :class="twMerge(sidebarItemGroupIconStyles({ active: isActive }))" />

            <span :class="twMerge(sidebarItemGroupContentStyles({ active: isActive }))">
                <slot name="title" />
            </span>

            <ChevronDownIcon :class="twMerge(sidebarItemGroupChevronStyles({ open, active: isActive }))" />
        </button>

        <component :is="accordion ? SAccordion : 'ul'" v-bind="accordionProps">
            <slot />
        </component>
    </li>
</template>
