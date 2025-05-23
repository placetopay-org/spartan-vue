<script setup lang="ts">
import { SPopover } from '../SPopover';
import { Menu, MenuItems } from '@headlessui/vue';
import type { TDropdownProps } from './types';
import { twMerge } from 'tailwind-merge';
import { ref, computed } from 'vue';
import { focusFirstChild } from '@/helpers';

const { offset = 2, placement = 'bottom-start', responsive = true, manual } = defineProps<TDropdownProps>();

defineOptions({ inheritAttrs: false });

const popover = ref<InstanceType<typeof SPopover>>();

const isOpen = computed(() => popover.value?.isOpen);
const open = () => popover.value?.open();
const close = () => popover.value?.close();
const toggle = () => popover.value?.toggle();
const focus = () => popover.value?.focus();

defineExpose({
    isOpen,
    open,
    close,
    toggle,
    focus,
});

const toggleCallback = () => {
    if (manual) return;
    toggle();
};

const closeCallback = () => {
    if (manual) return;
    close();
};
</script>

<template>
    <SPopover ref="popover" v-bind="{ ...$props, class: undefined }" :class="twMerge('w-fit', $props.class)">
        <template #reference>
            <button :class="referenceClass" :tabindex="-1" @click="toggleCallback" @focus="focusFirstChild">
                <slot name="reference" />
            </button>
        </template>

        <template #default>
            <Menu>
                <MenuItems
                    static
                    :class="
                        twMerge(
                            'divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-gray-100 focus:outline-none',
                            floatingClass,
                        )
                    "
                    @click="closeCallback"
                >
                    <slot />
                </MenuItems>
            </Menu>
        </template>
    </SPopover>
</template>
