<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { Combobox, ComboboxInput, ComboboxOption } from '@headlessui/vue';

type Option = { label: string; value: string | number | boolean } | undefined;

const emit = defineEmits<{
    (e: 'update:modelValue', value: Option): void;
}>();

const props = defineProps<{
    id: string;
    modelValue: Option;
    rows: Array<NonNullable<Option>>;
}>();

const query = ref<string>('');
const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const filteredRows = computed(() => {
    if (!query.value) {
        return props.rows;
    }

    return props.rows.filter((row) => row.label.toLowerCase().includes(query.value.toLowerCase()));
});

const displayValue = (item: unknown) => (item as NonNullable<Option>)?.label;

watchEffect(() => {
    if (filteredRows.value.length === 0) {
        model.value = undefined;
    }
});
</script>

<template>
    <Combobox v-model="model">
        <ComboboxInput
            :display-value="displayValue"
            class="block w-full rounded-lg border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100"
            @change="query = $event.target.value"
        />

        <ComboboxOption
            v-for="row in filteredRows"
            :key="`${id}-option-${row.label.replace(' ', '-')}-${row.value}`"
            as="template"
            :value="row"
        >
            <template #default="{ selected }">
                <label :for="`${id}-option-${row.label.replace(' ', '-')}-${row.value}`">
                    <input
                        :id="`${id}-option-${row.label.replace(' ', '-')}-${row.value}`"
                        type="radio"
                        :checked="selected"
                    />
                    {{ row.label }}
                </label>
            </template>
        </ComboboxOption>
    </Combobox>
</template>

<style></style>
