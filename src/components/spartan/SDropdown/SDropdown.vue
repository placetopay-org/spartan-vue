<script lang="ts">
/**
 * A dropdown menu triggered by a button, with floating panel and keyboard navigation.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SDropdown Github}.
 */
export default {
    name: 'SDropdown',
};
</script>

<script setup lang="ts">
import { SPopover } from '../SPopover';
import { Menu, MenuItems } from '@headlessui/vue';
import type { TDropdownProps } from './types';
import { dropdownVariantKey } from './types';
import { dropdownStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import { ref, computed, provide } from 'vue';
import { focusFirstChild } from '@/helpers';

const { manual, variant = 'default' } = defineProps<TDropdownProps>();

provide(dropdownVariantKey, variant);

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
                <MenuItems static :class="twMerge(dropdownStyles({ variant }), floatingClass)" @click="closeCallback">
                    <slot />
                </MenuItems>
            </Menu>
        </template>
    </SPopover>
</template>
