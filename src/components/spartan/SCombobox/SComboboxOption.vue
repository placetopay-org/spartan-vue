<script setup lang="ts">
import { ListboxOption, ComboboxOption } from '@headlessui/vue';
import { isEqual } from 'lodash';
import { useSComboboxContext } from './api';
import { computed } from 'vue';
import type { TOption } from './types';

const props = defineProps<
    {
        class?: string;
    } & TOption
>();

const { props: globalProps, currentSelection } = useSComboboxContext('SComboboxOption');

const computedValue = computed(() => ({
    label: props.label,
    value: props.value,
}));

const isSelected = computed(() => isEqual(currentSelection?.value, computedValue.value));
</script>

<template>
    <component
        :is="globalProps.search ? ComboboxOption : ListboxOption"
        v-slot="{ active }"
        :value="computedValue"
        as="template"
    >
        <li
            :class="[
                active ? 'bg-primary-100 text-primary-900' : 'text-gray-900',
                'relative cursor-default select-none px-3 py-1',
            ]"
        >
            <span :class="[isSelected ? 'font-medium' : 'font-normal', 'block truncate', props.class]">
                <slot />
            </span>
        </li>
    </component>
</template>
