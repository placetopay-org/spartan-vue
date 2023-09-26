<script setup lang="ts">
import { ComboboxOption } from '@headlessui/vue';
import { isEqual } from 'lodash';
import { useSComboboxContext } from './api';
import { computed } from 'vue';

const props = defineProps<{
    class?: string;
    value: any;
}>();

const { currentSelection } = useSComboboxContext('SComboboxOption');

const isSelected = computed(() => isEqual(currentSelection, props.value));
</script>

<template>
    <ComboboxOption v-slot="{ active }" :value="value" as="template">
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
    </ComboboxOption>
</template>
