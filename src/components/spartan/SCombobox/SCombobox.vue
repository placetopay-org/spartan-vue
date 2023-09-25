<script setup lang="ts">
import { createSComboboxContext } from './api';
import ComboboxBase from './ComboboxBase.vue';
import ComboboxSearch from './ComboboxSearch.vue';
import { computed } from 'vue';
import type { TComboboxProps } from './types';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Partial<TComboboxProps>>(), {
    disabled: false,
    error: false,
    search: false,
    modelValue: undefined,
    rounded: 'both',
});

const state = createSComboboxContext({
    props: computed(() => props),
    currentSelection: props.modelValue,
    updateCurrentSelection(newValue) {
        state.currentSelection = newValue;
        emit('update:modelValue', newValue);
    },
});

// const model = computed({
//     get() {
//         return props.modelValue ?? state.currentSelection;
//     },
//     set(newValue) {
//         state.updateCurrentSelection(newValue);
//         emit('update:modelValue', newValue);
//     },
// });

// const errorClass = computed(() => {
//     return props.error ? 'border-red-300 text-red-900 focus:s-ring-error' : 'border-gray-300 focus:s-ring';
// });
</script>

<template>
    <div>
        <ComboboxSearch v-if="search">
            <template #button>
                <slot name="button" />
            </template>

            <slot />
        </ComboboxSearch>
        <ComboboxBase v-else>
            <template #button>
                <slot name="button" />
            </template>

            <slot />
        </ComboboxBase>
    </div>
</template>
