<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import SInput from './SInput.vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
    defineProps<{
        type?: string;
        rows: Array<{ label: string; value: string | number }>;
        modelValue: {
            value: string | number;
            option: { label: string; value: string | number };
        } | null;
        direction?: 'right' | 'left';
    }>(),
    {
        type: 'text',
        direction: 'right',
    },
);

const inputValue = ref<string | number>(props.modelValue?.value ?? '');
const optionSelected = ref<{ label: string; value: string | number }>(props.modelValue?.option ?? props.rows[0]);

const isRight = computed(() => props.direction === 'right');
const inputProps = computed(() => {
    const { modelValue, rows, ...rest } = props;
    return rest;
});

watchEffect(() => {
    emit('update:modelValue', { value: inputValue, option: optionSelected });
});
</script>

<template>
    <SInput v-model="inputValue" v-bind="inputProps" class="relative">
        <template #[direction]>
            <Listbox v-model="optionSelected">
                <div class="relative inset-y-0">
                    <ListboxButton
                        class="flex h-full max-w-[104px] items-center justify-center gap-1 border border-gray-300 bg-white px-2"
                        :class="isRight ? 'rounded-r-lg' : 'rounded-l-lg'"
                    >
                        <span class="block truncate">{{ optionSelected.label }}</span>
                        <ChevronDownIcon class="h-5 w-5 text-gray-800" />
                    </ListboxButton>

                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 min-w-max overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-for="option in rows"
                            :key="`input-option-${option.label.replace(' ', '-')}`"
                            :value="option"
                            :disabled="option.value === optionSelected.value"
                            class="cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-primary-500 hover:text-white"
                        >
                            {{ option.label }}
                        </ListboxOption>
                    </ListboxOptions>
                </div>
            </Listbox>
        </template>
    </SInput>
</template>
