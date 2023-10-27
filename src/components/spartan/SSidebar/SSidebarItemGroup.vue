<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { SAccordion } from '../SAccordion';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
    sidebarItemStyles,
    sidebarItemIconStyles,
    sidebarItemContentStyles,
    sidebarItemGroupChevronStyles,
} from './styles';
import type { TSidebarItemGroupProps } from './types';

const props = withDefaults(defineProps<Partial<TSidebarItemGroupProps>>(), {
    path: undefined,
    icon: undefined,
    verticalAccordion: undefined,
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
            props.verticalAccordion ? 150 : 0,
        );
    }
    isActive.value = value;
};

const accordionProps = computed(() => {
    const baseProps: any = {
        'data-group-name': updatedPath.value,
        class: 'pl-8',
    };

    if (props.verticalAccordion) {
        baseProps.open = open.value;
        baseProps.class = twMerge(baseProps.class, props.verticalAccordion);
        baseProps.vertical = true;
    }

    return baseProps;
});

store.registerGroup(updatedPath.value, setActive);
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

        <component
            :is="verticalAccordion ? SAccordion : 'ul'"
            v-show="open || verticalAccordion"
            v-bind="accordionProps"
        >
            <slot />
        </component>
    </li>
</template>
