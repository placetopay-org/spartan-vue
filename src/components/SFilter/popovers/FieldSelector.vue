<script setup lang="ts">
import { ref, computed } from 'vue';
import { SInput } from '../../SInput';
import type { TField } from '../types';

defineEmits<{
  (event: 'select', field: TField): void;
}>();

const props = defineProps<{
  fields: TField[];
}>();

const field = ref('');
const searchedFields = computed(
  () => props.fields?.filter((filter) => filter.name.toLowerCase().includes(field.value.toLowerCase())) ?? []
);
</script>

<template>
  <div class="bg-white shadow-2xl rounded-lg flex flex-col min-w-[255px] max-h-96 overflow-y-auto scrollbar-hide">
    <div class="px-4 pt-4 pb-3">
      <SInput v-model="field" placeholder="Filtrar por" />
    </div>
    <ul class="w-full">
      <li class="hover:text-primary-600 hover:bg-gray-50 rounded-lg" v-for="field in searchedFields">
        <button @click="$emit('select', field)" class="w-full text-left px-4 py-2">{{ field.name }}</button>
      </li>
      <li v-if="!fields.length" class="px-4 py-2 text-gray-400">No hay resultados</li>
    </ul>
  </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ff6c0c;
  border-radius: 16px;
}
</style>