<script setup lang="ts">
import { ref, computed } from 'vue';
import { SInput } from '@spartan';
import { translator } from '@/helpers';
import type { Field } from '../types';

defineEmits<{
    (event: 'select', field: Field): void;
}>();

const props = defineProps<{
    fields: Field[];
}>();

const { t } = translator('filter');
const field = ref('');
const searchedFields = computed(
    () => props.fields?.filter((filter) => filter.name.toLowerCase().includes(field.value.toLowerCase())) ?? [],
);
</script>

<template>
    <div class="scrollbar-hide flex max-h-96 min-w-[255px] flex-col overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div class="px-4 pb-3 pt-4">
            <SInput v-model="field" :placeholder="t('fieldSelectorPlaceholder')" />
        </div>
        <ul class="w-full">
            <li
                v-for="fieldItem in searchedFields"
                :key="fieldItem.name"
                class="rounded-lg hover:bg-gray-50 hover:text-primary-600"
            >
                <button class="w-full px-4 py-2 text-left" @click="$emit('select', fieldItem)">
                    {{ fieldItem.name }}
                </button>
            </li>
            <li v-if="!fields.length" class="px-4 py-2 text-gray-400">
                {{ t('fieldSelectorNotResults') }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 16px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>


