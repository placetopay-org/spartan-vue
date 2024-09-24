<script setup lang="ts">
import { ComboboxOption } from '@headlessui/vue';
import { ref, onMounted } from 'vue';
import { useContext } from './api';
import type { TComboboxOptionProps } from './types';

const props = defineProps<Partial<TComboboxOptionProps>>();

const el = ref<HTMLElement | null>(null);

const store = useContext('SComboboxOption');
const option = store.value.registerOption(props);

onMounted(() => {
    store.value.options[option.id].content = el.value?.innerText || '';
});
</script>

<template>
    <ComboboxOption
        v-if="store.autoSearch ? store.isFiltered(option.content) : true"
        v-slot="{ active }"
        :value="option.id"
        :disabled="disabled"
        as="template"
    >
        <li
            :class="[
                'relative cursor-default select-none px-4 py-2',
                active ? 'bg-spartan-primary-100 text-spartan-primary-900' : 'text-gray-900',
                disabled ? 'opacity-50' : '',
            ]"
        >
            <span
                ref="el"
                :class="[store.isSelected(option.id) ? 'font-medium' : 'font-normal', 'block truncate', props.class]"
            >
                <slot />
            </span>
        </li>
    </ComboboxOption>
</template>
