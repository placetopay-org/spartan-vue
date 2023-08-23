<script setup lang="ts">
import { ref, computed } from 'vue';
import { SInput } from '../../SInput';
import type { TFilter } from '../types';

defineEmits<{
  (event: 'select', filter: TFilter): void;
}>();

const props = defineProps<{
  filters: TFilter[];
}>();

const field = ref('');
const searchedFilters = computed(
  () => props.filters?.filter((filter) => filter.field.toLowerCase().includes(field.value.toLowerCase())) ?? []
);
</script>

<template>
  <div class="bg-white shadow-2xl rounded-lg flex flex-col min-w-[255px]">
    <div class="px-4 pt-4 pb-3">
      <SInput v-model="field" placeholder="Filtrar por" />
    </div>
    <ul class="w-full">
      <li class="hover:text-primary-600 hover:bg-gray-50 rounded-lg" v-for="filter in searchedFilters">
        <button @click="$emit('select', filter)" class="w-full text-left px-4 py-2">{{ filter.field }}</button>
      </li>
      <li v-if="!filters.length" class="px-4 py-2 text-gray-400">No hay resultados</li>
    </ul>
  </div>
</template>
