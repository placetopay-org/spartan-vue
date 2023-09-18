<script setup lang="ts">
import { ListboxOption } from '@headlessui/vue';
import { isEqual } from 'lodash';
import { currentSelection, type TOption } from './api';
import { computed } from 'vue';

const props = defineProps<
    {
        class?: string;
    } & TOption
>();

const computedValue = computed(() => ({
    label: props.label,
    value: props.value,
}));

const isSelected = computed(() => isEqual(currentSelection?.value, computedValue.value));
</script>

<template>
    <ListboxOption v-slot="{ active }" :value="computedValue" as="template">
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
    </ListboxOption>
</template>
