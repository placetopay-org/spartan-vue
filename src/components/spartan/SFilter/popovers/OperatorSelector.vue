<script setup lang="ts">
import { SPopover } from '../../SPopover';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import type { Option } from '../types';

const emit = defineEmits<{
    (event: 'update:modelValue', value: Option): void;
}>();

defineProps<{
    operators: Option[] | undefined;
    modelValue: Option;
}>();

const selectOperator = (operator: Option, close: () => void) => {
    emit('update:modelValue', operator);
    close();
};
</script>

<template>
    <SPopover :offset="8">
        <template #reference="{ toggle }">
            <button
                class="flex items-center gap-1.5 rounded-lg bg-gray-100 py-1 pl-3 pr-2 text-gray-800"
                @click="toggle"
            >
                <span>{{ modelValue.label }}</span>
                <ChevronDownIcon class="h-5 w-5 text-gray-600" />
            </button>
        </template>

        <template #default="{ close }">
            <ul class="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-2xl">
                <li v-for="operator in operators" :key="operator.value">
                    <button
                        class="w-full whitespace-nowrap p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
                        @click="selectOperator(operator, close)"
                    >
                        {{ operator.label }}
                    </button>
                </li>
            </ul>
        </template>
    </SPopover>
</template>
