<script setup>
import { ref, computed } from 'vue';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
import { useSFilterContext } from "./SFilterContext";
import { CheckIcon } from '@heroicons/vue/24/solid';

const api = useSFilterContext();
const filterToAdd = ref({ label: '' });
const query = ref('');

const filteredSelectors = computed(() => {
    if (!query.value) return api.selectors;

    return api.selectors.filter((selector) => {
        return selector.label.toLowerCase().includes(query.value.toLowerCase());
    })
});

const handleNewFilterSelected = (selector) => {
    if (selector.id.trim() === '') return;
    api.addItemByTypeId.value = selector.id;
}
</script>

<template>
    <Combobox v-model="filterToAdd" @update:model-value="handleNewFilterSelected">
        <div class="max-w-max flex flex-col gap-5 p-3 bg-white shadow-2xl rounded-lg">
            <ComboboxInput
                @change="query = $event.target.value"
                :display-value="(selector) => selector.label"
                class="w-full bg-white placeholder:text-gray-300 border rounded-lg block border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100"
                placeholder="Filtrar por"
            />

            <ComboboxOptions static class="space-y-3">
                <ComboboxOption
                    v-for="selector in filteredSelectors"
                    :key="`add-item-to-selectors${selector.id}`"
                    :value="selector"
                    v-slot="{ active, selected }"
                    as="template"
                >
                    <li
                        class="flex justify-between items-center cursor-pointer text-sm text-left font-normal"
                        :class="{
                            'text-gray-900': !active,
                            'text-primary-600': active || selected,
                        }"
                    >
                        {{selector.label}}

                        <CheckIcon v-if="selected" class="text-primary-600 w-5 h-5"/>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>